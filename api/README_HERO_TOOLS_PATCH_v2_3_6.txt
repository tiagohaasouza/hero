Patch v2.3.6
- Backups agora vão para storage/hero/backups:
  - .env => env-YYYYmmdd-HHMMSS.bak
  - docker-compose.yml => docker-compose-YYYYmmdd-HHMMSS.bak.yml
- Install permanece LAZY por padrão.
- Quando o compose não estiver montado no container, os comandos geram patch em storage/hero/compose/ sem falhar.
- Config: você pode definir HERO_COMPOSE_PATH no .env para apontar explicitamente para o compose.
