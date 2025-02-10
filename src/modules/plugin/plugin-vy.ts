export interface PluginVy {
    onRequest?(
        url: string,
        options: RequestInit
    ): Promise<
        | { url: string; options: RequestInit }
        | { url: string; options: RequestInit }
    >;
    onResponse?(data: any, response: Response): Promise<any> | any;
}

export class PluginVyManager {
    private plugins: PluginVy[] = [];

    register(plugin: PluginVy): void {
        this.plugins.push(plugin);
    }

    public async runOnRequest(
        url: string,
        options: RequestInit
    ): Promise<{ url: string; options: RequestInit }> {
        let result = { url, options };
        for (const plugin of this.plugins) {
            if (plugin.onRequest) {
                result = await plugin.onRequest(result.url, result.options);
            }
        }
        return result;
    }

    public async runOnResponse(data: any, response: Response): Promise<any> {
        let result = data;
        for (const plugin of this.plugins) {
            if (plugin.onResponse) {
                result = await plugin.onResponse(result, response);
            }
        }
        return result;
    }
}
