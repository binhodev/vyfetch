import { configure, vyFetch } from "./lib/index";
import z from "zod";

const usersSchema = z.array(z.object({ name: z.string(), email: z.string() }));

configure({
    baseUrl: "https://jsonplaceholder.typicode.com",
});

async function fetchData() {
    try {
        await vyFetch("/users", {
            method: "GET",
            schema: usersSchema,
            onSuccess(data) {
                console.log("Users data: ", data);
            },
        });
        // console.log("Dados:", response.data);
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

fetchData();
