#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="${ROOT_DIR}/api"

if [ ! -d "${API_DIR}" ]; then
  echo "ERRO: pasta /api não encontrada na raiz. Execute este script na raiz do repositório (onde existe /api e /app)."
  exit 1
fi

echo "==> Instalando pacotes PHP (stancl/tenancy, laravel/passport, spatie/laravel-permission)..."
cd "${API_DIR}"
composer require stancl/tenancy laravel/passport spatie/laravel-permission

echo "==> Instalando broadcasting (Laravel Reverb)..."
php artisan install:broadcasting --ansi || true

echo "==> Publicando configs e migrations (Passport, Permission, Tenancy)..."
php artisan vendor:publish --provider="Laravel\\Passport\\PassportServiceProvider" --force
php artisan vendor:publish --provider="Spatie\\Permission\\PermissionServiceProvider" --force
php artisan tenancy:install || true

echo "==> Ajustando bootstrap/providers.php (Laravel 12) para registrar providers..."
PROVIDERS_FILE="${API_DIR}/bootstrap/providers.php"
if [ -f "${PROVIDERS_FILE}" ]; then
  add_line() {
    local class="$1"
    if ! grep -q "$class" "${PROVIDERS_FILE}"; then
      # insere após o primeiro 'return ['
      sed -i '0,/return \[/s//return [\
    '"$class"'/' "${PROVIDERS_FILE}" || true
    fi
  }
  add_line "App\\\Providers\\\TenancyServiceProvider::class,"
  add_line "App\\\Providers\\\BroadcastServiceProvider::class,"
  add_line "App\\\Providers\\\AuthServiceProvider::class,"
fi

echo "==> Verificando .env para BROADCAST_DRIVER e variáveis do Reverb..."
ENV_FILE="${API_DIR}/.env"
if [ -f "${ENV_FILE}" ]; then
  # DRIVER correto
  if ! grep -q '^BROADCAST_DRIVER=' "$ENV_FILE"; then
    echo 'BROADCAST_DRIVER=reverb' >> "$ENV_FILE"
  fi

  # Variáveis do servidor Reverb (backend)
  for key in REVERB_APP_ID REVERB_APP_KEY REVERB_APP_SECRET REVERB_HOST REVERB_PORT REVERB_SCHEME; do
    if ! grep -q "^${key}=" "$ENV_FILE"; then
      case "$key" in
        REVERB_APP_ID)     echo "REVERB_APP_ID=hero-app" >> "$ENV_FILE" ;;
        REVERB_APP_KEY)    echo "REVERB_APP_KEY=local-key" >> "$ENV_FILE" ;;
        REVERB_APP_SECRET) echo "REVERB_APP_SECRET=local-secret" >> "$ENV_FILE" ;;
        REVERB_HOST)       echo "REVERB_HOST=0.0.0.0" >> "$ENV_FILE" ;;
        REVERB_PORT)       echo "REVERB_PORT=8080" >> "$ENV_FILE" ;;
        REVERB_SCHEME)     echo "REVERB_SCHEME=http" >> "$ENV_FILE" ;;
      esac
    fi
  done

  # Variáveis Vite (frontend) espelhando as do backend
  for key in VITE_REVERB_APP_KEY VITE_REVERB_HOST VITE_REVERB_PORT VITE_REVERB_SCHEME; do
    if ! grep -q "^${key}=" "$ENV_FILE"; then
      case "$key" in
        VITE_REVERB_APP_KEY)   echo "VITE_REVERB_APP_KEY=\${REVERB_APP_KEY}" >> "$ENV_FILE" ;;
        VITE_REVERB_HOST)      echo "VITE_REVERB_HOST=\${REVERB_HOST}" >> "$ENV_FILE" ;;
        VITE_REVERB_PORT)      echo "VITE_REVERB_PORT=\${REVERB_PORT}" >> "$ENV_FILE" ;;
        VITE_REVERB_SCHEME)    echo "VITE_REVERB_SCHEME=\${REVERB_SCHEME}" >> "$ENV_FILE" ;;
      esac
    fi
  done
fi

echo "==> (Opcional) docker-compose override para Reverb:"
echo "Crie um docker-compose.reverb.yml e suba com: docker compose -f docker-compose.yml -f docker-compose.reverb.yml up -d hero-reverb"
echo "Exemplo de serviço:"
cat <<'YAML_EXEMPLO'
services:
  hero-reverb:
    image: ${API_IMAGE:-hero-api}
    command: sh -lc "php artisan reverb:start --host=${REVERB_HOST:-0.0.0.0} --port=${REVERB_PORT:-8080}"
    environment:
      - APP_ENV=${APP_ENV:-local}
      - BROADCAST_DRIVER=${BROADCAST_DRIVER:-reverb}
      - REVERB_APP_ID=${REVERB_APP_ID:-hero-app}
      - REVERB_APP_KEY=${REVERB_APP_KEY:-local-key}
      - REVERB_APP_SECRET=${REVERB_APP_SECRET:-local-secret}
      - REVERB_HOST=${REVERB_HOST:-0.0.0.0}
      - REVERB_PORT=${REVERB_PORT:-8080}
      - REVERB_SCHEME=${REVERB_SCHEME:-http}
    ports:
      - "${REVERB_PORT:-8080}:${REVERB_PORT:-8080}"
    depends_on:
      - hero-api
YAML_EXEMPLO

echo "==> Rodando migrations do banco central..."
cd "${API_DIR}"
php artisan migrate

echo "==> Concluído. Próximos passos:"
echo " - Suba o Reverb pelo override OU dentro do container da API:"
echo "     docker compose -f docker-compose.yml -f docker-compose.reverb.yml up -d hero-reverb"
echo "     # ou: php artisan reverb:start --host=\${REVERB_HOST:-0.0.0.0} --port=\${REVERB_PORT:-8080}"
echo " - Crie tenant: php artisan tenant:create acme acme.hero.localhost && php artisan tenants:migrate"
echo " - Instale Passport por tenant: php artisan tenancy:run php artisan passport:install"
