export interface PluginVyOptions {
    pluginName?: string;
    priority?: number;
    onRequest?(
        url: string,
        options: RequestInit
    ): Promise<
        | { url: string; options: RequestInit }
        | { url: string; options: RequestInit }
    >;
    onResponse?(data: any, response: Response): Promise<any> | any;
    onError?(error: any): void;
}

export class PluginVyManager {
    private plugins: PluginVyOptions[] = [];
    private availablePlugins: Record<string, PluginVyOptions> = {};

    public register(plugin: PluginVyOptions): void {
        this.plugins.push(plugin);

        this.plugins.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    }

    public registerAll(plugins: PluginVyOptions[]): void {
        plugins.forEach((plugin) => this.plugins.push(plugin));
        this.plugins.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    }

    public registerAvailable(plugin: PluginVyOptions): void {
        if (plugin.pluginName) {
            this.availablePlugins[plugin.pluginName] = plugin;
        }
    }

    public getLocalPlugins(
        flags: Partial<Record<string, boolean>>
    ): PluginVyOptions[] {
        const localPlugins: PluginVyOptions[] = [];

        for (const key in flags) {
            if (flags[key] && this.availablePlugins[key]) {
                localPlugins.push(this.availablePlugins[key]);
            }
        }
        return localPlugins;
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

    public runOnError(error: any): void {
        for (const plugin of this.plugins) {
            if (plugin.onError) {
                plugin.onError(error);
            }
        }
    }
}

export const pluginVyManager = new PluginVyManager();
