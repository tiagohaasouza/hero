#!/bin/sh
set -e

export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd /var/www/html/api

# Stamps fora do bind mount, para não sumirem
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

pkg_installed()
{
  command -v dpkg >/dev/null 2>&1 && dpkg -s "$1" >/dev/null 2>&1
}

ensure_build_deps()
{
  # instala só o que faltar
  NEED_PKGS=""
  for p in git curl unzip ca-certificates libzip-dev zlib1g-dev mariadb-client libicu-dev libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev libonig-dev build-essential; do
    pkg_installed "$p" || NEED_PKGS="$NEED_PKGS $p"
  done
  if [ -n "$NEED_PKGS" ] && command -v apt-get >/dev/null 2>&1; then
    echo "[api] installing apt packages:$NEED_PKGS"
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends $NEED_PKGS
    rm -rf /var/lib/apt/lists/*
  fi
}

has_ext()
{
  php -m | awk '{print tolower($0)}' | grep -qx "$(echo "$1" | tr '[:upper:]' '[:lower:]')"
}

install_missing_exts()
{
  # Se já marcamos que as extensões estão ok, pule
  if [ -f "$EXTS_STAMP" ]; then
    echo "[api] php extensions already set (stamp)"
    return 0
  fi

  MISSING=""
  for ext in pdo_mysql bcmath zip intl gd opcache mbstring pcntl posix; do
    has_ext "$ext" || MISSING="$MISSING $ext"
  done

  if [ -n "$MISSING" ]; then
    echo "[api] missing php extensions:$MISSING"
    ensure_build_deps
    echo "$MISSING" | grep -q intl && docker-php-ext-configure intl || true
    echo "$MISSING" | grep -q gd && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp || true
    docker-php-ext-install -j"$(nproc)" $MISSING || true
  else
    echo "[api] all required php extensions present"
  fi

  # valida novamente; se pcntl e posix existirem, grava o stamp
  if has_ext "pcntl" && has_ext "posix"; then
    echo "ok" > "$EXTS_STAMP"
  fi
}

first_boot()
{
  echo "[api] first boot setup..."
  ensure_composer
  install_missing_exts
  if [ ! -d vendor ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then
    COMPOSER_MEMORY_LIMIT=-1 COMPOSER_CACHE_DIR=/composer composer install --prefer-dist --no-interaction || true
  fi
  echo "ok" > "$BOOT_STAMP"
}

fast_start()
{
  echo "[api] fast start (skip heavy tasks)"
  ensure_composer
  # opcional: garantir extensões após troca de imagem
  install_missing_exts
}

if [ ! -f "$BOOT_STAMP" ]; then
  first_boot
else
  fast_start
fi

exec php-fpm -F
