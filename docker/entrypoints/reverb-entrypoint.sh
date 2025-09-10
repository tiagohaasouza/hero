#!/bin/sh
set -e
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd /var/www/html/api

if [ -f artisan ]; then
  echo "[reverb] starting Laravel Reverb server..."
  exec php artisan reverb:start --host="${REVERB_SERVER_HOST:-0.0.0.0}" --port="${REVERB_SERVER_PORT:-8080}" --ansi
else
  echo "[reverb] ERROR: artisan not found in /var/www/html/api"
  sleep 10
fi
