#!/bin/sh
cd /var/www/html/api

STAMP=.first-boot.done
if [ ! -f "$STAMP" ]; then
  echo "[api] first boot setup..."
  # Ensure composer
  if ! command -v composer >/dev/null 2>&1; then
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer || true
  fi
  # Install PHP extensions only once if missing pdo_mysql
  if ! php -m | grep -qi pdo_mysql; then
    if command -v apt-get >/dev/null 2>&1; then
      apt-get update
      DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        git curl unzip ca-certificates libzip-dev zlib1g-dev mariadb-client \
        libicu-dev libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev libonig-dev build-essential || true
      docker-php-ext-configure intl || true
      docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp || true
      docker-php-ext-install -j$(nproc) pdo_mysql bcmath zip intl gd opcache mbstring || true
      rm -rf /var/lib/apt/lists/*
    fi
  fi
  # composer install uma vez
  if [ ! -d vendor ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then
    COMPOSER_MEMORY_LIMIT=-1 COMPOSER_CACHE_DIR=/composer composer install --prefer-dist --no-interaction || true
  fi
  touch "$STAMP"
else
  echo "[api] fast start (skip heavy tasks)"
fi

exec php-fpm -F
