#!/bin/sh
set -e

echo "==> Preflight: verificando arquivos e ambientes"

fail=0

# Check .env files
for f in api/.env app/.env; do
  if [ ! -f "$f" ]; then
    echo "❌ Falta $f"; fail=1
  else
    echo "✅ Encontrado $f"
  fi
done

# Check CRLF and execute bit on entrypoints
for f in docker/entrypoints/api-entrypoint.sh docker/entrypoints/frontend-entrypoint.sh docker/entrypoints/queue-entrypoint.sh docker/nginx/entrypoint.sh; do
  if [ ! -f "$f" ]; then echo "❌ Falta $f"; fail=1; continue; fi
  if grep -q $'\r' "$f"; then
    echo "⚠️  $f possui CRLF — convertendo para LF"
    sed -i 's/\r$//' "$f"
  fi
  chmod +x "$f"
  sh -n "$f" && echo "✅ Sintaxe OK: $f" || { echo "❌ Sintaxe inválida: $f"; fail=1; }
done

# Check nginx template existence
if [ ! -f docker/nginx/conf.d/hero.conf.template ]; then
  echo "❌ Falta docker/nginx/conf.d/hero.conf.template"; fail=1
else
  echo "✅ Template Nginx OK"
fi

if [ "$fail" -ne 0 ]; then
  echo "Preflight falhou. Corrija os itens acima."
  exit 1
fi

echo "✅ Preflight OK. Você pode executar: docker compose up -d --build"
