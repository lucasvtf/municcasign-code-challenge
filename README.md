# Municca Sign Code Challenge

Bem-vindo ao repositório do Municca Sign Code Challenge! Este projeto é uma aplicação Node.js desenvolvida como parte de um desafio técnico.

## Descrição

Este repositório contém uma aplicação web desenvolvida com Node.js, TypeScript, Express e Jest. A aplicação está configurada para usar Docker para simplificar o ambiente de desenvolvimento e teste.
Tem um json chamado rotasInsomnia para ser importado e facilitar o teste das rotas.

## Tecnologias

- **Node.js**
- **TypeScript**
- **Biome**
- **Swagger**
- **Jest**
- **Express**
- **Docker**

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js
- Docker

### Clonando o Repositório

```bash
git clone git@github.com:lucasvtf/municcasign-code-challenge.git
cd municcasign-code-challenge
```

### Instalando as dependências

```bash
npm install
```

### Rodando o projeto sem Docker

```bash
npm run dev
```

### Rodando o projeto com Docker

```bash
docker build -t municca .
docker run -p 3001:3001 municca
```

- **A aplicação estará disponível em http://localhost:3001**
- **A documentação estará disponível em http://localhost:3001/api-docs/**

### Para rodar os testes.

```bash
npm run test
```
