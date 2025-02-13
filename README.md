# VyFetch - HTTP Client para TypeScript/JavaScript 🚀 (WIP)

VyFetch é uma biblioteca poderosa e extensível para realizar requisições HTTP de forma simplificada, com suporte a interceptadores, sistema de plugins e transformação avançada de respostas usando SuperJSON.

## 📦 Instalação

```sh
pnpm add vyfetch
```

## 🚀 Uso Básico

```typescript
import { vyfetch } from "vyfetch";

const response = await vyfetch("/api/users");
console.log(response);
```

## 📌 Recursos Atuais

| Recurso                       | Descrição                                     | Status |
| ----------------------------- | --------------------------------------------- | ------ |
| ✅ Base URL Global            | Define um base URL para requisições           |        |
| ✅ Interceptadores            | Permite manipular requisições e respostas     |        |
| ✅ Sistema de Plugins (Beta)  | Suporte a extensões personalizadas            |        |
| ✅ Suporte a SuperJSON (Beta) | Transformação avançada de dados               |        |
| ✅ Cache Integrado            | Configuração de cache para requisições        |        |
| ✅ Configuração Global        | Personalização de opções padrão               |        |
| ✅ Timeout                    | Configuração de tempo limite para requisições |        |
| ✅ Batching                   | Evita requisições duplicadas                  |        |
| ✅ Validação com Zod          | Validação de esquemas com Zod                 |        |
| ✅ Gerenciamento de Erros     | Tratamento global de erros                    |        |

## 🔮 Recursos Planejados

| Recurso                          | Descrição                              | Status |
| -------------------------------- | -------------------------------------- | ------ |
| ⏳ Suporte a WebSockets          | Comunicação em tempo real              |        |
| ⏳ CLI para Gerenciamento        | Ferramenta CLI para configuração       |        |
| ⏳ Suporte a GraphQL             | Suporte nativo para GraphQL            |        |
| ⏳ Melhor Gerenciamento de Erros | Novas opções para tratamento de falhas |        |
| ⏳ Extensibilidade Avançada      | Melhorias no sistema de plugins        |        |

## 🔮 Plugins Planejados

| **Plugins**                | **Descrição**                                                                                                                   | **Status** |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------|------|
| **Plugin de Re-tentativas**                 | Realiza re-tentativas automáticas em caso de falhas transitórias, com suporte a backoff exponencial e jitter configuráveis.       |🚧|
| **Plugin de Rate-Limiting**         | Controla a frequência de requisições para evitar sobrecarga e ultrapassar limites de API.                                         |       |
| **Plugin de Monitoramento/Tracing**    | Integra-se com ferramentas de tracing (como OpenTelemetry) para coletar métricas de performance e rastrear requisições.            |       |
| **Plugin de Autenticação**        | Gerencia automaticamente tokens de autenticação (OAuth, JWT), injetando e renovando tokens sem lógica repetitiva.                 |       |


## 📖 Documentação Completa

Para mais detalhes, acesse a documentação oficial: Em breve

---

## Overview

Vyfetch é um wrapper poderoso para o fetch nativo, que agrega diversas funcionalidades:

-   **Configuração Global:** Permite definir uma base URL, timeout, headers, interceptadores e callbacks que serão aplicados a todas as requisições.
-   **Sistema de Plugins:** Possibilita a injeção de lógica customizada em pontos-chave do fluxo de requisição (pré e pós-processamento, tratamento de erros).
-   **Integração Opcional com SuperJSON (Beta):** Suporta a desserialização de tipos complexos (como Date, Map, Set, BigInt) via flag `useSuperJSON` ou função `transformResponse`.
-   **Cache, Timeout e Batching:** Mecanismos integrados para otimizar performance e evitar requisições duplicadas.
-   **Validação com Zod:** Validação de esquemas de dados usando a biblioteca Zod.
-   **Gerenciamento de Erros:** Tratamento global de erros com callbacks personalizados.

## Configurações Globais

```typescript
import { configure } from "vyfetch";

configure({
    baseUrl: "https://jsonplaceholder.typicode.com", // URL base para requisições relativas
    timeout: 5000, // Timeout padrão de 5000ms
    cacheOptions: { ttl: 60000 }, // Cache com TTL de 60 segundos
    useSuperJSON: true, // Ativa o uso do SuperJSON para transformações de resposta
    interceptors: {
        request: [
            async (url, options) => {
                options.headers = {
                    ...options.headers,
                    Authorization: "Bearer TOKEN_GLOBAL",
                };
                return { url, options };
            },
        ],
    },
    onError: (error) => {
        console.error("Erro global:", error);
    },
});
```

## Suporte SuperJSON

Ative o uso do SuperJSON para transformar a resposta:

```typescript
vyfetch("/api/data", {
    method: "GET",
    useSuperJSON: true, // ou use transformResponse: (rawData, response) => SuperJSON.parse(rawData)
});
```

## Timeout

Configure o tempo limite para requisições:

```typescript
vyfetch("/api/data", {
    method: "GET",
    timeout: 3000, // Timeout de 3000ms
});
```

## Batching

Evite requisições duplicadas:

```typescript
const response1 = vyfetch("/api/data");
const response2 = vyfetch("/api/data"); // Esta requisição será agrupada com a anterior
```

## Validação com Zod

Use a biblioteca Zod para validar esquemas de dados:

```typescript
import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const response = await vyfetch("/api/user", {
    schema: userSchema,
});
console.log(response.data); // Dados validados
```

## Gerenciamento de Erros

Trate erros globalmente:

```typescript
configure({
    onError: (error) => {
        console.error("Erro global:", error);
    },
});
```

## Referências da API

-   vyfetch<T = any>(url: string, options?: SuperFetchOptions): Promise<SuperFetchResponse<T>>
    Realiza a requisição HTTP e retorna um objeto contendo:

    -   data: Dados transformados da resposta.
    -   status: Código de status HTTP.
    -   headers: Cabeçalhos da resposta.
    -   fromCache: Flag indicando se os dados vieram do cache.
    -   duration: Tempo total da requisição (em milissegundos).
    -   configure(options: Partial<SuperFetchOptions>): void
    -   Define configurações globais para todas as requisições, incluindo baseUrl, timeout, interceptadores e outras opções.

---

Criado com 💙 por [@binhodev]
