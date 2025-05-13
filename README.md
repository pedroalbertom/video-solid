# multi-framework-api-solid

Projeto de estudo focado em arquitetura de software, princípios SOLID e padrões de projeto aplicados em uma API Node.js modular e desacoplada.

## 🎯 Objetivo

Explorar e aplicar na prática:

- Princípios **SOLID**
- **Clean Architecture**
- **Inversão de dependência**
- Modularização
- Uso simultâneo de múltiplos frameworks e ORMs

## 🧱 Arquitetura

Estrutura baseada em **Clean Architecture**, com separação clara por responsabilidade:

- ├── api/
- ├── controllers/
- ├── dtos/
- ├── entities/
- ├── main.ts
- ├── middlewares/
- ├── models/
- ├── routes/
- ├── services/
- ├── types/
- ├── utils/

## 🛠 Tecnologias

- **Node.js**
- **TypeScript**
- **Express** e **Fastify** (executados simultaneamente em portas distintas)
- **Prisma** e **Sequelize** (intercambiáveis no código)
- **SQLite** (mockado)

## ✅ Funcionalidades

- API exposta em **duas portas**, cada uma com um framework HTTP diferente (Express e Fastify).
- Suporte a troca entre **Prisma** e **Sequelize** sem alterar a lógica da aplicação.
- Uso de **factories**, **injeção de dependência** e estrutura modular.
- Arquitetura pensada para **testabilidade**, **manutenção** e **extensibilidade**.

## 🚀 Como rodar

Pré-requisitos:

- Node.js 18+

Instalação e execução:

```bash
npm install
npm run dev
```

A aplicação sobe em duas portas diferentes, cada uma rodando com um framework (Express e Fastify). O banco de dados é um SQLite local para fins de mock.

📌 Observações
Projeto exclusivamente educacional e não destinado à produção.

Sem uso de Docker ou pipelines automatizados.

📄 Licença
MIT
