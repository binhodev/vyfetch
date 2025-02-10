# Vyfetch | WIP

![npm (scoped)](https://img.shields.io/npm/v/vyfetch) ![License](https://img.shields.io/npm/l/vyfetch)

**Vyfetch** é um cliente HTTP avançado que estende o fetch nativo, incorporando recursos extras para facilitar a integração com APIs. Com suporte para configuração global, sistema de plugins e integração opcional com SuperJSON, o Vyfetch oferece uma abordagem modular e altamente configurável para gerenciar requisições HTTP.

## Table of Contents

- [Overview](#overview)
- [Current Features](#current-features)
- [Planned Features](#planned-features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Global Configuration](#global-configuration)
  - [Plugins](#plugins)
  - [SuperJSON Integration](#superjson-integration)
- [API Reference](#api-reference)
- [Hooks for Next.js/React](#hooks-for-nextjsreact)
- [Future CLI](#future-cli)
- [Contributing](#contributing)
- [License](#license)

## Overview

Vyfetch é um wrapper poderoso para o fetch nativo, que agrega diversas funcionalidades:
- **Configuração Global:** Permite definir uma base URL, timeout, headers, interceptadores e callbacks que serão aplicados a todas as requisições.
- **Sistema de Plugins:** Possibilita a injeção de lógica customizada em pontos-chave do fluxo de requisição (pré e pós-processamento, tratamento de erros).
- **Integração Opcional com SuperJSON:** Suporta a desserialização de tipos complexos (como Date, Map, Set, BigInt) via flag `useSuperJSON` ou função `transformResponse`.
- **Cache, Timeout e Batching:** Mecanismos integrados para otimizar performance e evitar requisições duplicadas.

## Current Features

| Recurso                            | Descrição                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Wrapper do Fetch**               | Extende o fetch nativo com suporte a configurações extras e tratamento customizado de requisições.              |
| **Configuração Global**            | Permite definir valores padrão como `baseUrl`, `timeout`, `cacheOptions`, interceptadores e callbacks globais.  |
| **Sistema de Plugins**             | Permite registrar plugins que interceptam e transformam a requisição e a resposta.                              |
| **Suporte Opcional com SuperJSON (Beta)** | Possibilita o uso de SuperJSON para desserialização avançada (suporte a Date, Map, Set, BigInt, etc.)            |
| **Interceptors**                   | Executa funções antes e depois da requisição para modificar a URL, headers ou dados transformados.              |
| **Cache, Timeout e Batching**      | Mecanismos integrados para gerenciar cache, abortar requisições com timeout e deduplicar chamadas simultâneas.   |

## Planned Features

| Recurso Planejado                  | Descrição                                                                                                               |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **CLI Interativo**                 | Desenvolvimento de uma interface de linha de comando para testes rápidos, automação e gerenciamento de configurações.   |
| **Hooks para Next.js/React**       | Criação de hooks customizados (ex.: `useVyfetch`) para facilitar a integração com componentes React e aplicações Next.js. |
| **Integração com Suspense**        | Suporte à renderização com Suspense, permitindo que a UI espere pela resolução de dados de forma elegante.                 |
| **Cache Avançado e Revalidação**   | Integração com mecanismos de cache compartilhado e revalidação automática, inspirados em soluções como SWR ou React Query.  |
| **Pipeline de Transformação**      | Permitir o encadeamento de múltiplas transformações customizadas, além do suporte a SuperJSON, para manipulação dos dados.  |
| **Documentação Interativa**        | Criação de exemplos interativos e demos para facilitar o aprendizado e a integração da ferramenta.                         |

## Instalação

Instale o Vyfetch via npm ou yarn:

```bash
npm install vyfetch
```

## Como usar
Uso básico

```typescript
import { vyfetch } from 'vyfetch';

vyfetch('/api/data', { method: 'GET' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Configurações Globais

```typescript
import { configure } from 'vyfetch';

configure({
  baseUrl: "https://jsonplaceholder.typicode.com", // URL base para requisições relativas
  timeout: 5000, // Timeout padrão de 5000ms
  cacheOptions: { ttl: 60000 }, // Cache com TTL de 60 segundos
  useSuperJSON: true, // Ativa o uso do SuperJSON para transformações de resposta
  interceptors: {
    request: [
      async (url, options) => {
        options.headers = { ...options.headers, "Authorization": "Bearer TOKEN_GLOBAL" };
        return { url, options };
      },
    ],
  },
  onError: (error) => {
    console.error("Erro global:", error);
  },
});
```

## Suporte ao SuperJSON Integration
Ative o uso do SuperJSON para transformar a resposta:
```typescript
vyfetch('/api/data', {
  method: 'GET',
  useSuperJSON: true, // ou use transformResponse: (rawData, response) => SuperJSON.parse(rawData)
});
```
