export type RequestInterceptor = (
    url: string,
    options: RequestInit
) =>
    | Promise<{ url: string; options: RequestInit }>
    | { url: string; options: RequestInit };

export type ResponseInterceptor = (
    data: any,
    response: Response
) => Promise<any> | any;

export class InterceptorVyManager {
    private requestInterceptors: RequestInterceptor[] = [];
    private responseInterceptors: ResponseInterceptor[] = [];

    public addRequestInterceptor(interceptor: RequestInterceptor) {
        this.requestInterceptors.push(interceptor);
    }

    public addResponseInterceptor(interceptor: ResponseInterceptor) {
        this.responseInterceptors.push(interceptor);
    }

    public async runRequestInterceptors(
        url: string,
        options: RequestInit
    ): Promise<{ url: string; options: RequestInit }> {
        let result = { url, options };
        for (const interceptor of this.requestInterceptors) {
            result = await interceptor(result.url, result.options);
        }
        return result;
    }

    public async runResponseInterceptors(
        data: any,
        response: Response
    ): Promise<any> {
        let result = data;
        for (const interceptor of this.responseInterceptors) {
            result = await interceptor(result, response);
        }
        return result;
    }
}
