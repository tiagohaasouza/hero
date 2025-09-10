
# Patch v2.8.4 — Passport provider guard

- Atualiza `App\Providers\HeroPassportProvider` para **não** chamar `Passport::ignoreMigrations()` quando o método não existir (versões antigas do Passport).
- Evita o erro *Call to undefined method Laravel\Passport\Passport::ignoreMigrations()* durante `php artisan migrate`.
- Mantém o comportamento idempotente do instalador anterior: sem republicar migrations automaticamente.

## Como aplicar
1. Extraia este patch na raiz do repositório (onde existe a pasta `/api`).
2. Rode:
   ```bash
   docker exec hero-api php artisan optimize:clear
   docker exec hero-api php artisan hero:passport:tenancy-install
   ```
