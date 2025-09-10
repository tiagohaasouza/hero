#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
API_DIR="${ROOT_DIR}/api"

echo "==> Limpando artefatos de multitenancy/passport anteriores (sem tocar no composer.json/lock)..."

# 1) Apagar comandos e providers custom de workarounds (se existirem)
rm -f "${API_DIR}/app/Console/Commands/HeroPassportTenancyInstall.php" || true
rm -f "${API_DIR}/app/Providers/HeroPassportProvider.php" || true

# 2) Reverter registro manual em bootstrap/providers.php (se houver)
PROVIDERS_FILE="${API_DIR}/bootstrap/providers.php"
if [ -f "${PROVIDERS_FILE}" ]; then
  TMP="$(mktemp)"
  # remove linhas com nossos providers custom
  grep -v -E 'App\\\Providers\\\HeroPassportProvider::class' "${PROVIDERS_FILE}" > "${TMP}" || true
  mv "${TMP}" "${PROVIDERS_FILE}"
fi

# 3) Remover migrations duplicadas que tenhamos copiado manualmente (oauth_* locais)
MIG_DIR="${API_DIR}/database/migrations"
if [ -d "${MIG_DIR}" ]; then
  find "${MIG_DIR}" -maxdepth 1 -type f -name "*_create_oauth_*_table.php" -print -delete || true
fi

# 4) Limpar backups/temporários que criamos
rm -rf "${API_DIR}/storage/hero" || true

# 5) Não tocar em vendor/composer aqui; você disse que vai limpar vendor/banco manualmente.

echo "==> OK. Projeto limpo dos workarounds."
