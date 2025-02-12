---
"vyfetch": minor
---

- **Suporte à Revalidação de Cache (`stale-while-revalidate`) no `vyfetch`**
  - Implementado o esquema **stale-while-revalidate**, permitindo que requisições utilizem uma versão em cache enquanto a nova resposta é buscada em segundo plano.
  - Essa abordagem melhora a performance e reduz o tempo de carregamento em aplicações que dependem de respostas rápidas.
