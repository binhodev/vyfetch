# Changelog

## 0.2.0

### Minor Changes

- **Suporte a Plugins na Interface `VyFetchOptions`**  
  - Agora a interface `VyFetchOptions` permite o uso de plugins para estender funcionalidades de requisições.  

- **Gerenciador de Plugins (`PluginVyManager`)**  
  - Adicionado suporte para registro e recuperação de plugins disponíveis na classe `PluginVyManager`.  

- **Registro do Plugin de Logging**  
  - O gerenciador de plugins agora registra o plugin de logging automaticamente.  

- **Plugins de Requisição e Resposta no `vyfetch`**  
  - Implementado suporte para plugins de requisição e resposta na função `vyfetch`, permitindo maior flexibilidade na manipulação de requisições e respostas.  

### 🔧 Melhorias  
- **(Exemplo) Suporte a Plugins na Função `fetchData`**  
  - Removido o registro manual do plugin de logging na configuração e adicionada compatibilidade com o novo sistema de plugins na função `fetchData`.  

## 0.1.0

### Minor Changes

- **Suporte a Plugins de Logging**  
  - Adicionado suporte para plugins de logging, permitindo a captura e monitoramento de logs durante requisições.  

- **Melhoria na Configuração do `vyfetch`**  
  - Ajustada a configuração do `vyfetch` para maior flexibilidade e compatibilidade com o novo sistema de plugins.

## 0.0.3

### Patch Changes

- **Correção de Bugs**  
  - Resolvidos problemas internos para melhorar a estabilidade e funcionamento do package.

## 0.0.2

### Patch Changes

- **Configuração do Changesets**  
  - Adicionado suporte ao **Changesets** para controle de versionamento e geração automática de changelogs.  

- **Workflows de CI e Release**  
  - Implementados workflows de **CI (Integração Contínua)** e **Release** para automatizar a publicação de novas versões.

## 0.0.1

- Versão inicial do vyfetch
