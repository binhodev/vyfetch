import { ZodSchema } from "zod";
import {
    RequestInterceptor,
    ResponseInterceptor,
} from "../modules/interceptors/interceptor-vy";

export interface InterceptorOptions {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
}

export interface VyFetchOptions extends RequestInit {
    baseUrl?: string;
    timeout?: number;
    cacheOptions?: { ttl?: number };
    interceptors?: InterceptorOptions;
    schema?: ZodSchema<any>;
    onSuccess?: (data: any, response: Response) => void;
    onError?: (error: Error) => void;
    requestStartTime?: number;
    useSuperJSON?: boolean;
    transformResponse?: (rawData: string, response: Response) => any;
    plugins?: Partial<Record<string, boolean>>;
}

export interface VyFetchResponse<T> {
    data: T;
    status: number;
    headers: Headers;
    fromCache: boolean;
    duration: number;
    // originalResponse?: Response;
}
