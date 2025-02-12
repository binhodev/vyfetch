import { configure, vyfetch } from "./lib";
import z from "zod";

const usersSchema = z.array(z.object({ name: z.string(), email: z.string() }));

configure({
    baseUrl: "https://jsonplaceholder.typicode.com",
});

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
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

// fetchData();

async function testCache() {
    console.log("Primeira chamada (espera resposta fresca):");
    const resp1 = await vyfetch("/users", {
        method: "GET",
        schema: usersSchema,
        cacheOptions: { ttl: 60000 },
        plugins: { logging: true },
        onSuccess(result) {
            console.log("Users data (primeira chamada):", result);
        },
    });
    console.log(
        "fromCache (primeira chamada):",
        resp1.fromCache,
        `, Duration: ${resp1.duration}ms`
    );

    setTimeout(async () => {
        console.log("Segunda chamada (espera dados do cache):");
        const resp2 = await vyfetch("/users", {
            method: "GET",
            schema: usersSchema,
            cacheOptions: { ttl: 60000 },
            plugins: { logging: true },
        });
        console.log(
            "fromCache (segunda chamada):",
            resp2.fromCache,
            `, Duration: ${resp2.duration}ms`
        );
        console.log("Users data (segunda chamada):", resp2.data);
    }, 3000);
}

testCache();
