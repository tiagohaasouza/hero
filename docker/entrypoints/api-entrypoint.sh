#!/bin/sh
set -e

export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd /var/www/html/api

STAMP_DIR="/usr/local/var/hero"
BOOT_STAMP="$STAMP_DIR/first-boot.done"
MIGRATE_STAMP="$STAMP_DIR/migrated.ok"
PKG_STAMP="$STAMP_DIR/pkgs.ok"
PERM_STAMP="$STAMP_DIR/perms.ok"
EXTS_STAMP="$STAMP_DIR/exts.ok"

mkdir -p "$STAMP_DIR"

has_ext() {
  php -m | awk '{print tolower($0)}' | grep -qx "$(echo "$1" | tr '[:upper:]' '[:lower:]')" 2>/dev/null
}

ensure_composer() {
  if ! command -v composer >/dev/null 2>&1; then
    echo "[api] installing composer..."
    php -r "copy('https://getcomposer.org/installer','/tmp/composer-setup.php');"
    php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer || true
    rm -f /tmp/composer-setup.php
  fi
  [ -x /usr/bin/composer ] || { [ -x /usr/local/bin/composer ] && ln -sf /usr/local/bin/composer /usr/bin/composer || true; }
}

ensure_pkgs() {
  if [ -f "$PKG_STAMP" ]; then return 0; fi
  if command -v apt-get >/dev/null 2>&1; then
    echo "[api] installing base packages (once)"
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends mariadb-client ca-certificates curl unzip git libzip-dev zlib1g-dev libicu-dev libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev build-essential
    rm -rf /var/lib/apt/lists/*
  fi
  echo "ok" > "$PKG_STAMP"
}

ensure_php_exts() {
  if [ -f "$EXTS_STAMP" ]; then echo "[api] php extensions already set (stamp)"; return 0; fi

  MISSING=""
  for ext in pdo_mysql bcmath zip intl gd opcache mbstring pcntl posix; do
    has_ext "$ext" || MISSING="$MISSING $ext"
  done

  if [ -n "$MISSING" ]; then
    echo "[api] installing php extensions:$MISSING"
    # Configure deps for intl/gd if needed
    echo "$MISSING" | grep -q intl && docker-php-ext-configure intl || true
    echo "$MISSING" | grep -q gd && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp || true
    docker-php-ext-install -j"$(nproc)" $MISSING || true
  fi

  # Re-check critical one
  if has_ext pdo_mysql; then echo "ok" > "$EXTS_STAMP"; else echo "[api] WARNING: pdo_mysql still missing"; fi
}

fix_permissions() {
  if [ -f "$PERM_STAMP" ]; then return 0; fi
  chown -R www-data:www-data storage bootstrap/cache || true
  chmod -R ug+rwX storage bootstrap/cache || true
  echo "ok" > "$PERM_STAMP"
}

wait_for_db() {
  HOST="${DB_HOST:-hero-db}"
  PORT="${DB_PORT:-3306}"
  echo "[api] waiting for DB at $HOST:$PORT..."
  for i in $(seq 1 60); do
    if command -v mysqladmin >/dev/null 2>&1; then
      if mysqladmin ping -h"$HOST" -P"$PORT" --silent >/dev/null 2>&1; then
        echo "[api] db is up"; return 0
      fi
    else
      php -r 'exit(@fsockopen(getenv("H"), (int)getenv("P"))?0:1);' H="$HOST" P="$PORT" && { echo "[api] db is up"; return 0; }
    fi
    sleep 2
  done
  echo "[api] db not reachable after timeout; continuing"
  return 0
}

run_migrations() {
  if [ -f "$MIGRATE_STAMP" ]; then echo "[api] migrations already applied (stamp)"; return 0; fi
  php artisan key:generate --force >/dev/null 2>&1 || true
  wait_for_db
  echo "[api] running migrations..."
  if php artisan migrate --force; then
    php artisan storage:link || true
    echo "ok" > "$MIGRATE_STAMP"
    echo "[api] migrations ok"
  else
    echo "[api] migrate failed; will retry next boot (no stamp written)"
  fi
}

first_boot() {
  echo "[api] first boot setup..."
  ensure_composer
  ensure_pkgs
  ensure_php_exts
  if [ ! -d vendor ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then
    COMPOSER_MEMORY_LIMIT=-1 COMPOSER_CACHE_DIR=/composer composer install --prefer-dist --no-interaction || true
  fi
  fix_permissions
  run_migrations
  echo "ok" > "$BOOT_STAMP"
}

fast_start() {
  echo "[api] fast start"
  ensure_composer
  ensure_pkgs
  ensure_php_exts
  fix_permissions
  run_migrations
}

if [ ! -f "$BOOT_STAMP" ]; then
  first_boot
else
  fast_start
fi

exec php-fpm -F
