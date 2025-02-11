import { ZodSchema } from "zod";
import { InterceptorVyManager } from "../modules/interceptors/interceptor-vy";
import { BatchVyManager } from "../modules/batch/batch-vy";
import { CacheVyManager } from "../modules/cache/cache-vy";
import { createTimeoutSignal } from "../modules/helpers/timeout-helper";
import {
    isValidUrl,
    isValidHeaders,
} from "../modules/helpers/validation-helper";
import { PluginVyManager } from "../modules/plugin/plugin-vy";
import { VyFetchOptions, VyFetchResponse } from "../types/vy-types";
import { getGlobalConfig } from "./configure";

const interceptorsVy = new InterceptorVyManager();
const cacheVy = new CacheVyManager();
const batchVy = new BatchVyManager();
const pluginVy = new PluginVyManager();

function mergeConfigs(
    config1: Partial<VyFetchOptions>,
    config2: VyFetchOptions
): VyFetchOptions {
    return { ...config1, ...config2 };
}

function generateCacheKey(url: string, options: RequestInit): string {
    const method = options.method || "GET";
    const headers = options.headers ? JSON.stringify(options.headers) : "";
    return `${url}|${method}|${headers}`;
}

export async function vyfetch<T>(
    url: string,
    options: VyFetchOptions & { schema?: ZodSchema<T> } = {}
): Promise<VyFetchResponse<T>> {
    const config = mergeConfigs(getGlobalConfig(), options);

    if (config.baseUrl && !/^https?:\/\//.test(url)) {
        url = new URL(url, config.baseUrl).toString();
    }

    if (!isValidUrl(url)) {
        throw new Error("Invalid URL");
    }

    options.headers = options.headers || {};
    if (!isValidHeaders(options.headers)) {
        throw new Error("Invalid headers");
    }

    const requestStartTime = Date.now();
    config.requestStartTime = requestStartTime;

    let { url: finalUrl, options: finalOptions } =
        await interceptorsVy.runRequestInterceptors(url, options);
    ({ url: finalUrl, options: finalOptions } = await pluginVy.runOnRequest(
        finalUrl,
        finalOptions
    ));

    const key = generateCacheKey(finalUrl, finalOptions);

    const pending = batchVy.get(key);
    if (pending) {
        return pending;
    }

    let timeoutController:
        | { signal: AbortSignal; cancel: () => void }
        | undefined;
    if (config.timeout && config.timeout > 0) {
        timeoutController = createTimeoutSignal(config.timeout);
        finalOptions.signal = timeoutController.signal;
    }

    if (config.cacheOptions?.ttl && config.cacheOptions.ttl > 0) {
        const cachedData = cacheVy.get(key);

        if (cachedData !== undefined) {
            const duration = Date.now() - requestStartTime;

            return {
                ...cachedData,
                fromCache: true,
                duration,
            };
        }
    }

    const fetchPromise = fetch(finalUrl, finalOptions)
        .then(async (response) => {
            const status = response.status;

            if (!response.ok) {
                throw new Error(`Request failed with error: ${status}`);
            }

            const rawData = await response.text();
            let data: T;

            try {
                let parsedData;
                if (config.useSuperJSON) {
                    const superjson = await import("superjson");
                    parsedData = superjson.parse(rawData);
                } else {
                    parsedData = JSON.parse(rawData);
                }

                if (config.transformResponse) {
                    parsedData = config.transformResponse(parsedData, response);
                }

                if (config.schema) {
                    const result = config.schema.safeParse(parsedData);
                    if (!result.success) {
                        throw new Error(
                            `Zod validation failed: ${JSON.stringify(
                                result.error.format()
                            )}`
                        );
                    }
                    data = result.data;
                } else {
                    data = parsedData;
                }
            } catch (error) {
                if (config.onError) config.onError(error as Error);
                throw error;
            }

            data = await interceptorsVy.runResponseInterceptors(data, response);
            data = await pluginVy.runOnResponse(data, response);

            if (config.onSuccess) config.onSuccess(data, response);

            const duration = Date.now() - requestStartTime;

            const result: VyFetchResponse<T> = {
                data,
                status: response.status,
                headers: response.headers,
                fromCache: false,
                duration,
            };

            if (config.cacheOptions?.ttl && config.cacheOptions.ttl > 0) {
                cacheVy.set(key, result, config.cacheOptions.ttl);
            }

            return result;
        })
        .catch((error) => {
            if (config.onError) config.onError(error as Error);
            throw error;
        })
        .finally(() => {
            if (timeoutController) timeoutController.cancel();
        });

    batchVy.set(key, fetchPromise);

    return fetchPromise;
}
