Patch v2.5.1
- Geração do docker-compose.override.yml SEM a chave 'version'.
- Sempre inclui o serviço hero-db com:
  env_file: ["./api/.env"]
  environment:
    MYSQL_DATABASE: $${DB_DATABASE}
    MYSQL_USER: $${DB_USERNAME}
    MYSQL_PASSWORD: $${DB_PASSWORD}
    MYSQL_ROOT_PASSWORD: $${DB_ROOT_PASSWORD:-root}
- Garante que o MariaDB crie DB/usuário conforme /api/.env no boot.
