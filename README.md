# To-Do List API

API REST para gerenciamento de tarefas, desenvolvida com Java 21, Spring Boot e PostgreSQL.

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<img width="1366" height="768" alt="Captura de tela de 2026-02-26 13-00-29" src="https://github.com/user-attachments/assets/0b373e98-d6b5-49db-81c8-f15e04001c10" />

## URL da API

- `https://to-do-list-pe2n.onrender.com`

## Visao geral

Esta API permite:

- Criar tarefas
- Listar tarefas
- Atualizar o titulo e o status de conclusao de uma tarefa
- Excluir tarefas

O frontend React desenvolvido para consumir esta API esta disponivel em:

- `https://to-do-list-frontend-sepia.vercel.app/`

## Stack utilizada

- **Java 21**
- **Spring Boot 3.5.11**
- **Spring Web**: criacao dos endpoints REST.
- **Spring Data JPA**: persistencia de dados com Hibernate.
- **PostgreSQL**: banco de dados relacional.
- **Flyway**: versionamento e execucao das migracoes do banco.
- **Springdoc OpenAPI**: documentacao interativa da API com Swagger UI.
- **Maven**: gerenciamento de dependencias e build.
- **Docker**: empacotamento da API pelo `Dockerfile`.
- **Docker Compose**: opcao para orquestrar a API junto com o PostgreSQL.

## Arquitetura

O projeto segue uma organizacao em camadas, separando responsabilidades entre controller, service, repository, model e DTOs.

```text
.
├── Dockerfile
├── pom.xml
├── mvnw
├── mvnw.cmd
├── README.md
└── src
    ├── main
    │   ├── java
    │   │   └── br/com/marcus/todolistapi
    │   │       ├── TodolistapiApplication.java
    │   │       ├── controller
    │   │       │   └── TaskController.java
    │   │       ├── DTO
    │   │       │   ├── TaskRequestDTO.java
    │   │       │   └── TaskResponseDTO.java
    │   │       ├── model
    │   │       │   └── TaskModel.java
    │   │       ├── repository
    │   │       │   └── TaskRepository.java
    │   │       └── service
    │   │           └── TaskService.java
    │   └── resources
    │       ├── application.properties
    │       └── db/migration
    │           ├── V1__createdb__todo.sql
    │           └── V2__add__completed.sql
    └── test
        └── java/br/com/marcus/todolistapi
            └── TodolistapiApplicationTests.java
```

### Responsabilidades dos arquivos principais

- `TodolistapiApplication.java`: classe principal que inicia a aplicacao Spring Boot.
- `TaskController.java`: expoe os endpoints HTTP da API.
- `TaskService.java`: concentra as regras de negocio de tarefas.
- `TaskRepository.java`: interface de acesso ao banco usando Spring Data JPA.
- `TaskModel.java`: entidade JPA mapeada para a tabela `tasks`.
- `TaskRequestDTO.java`: DTO usado para receber dados de criacao e atualizacao.
- `TaskResponseDTO.java`: DTO usado para devolver tarefas nas respostas da API.
- `application.properties`: configuracoes da aplicacao, banco, JPA e Flyway.
- `db/migration`: scripts SQL versionados pelo Flyway.
- `Dockerfile`: arquivo usado para construir a imagem Docker do backend.

## Pre-requisitos

- Java 21
- PostgreSQL 14+ ou compativel
- Maven Wrapper ja incluso no projeto (`./mvnw`)
- Docker e Docker Compose, caso queira executar em containers

## Configuracao de ambiente

O arquivo `src/main/resources/application.properties` le as variaveis abaixo:

```env
PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/todolist
SPRING_DATASOURCE_USERNAME=seu_usuario
SPRING_DATASOURCE_PASSWORD=sua_senha
```

## Rodando localmente

Com o PostgreSQL em execucao e as variaveis de ambiente configuradas, rode:

```bash
./mvnw spring-boot:run
```

A API ficara disponivel em:

- API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Endpoints da API

Base URL local:

```text
http://localhost:8080
```

### Listar tarefas

```http
GET /
```

Resposta:

```json
[
  {
    "id": 1,
    "title": "Estudar Spring Boot",
    "completed": false
  }
]
```

### Criar tarefa

```http
POST /
Content-Type: application/json
```

Payload:

```json
{
  "title": "Estudar Spring Boot",
  "completed": false
}
```

### Atualizar tarefa

```http
PUT /{id}
Content-Type: application/json
```

Payload:

```json
{
  "title": "Estudar Docker",
  "completed": true
}
```

### Excluir tarefa

```http
DELETE /{id}
```

## Banco de dados e migracoes

As migracoes do Flyway ficam em:

- `src/main/resources/db/migration/V1__createdb__todo.sql`
- `src/main/resources/db/migration/V2__add__completed.sql`

Ao iniciar a API, o Flyway aplica automaticamente as migracoes pendentes.

A entidade `TaskModel` representa a tabela `tasks`, com os campos:

- `id`: identificador gerado automaticamente.
- `title`: titulo da tarefa, obrigatorio, com limite de 150 caracteres.
- `completed`: indica se a tarefa foi concluida.

## Build da aplicacao

Para gerar o arquivo `.jar`:

```bash
./mvnw clean package
```

O artefato sera gerado em:

```text
target/todolistapi-0.0.1-SNAPSHOT.jar
```

## Dockerfile do backend

O projeto possui um `Dockerfile` na raiz. Ele:

- Usa a imagem `eclipse-temurin:21-jdk-alpine`.
- Define `/app` como diretorio de trabalho.
- Copia os arquivos do projeto para a imagem.
- Executa o build com `./mvnw clean package -DskipTests`.
- Expoe a porta `8080`.
- Inicia a API pelo `.jar` gerado em `target/todolistapi-0.0.1-SNAPSHOT.jar`.

Para construir a imagem:

```bash
docker build -t todolist-api .
```

Para rodar o container:

```bash
docker run --env PORT=8080 \
  --env SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/todolist \
  --env SPRING_DATASOURCE_USERNAME=seu_usuario \
  --env SPRING_DATASOURCE_PASSWORD=sua_senha \
  -p 8080:8080 \
  todolist-api
```

## Docker Compose

O Docker Compose pode ser usado para subir a API e o PostgreSQL juntos, mantendo os servicos configurados em um `docker-compose.yml`.

Com um arquivo `docker-compose.yml` na raiz do projeto, os comandos principais sao:

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down
```

Para remover tambem os volumes criados pelo banco:

```bash
docker compose down -v
```
