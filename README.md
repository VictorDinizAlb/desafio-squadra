## ormconfig

=> OracleDB Connection:

[
{
"type": "oracle",
"host": "localhost",
"port": 1521,
"username": "C##VICTOR",
"password": "senha",
"database": "xe",
"entities": ["./src/modules/**/typeorm/entities/*.{js,ts}"]
}
]

## .env

=> Postgres Connection:

TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = postgres
TYPEORM_DATABASE = desafio-squadra
TYPEORM_PORT = 5432
TYPEORM_MIGRATIONS = src/database/migrations/\*.ts
TYPEORM_MIGRATIONS_DIR = src/database/migrations
