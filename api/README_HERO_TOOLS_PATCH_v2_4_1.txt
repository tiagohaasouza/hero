Patch v2.4.1
- DEFAULT alterado para **docker-compose.override.yml** (auto-carregado pelo Docker Compose).
- Comandos:
  - `php artisan hero:tools:install --all --compose` => gera `docker-compose.override.yml` (ou em storage/hero/compose/ se o base não estiver montado).
  - `php artisan hero:tools:compose --all` => idem.
  - Para gerar `docker-compose.tools.yml`, use `--compose-file-mode=tools` (install) ou `--as-file=tools` (compose).
