# To-Do List - Projeto Full Stack (React, Spring Boot, PostgreSQL)

A Aplicação está disponível em:  
[https://to-do-list-1-zwcy.onrender.com](https://to-do-list-1-zwcy.onrender.com)

<img width="1366" height="768" alt="Captura de tela de 2026-02-26 13-04-27" src="https://github.com/user-attachments/assets/810ea99d-875e-47cd-89e4-28454c3729d5" />

## URL da API:

- `https://to-do-list-pe2n.onrender.com`

## Visão geral

Este projeto permite:
- Criar tarefas
- Listar tarefas
- Editar título da tarefa
- Marcar tarefa como concluída
- Excluir tarefa
- Reordenar tarefas na interface

## Stack utilizada
### Backend

- **Java 21**
- **Spring Boot** – Framework para construção da API REST.

  **Dependências do Spring:**
  - **Spring Web** – Criação de endpoints REST e tratamento de requisições HTTP.
  - **Spring Data JPA** – Camada de persistência de dados e integração com Hibernate.
  - **Flyway** – Versionamento e controle de migrações do banco de dados.
  - **Springdoc OpenAPI** – Documentação da API (Swagger UI).

- **PostgreSQL** – Banco de Dados.

**Arquitetura:** - Padrão MVC (Model-View-Controller), com separação em camadas (Controller, Service, Repository e Model).

---

### Frontend

- **React 19** – Biblioteca para construção de componentes.
- **Vite** – Para build.
- **Axios** – Para consumir APIs REST.

## Pre-requisitos

- Java 21
- Node.js 20+ e npm
- PostgreSQL 14+ (ou compatível)
- Docker e Docker Compose (opcional)

## Rodando com Docker (primeira opção de uso)

Este repositório possui um `docker-compose.yml` na raiz com:
- `db`: PostgreSQL 16
- `backend`: API Spring Boot

Observação: o Postgres do container é exposto em `localhost:5433` para evitar conflito com instalações locais na `5432`.

Antes de rodar com Docker, você precisa clonar o repositório:

```bash
git clone https://github.com/marcusv614/To-Do-List.git
cd To-Do-List
```

### Subir os containers

```bash
docker compose up -d --build
```

### Ver status e logs

```bash
docker compose ps
docker compose logs -f backend
```

### Testar API

- API: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

<img width="1366" height="768" alt="Captura de tela de 2026-02-26 13-00-29" src="https://github.com/user-attachments/assets/0b373e98-d6b5-49db-81c8-f15e04001c10" />

### Parar containers

```bash
docker compose down
```

Para parar e remover também o volume do banco:

```bash
docker compose down -v
```

## Configuração de ambiente

### Backend (`backend/todolistapi/.env`)

Defina as variáveis abaixo (o `application.properties` já as consome):

```env
PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/todolist
SPRING_DATASOURCE_USERNAME=seu_usuario
SPRING_DATASOURCE_PASSWORD=sua_senha
```

### Frontend (`frontend/todolist-frontend/.env`)

```env
VITE_API_URL=http://localhost:8080
```

## Rodando localmente

### 1. Subir o backend

```bash
cd backend/todolistapi
set -a; source .env; set +a
./mvnw spring-boot:run
```

API local: `http://localhost:8080`

Documentação Swagger (quando a API estiver no ar):
- `http://localhost:8080/swagger-ui/index.html`
- `http://localhost:8080/v3/api-docs`

### 2. Subir o frontend

```bash
cd frontend/todolist-frontend
npm install
npm run dev
```

Frontend local: `http://localhost:5173`

## Endpoints da API

Base URL: `http://localhost:8080`

- `GET /` - lista todas as tarefas
- `POST /` - cria tarefa
- `PUT /{id}` - atualiza tarefa
- `DELETE /{id}` - remove tarefa

Exemplo de payload:

```json
{
  "title": "Estudar Spring Boot",
  "completed": false
}
```

## Banco de dados e migrações

As migrações do Flyway ficam em:
- `backend/todolistapi/src/main/resources/db/migration/V1__createdb__todo.sql`
- `backend/todolistapi/src/main/resources/db/migration/V2__add__completed.sql`

Ao iniciar a API, as migrações são aplicadas automaticamente.

## Build de produção

### Backend (jar)

```bash
cd backend/todolistapi
./mvnw clean package
```

### Frontend (assets estáticos)

```bash
cd frontend/todolist-frontend
npm run build
```

## Observação importante sobre CORS

No backend, o `TaskController` está configurado com:

`@CrossOrigin(origins = "https://to-do-list-1-zwcy.onrender.com")`

Se você for consumir a API a partir de outro domínio em produção, ajuste essa origem conforme necessário.
