# Descrição

Projeto realizado durante um bootcamp para devs back-end com nodejs. O projeto se trata de uma api back-end desenvolvida com as seguintes ferramentas:

- NodeJs
- Typescript
- Typeorm
- Express
- Postgres / OracleDB

### As funcionalidades são realizar o CRUD dos registros de UFs, Municipios, Bairros, Endereços e Pessoas.

#### As rotas para criar são:

- POST - localhost:3333/uf
- POST - localhost:3333/municipio
- POST - localhost:3333/bairro
- POST - localhost:3333/pessoa

Os dados são passados através de um json no request.body como por exemplo:

{
"sigla": "AC",
"nome": "Acre",
"status": 1
}

#### As rotas para listar ou consultar 1 ou mais registros são:

- GET - localhost:3333/uf
- GET - localhost:3333/municipio
- GET - localhost:3333/bairro
- GET - localhost:3333/pessoa

É possível que a resposta seja um json ou um array de json

Para consulta específica é possível passar parâmetros, como por exemplo:

localhost:3333/uf/?sigla=AC

#### As rotas para alterar são:

- PUT - localhost:3333/uf
- PUT - localhost:3333/municipio
- PUT - localhost:3333/bairro
- PUT - localhost:3333/pessoa

Nesse caso os dados também são passados através de um json no request.body, so que dessa vez, passando também a primary key do registro, como por exemplo:

{
"codigoUF": 3,
"sigla": "AM",
"nome": "Amazonas",
"status": 1
}

#### As rotas para deletar são:

- DELETE - localhost:3333/uf/ + código do registro
- DELETE - localhost:3333/municipio/ + código do registro
- DELETE - localhost:3333/bairro/ + código do registro
- DELETE - localhost:3333/pessoa/ + código do registro

Exemplo: localhost:3333/pessoa/25

## Banco de dados

- É necessário criar o banco com o nome 'desafio_squadra' e rodar o comando '(yarn / npm run) typeorm migration:run' no terminal para criação das tabelas no banco.
