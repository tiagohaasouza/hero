Hero Tools - Patch v2.6.2 (pdo_mysql fix + auto-migrate)
--------------------------------------------------
Correção do erro "could not find driver" (pdo_mysql ausente) e garantia de migrations no boot.

O que mudou
- Entrypoint instala **php extensions** se faltarem: pdo_mysql, bcmath, zip, intl, gd, opcache, mbstring, pcntl, posix.
- Usa stamps para não repetir instalações.
- Mantém espera pelo DB e roda `php artisan migrate --force`; só grava o stamp se sucesso.

Como aplicar (fresh start recomendado)
1) Substitua `docker/entrypoints/api-entrypoint.sh` pelo deste patch.
2) Garanta `/api/.env` correto (DB_*).
3) Suba limpo para recriar o banco/usuário no primeiro boot:
   docker compose down -v
   docker compose up -d
4) Verifique logs do `hero-api` — deve aparecer `migrations ok`.

Observação
- Se você não puder apagar volumes, apenas reinicie `hero-api` após aplicar o entrypoint; as migrations rodarão ao próximo boot quando o driver já estiver disponível.
