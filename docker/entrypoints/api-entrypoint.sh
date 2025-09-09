#!/bin/sh
set -e
cd /var/www/html/api

STAMP_DIR="/usr/local/var/hero"
BOOT_STAMP="$STAMP_DIR/first-boot.done"
MIGRATE_STAMP="$STAMP_DIR/migrated.ok"
mkdir -p "$STAMP_DIR"

wait_for_db(){
  HOST="${DB_HOST:-hero-db}"
  PORT="${DB_PORT:-3306}"
  echo "[api] waiting for DB at $HOST:$PORT..."
  for i in $(seq 1 60); do
    if mysqladmin ping -h"$HOST" -P"$PORT" --silent; then echo "[api] db is up"; return 0; fi
    sleep 2
  done
  echo "[api] db not reachable"
}
run_migrations(){
  if [ -f "$MIGRATE_STAMP" ]; then echo "[api] migrations already applied"; return; fi
  wait_for_db
  php artisan migrate --force || true
  php artisan storage:link || true
  php artisan key:generate --force || true
  echo "ok" > "$MIGRATE_STAMP"
}
if [ ! -f "$BOOT_STAMP" ]; then
  echo "[api] first boot setup..."
  composer install --prefer-dist --no-interaction || true
  run_migrations
  echo "ok" > "$BOOT_STAMP"
else
  echo "[api] fast start"
  run_migrations
fi
exec php-fpm -F
