import { pluginVyManager, type PluginVyOptions } from "../plugin-vy";

export const loggingPlugin: PluginVyOptions = {
    pluginName: "logging",
    priority: 1,
    onRequest: async (url: string, options: RequestInit) => {
        const timestamp = new Date().toISOString();
        console.log(
            `[${timestamp}] [REQUEST] ${options.method || "GET"} ${url}`
        );

        if (options.body) {
            console.log(`[${timestamp}] [REQUEST BODY]`, options.body);
        }

        return { url, options };
    },
    onResponse: async (data: any, response: Response) => {
        const timestamp = new Date().toISOString();
        console.log(
            `[${timestamp}] [RESPONSE] ${response.url} - Status: ${response.status}`
        );

        return data;
    },
    onError: (error: Error) => {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] [ERROR] ${error.message}`);
    },
};

pluginVyManager.registerAvailable(loggingPlugin);
