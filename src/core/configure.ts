import { InterceptorVyManager } from "../modules/interceptors/interceptor-vy";
import { VyFetchOptions } from "../types/vy-types";

const interceptorsVy = new InterceptorVyManager();
let globalConfig: Partial<VyFetchOptions> = {};

export function configure(options: VyFetchOptions): void {
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
}

export function getGlobalConfig(): Partial<VyFetchOptions> {
    return globalConfig;
}
