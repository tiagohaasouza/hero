# Passport + Tenancy (atalho)

Após instalar dependências, rode:

```bash
docker exec hero-api php artisan hero:passport:tenancy-install
```

Isso irá:
- `vendor:publish` do Passport
- `migrate` no app central
- `passport:install` no app central
- `tenancy:run php artisan passport:install` (todos os tenants)
