
# Patch v2.8.5 — Passport idempotente

Este patch torna **idempotente** a instalação do Passport no comando `hero:passport:tenancy-install`:

- Não republica migrations por padrão (somente com `--republish`).
- **Antes do migrate**, remove de `database/migrations` quaisquer migrations `create_oauth_*` **cuja tabela já exista**, movendo-as para um backup em `storage/hero/backups/migrations/YYYYMMDD-HHMMSS`.
- Executa `php artisan migrate --force` com segurança.
- Gera chaves (`passport:keys`) e cria o Personal Client apenas se ainda não existir.
- `HeroPassportProvider` só chama `Passport::ignoreMigrations()` se o método existir (compatível com versões antigas do Passport).

## Como aplicar
1. Extraia este patch na raiz do repositório (onde existe a pasta `/api`).
2. Rode:
   ```bash
   docker exec hero-api php artisan optimize:clear
   docker exec hero-api php artisan hero:passport:tenancy-install
   ```
   > Use `--republish` **apenas** se você quiser regravar migrations do Passport.
