# Tenancy v3 + Passport – Sem republish e sem duplicar migrations

Comandos:
```bash
docker exec hero-api php artisan optimize:clear
docker exec hero-api php artisan hero:passport:tenancy-install
# flags:
#   --force     -> recria chaves/clients
#   --republish -> republica migrations do Passport (evite; use só se realmente faltarem)
```
O instalador garante o provider `HeroPassportProvider` (que chama `Passport::ignoreMigrations()`), migra o banco central e cria os clients do Passport no central e em todos os tenants via `tenancy:run`.
