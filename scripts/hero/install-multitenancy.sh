#!/usr/bin/env bash
set -Eeuo pipefail

# Container PHP-FPM (mude via: API_CONT=seu-container ./install-multitenancy.sh)
API_CONT="${API_CONT:-hero-api}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
API_DIR="${ROOT_DIR}/api"

if [ ! -d "${API_DIR}" ]; then
  echo "ERRO: pasta /api não encontrada na raiz."
  exit 1
fi

docker_exec() { docker exec -i "${API_CONT}" bash -lc "$*"; }

echo "==> Verificando container ${API_CONT}..."
if ! docker ps --format '{{.Names}}' | grep -qx "${API_CONT}"; then
  echo "ERRO: container ${API_CONT} não está em execução."
  exit 1
fi

echo "==> Composer install (dentro do container) se necessário..."
docker_exec 'cd /var/www/html/api && if [ ! -d vendor ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then COMPOSER_MEMORY_LIMIT=-1 composer install --no-interaction; fi'

echo "==> Requerendo pacotes (stancl/tenancy v3 + laravel/passport) — idempotente..."
docker_exec 'cd /var/www/html/api && composer require stancl/tenancy:^3 laravel/passport:^13 --no-interaction || true'

echo "==> Limpando caches do Laravel..."
docker_exec 'cd /var/www/html/api && php artisan optimize:clear'

echo "==> Instalando Tenancy (config + migrations base) — idempotente..."
docker_exec 'cd /var/www/html/api && php artisan tenancy:install || true'

echo "==> Garantindo Feature de Passport no config/tenancy.php..."
docker_exec '
  set -e
  f="/var/www/html/api/config/tenancy.php"
  if [ -f "$f" ] && ! grep -q "Stancl\\\\Tenancy\\\\Features\\\\Passport::class" "$f"; then
    php -r "\
      \$f=\"$f\"; \
      \$s=file_get_contents(\$f); \
      \$s=preg_replace(\"/(Features::class,\\s*\\[)/\",\"$1\\n        \\\\Stancl\\\\Tenancy\\\\Features\\\\Passport::class,\", \$s, 1); \
      file_put_contents(\$f,\$s);"
    echo "[install] Feature Passport adicionada em config/tenancy.php"
  else
    echo "[install] Feature Passport já presente em config/tenancy.php"
  fi
'

echo "==> Executando migrations do app central..."
docker_exec 'cd /var/www/html/api && php artisan migrate --force'

echo "==> Garantindo migrations do Passport (central) — só se faltarem tabelas..."
docker_exec '
  set -e
  cd /var/www/html/api
  php -r "\
    require __DIR__ . \"/vendor/autoload.php\"; \
    \$app = require __DIR__ . \"/bootstrap/app.php\"; \
    \$app->make(Illuminate\\Contracts\\Console\\Kernel::class)->bootstrap(); \
    use Illuminate\\Support\\Facades\\Schema; \
    if (!Schema::hasTable(\"oauth_clients\") \
        || !Schema::hasTable(\"oauth_access_tokens\") \
        || !Schema::hasTable(\"oauth_refresh_tokens\") \
        || !Schema::hasTable(\"oauth_personal_access_clients\") \
        || !Schema::hasTable(\"oauth_auth_codes\") \
        || !Schema::hasTable(\"oauth_device_codes\")) { \
      echo \"[install] Rodando migrations do Passport (vendor)\\n\"; \
      passthru(\"php artisan migrate --path=vendor/laravel/passport/database/migrations --force\"); \
    } else { \
      echo \"[install] Migrations do Passport já aplicadas — ok\\n\"; \
    }"
'

echo "==> Instalando Passport (central) — chaves e clients (idempotente)..."
# Chaves
docker_exec '
  set -e
  cd /var/www/html/api
  if [ ! -f storage/oauth-private.key ] || [ ! -f storage/oauth-public.key ]; then
    php artisan passport:keys --no-interaction
  else
    echo "[install] Chaves do Passport já existem — ok"
  fi
'

# Personal Access Client (ATENÇÃO: Passport ^13 NÂO usa mais a coluna personal_access_client em oauth_clients)
docker_exec '
  set -e
  cd /var/www/html/api
  php -r "\
    require __DIR__ . \"/vendor/autoload.php\"; \
    \$app = require __DIR__ . \"/bootstrap/app.php\"; \
    \$app->make(Illuminate\\Contracts\\Console\\Kernel::class)->bootstrap(); \
    use Illuminate\\Support\\Facades\\Schema; \
    use Illuminate\\Support\\Facades\\DB; \
    // Se por algum motivo as tabelas ainda não existirem, rode de novo as migrations do pacote:
    if (!Schema::hasTable(\"oauth_personal_access_clients\") || !Schema::hasTable(\"oauth_clients\")) { \
      passthru(\"php artisan migrate --path=vendor/laravel/passport/database/migrations --force\"); \
    } \
    \$exists = false; \
    if (Schema::hasTable(\"oauth_personal_access_clients\")) { \
      \$exists = DB::table(\"oauth_personal_access_clients\")->exists(); \
    } \
    if (!\$exists) { \
      echo \"[install] Criando Personal Access Client (Passport)...\\n\"; \
      passthru(\"php artisan passport:client --personal --name=\\\"Default Personal Access Client\\\" --no-interaction\"); \
    } else { \
      echo \"[install] Personal Access Client já existe — ok\\n\"; \
    }"
'

echo "==> Pasta de migrations por-tenant..."
docker_exec 'cd /var/www/html/api && [ -d database/migrations/tenant ] || mkdir -p database/migrations/tenant'

cat <<'TXT'

==> Pronto.

Fluxo recomendado:

1) Criar tenant + domínio:
   docker exec hero-api bash -lc "cd /var/www/html/api && php artisan tenant:create acme acme.hero.localhost"

2) Migrations por-tenant (coloque-as em database/migrations/tenant):
   docker exec hero-api bash -lc "cd /var/www/html/api && php artisan tenants:migrate --force"

3) Passport por-tenant (gera clients/chaves por tenant):
   docker exec hero-api bash -lc "cd /var/www/html/api && php artisan tenants:artisan 'passport:install --no-interaction'"

Observações:
- Tudo idempotente; rodar novamente não quebra o estado.
- O check de client pessoal agora olha para a tabela oauth_personal_access_clients (compatível com Passport ^13).
TXT