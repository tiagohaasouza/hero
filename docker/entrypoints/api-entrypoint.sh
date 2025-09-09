#!/bin/sh
set -e

export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd /var/www/html/api

STAMP_DIR="/usr/local/var/hero"
BOOT_STAMP="$STAMP_DIR/first-boot.done"
EXTS_STAMP="$STAMP_DIR/exts.ok"
mkdir -p "$STAMP_DIR"

ensure_composer()
{
  if ! command -v composer >/dev/null 2>&1; then
    echo "[api] installing composer..."
    php -r "copy('https://getcomposer.org/installer','/tmp/composer-setup.php');"
    php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer || true
    rm -f /tmp/composer-setup.php
  fi
  [ -x /usr/bin/composer ] || { [ -x /usr/local/bin/composer ] && ln -s /usr/local/bin/composer /usr/bin/composer || true; }
}

pkg_installed(){ command -v dpkg >/dev/null 2>&1 && dpkg -s "$1" >/dev/null 2>&1; }

ensure_build_deps()
{
  NEED_PKGS=""
  for p in git curl unzip ca-certificates libzip-dev zlib1g-dev mariadb-client libicu-dev libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev libonig-dev build-essential autoconf pkg-config; do
    pkg_installed "$p" || NEED_PKGS="$NEED_PKGS $p"
  done
  if [ -n "$NEED_PKGS" ] && command -v apt-get >/dev/null 2>&1; then
    echo "[api] installing apt packages:$NEED_PKGS"
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends $NEED_PKGS
    rm -rf /var/lib/apt/lists/*
  fi
}

has_ext(){ php -m | awk '{print tolower($0)}' | grep -qx "$(echo "$1" | tr '[:upper:]' '[:lower:]')"; }

install_missing_exts()
{
  # Se já marcamos OK, ainda assim cheque Redis (PECL) separadamente:
  BUNDLED_MISSING=""
  for ext in pdo_mysql bcmath zip intl gd opcache mbstring pcntl posix; do
    has_ext "$ext" || BUNDLED_MISSING="$BUNDLED_MISSING $ext"
  done

  if [ -n "$BUNDLED_MISSING" ]; then
    echo "[api] missing php extensions (bundled):$BUNDLED_MISSING"
    ensure_build_deps
    echo "$BUNDLED_MISSING" | grep -q intl && docker-php-ext-configure intl || true
    echo "$BUNDLED_MISSING" | grep -q gd && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp || true
    docker-php-ext-install -j"$(nproc)" $BUNDLED_MISSING || true
  else
    echo "[api] bundled extensions already present"
  fi

  # Redis é PECL (não vem em docker-php-ext-install)
  if ! has_ext "redis"; then
    echo "[api] installing pecl/redis..."
    ensure_build_deps
    printf "\n" | pecl install -o -f redis || true
    docker-php-ext-enable redis || true
  else
    echo "[api] pecl redis already present"
  fi

  # Marca stamp quando tudo crítico estiver ativo
  if has_ext "pcntl" && has_ext "posix" && has_ext "redis"; then
    echo "ok" > "$EXTS_STAMP"
  fi
}

ensure_storage_permissions()
{
  echo "[api] fixing storage/bootstrap permissions..."
  mkdir -p storage/logs bootstrap/cache
  chown -R www-data:www-data storage bootstrap/cache || true
  find storage -type d -exec chmod 775 {} \; || true
  find storage -type f -exec chmod 664 {} \; || true
  chmod 775 bootstrap/cache || true
  touch storage/logs/laravel.log || true
  chown www-data:www-data storage/logs/laravel.log || true
  chmod 664 storage/logs/laravel.log || true
}

first_boot()
{
  echo "[api] first boot setup..."
  ensure_composer
  install_missing_exts
  ensure_storage_permissions
  if [ ! -d vendor ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then
    COMPOSER_MEMORY_LIMIT=-1 COMPOSER_CACHE_DIR=/composer composer install --prefer-dist --no-interaction || true
  fi
  echo "ok" > "$BOOT_STAMP"
}

fast_start()
{
  echo "[api] fast start (skip heavy tasks)"
  ensure_composer
  install_missing_exts
  ensure_storage_permissions
}

if [ ! -f "$BOOT_STAMP" ]; then first_boot; else fast_start; fi

exec php-fpm -F
