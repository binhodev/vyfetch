import { InterceptorVyManager } from "../modules/interceptors/interceptor-vy";
import { pluginVyManager, type PluginVyOptions } from "../modules/plugin/plugin-vy";
import { VyFetchOptions } from "../types/vy-types";

const interceptorsVy = new InterceptorVyManager();
let globalConfig: Partial<VyFetchOptions> = {};

export function configure(
    options: Partial<VyFetchOptions> & { registerAll?: PluginVyOptions[] }
): void {
    globalConfig = { ...globalConfig, ...options };

    if (options.interceptors?.request) {
        options.interceptors.request.forEach((interceptor) =>
            interceptorsVy.addRequestInterceptor(interceptor)
        );
    }

    if (options.interceptors?.response) {
        options.interceptors.response.forEach((interceptor) =>
            interceptorsVy.addResponseInterceptor(interceptor)
        );
    }

    if (options.registerAll) {
        pluginVyManager.registerAll(options.registerAll);
    }
}

export function getGlobalConfig(): Partial<VyFetchOptions> {
    return globalConfig;
}
