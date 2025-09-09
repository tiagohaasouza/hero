Patch v2.4.0
- Em vez de editar o docker-compose.yml base, os comandos agora geram **docker-compose.tools.yml** (por padrão) ao lado do compose.
- Alternativa: `--compose-file-mode=override` ou `--as-file=override` para gerar **docker-compose.override.yml**, que é carregado automaticamente pelo Docker Compose.
- Se o compose não estiver montado no container, os arquivos são escritos em **storage/hero/compose/** para você copiar para a raiz do projeto.
- Backups do .env continuam em storage/hero/backups.
- Uso:
  - `php artisan hero:tools:install --all --compose` => cria docker-compose.tools.yml ao lado do compose (ou em storage).
  - `php artisan hero:tools:compose --all --as-file=override` => cria docker-compose.override.yml.
  - Host: `docker compose -f docker-compose.yml -f docker-compose.tools.yml up -d` ou apenas `docker compose up -d` se usar override.
