import { configure, loggingPlugin, pluginVyManager, vyfetch } from "./lib";
import z from "zod";

const usersSchema = z.array(z.object({ name: z.string(), email: z.string() }));

configure({
    baseUrl: "https://jsonplaceholder.typicode.com",
});

// pluginVyManager.register(loggingPlugin);

async function fetchData() {
    try {
        await vyfetch("/users", {
            method: "GET",
            schema: usersSchema,
            onSuccess(data) {
                console.log("Users data: ", data);
            },
            plugins: { logging: true },
        });
        // console.log("Dados:", response.data);
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

fetchData();
