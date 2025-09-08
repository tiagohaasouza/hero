#!/usr/bin/env sh
set -e
# Run once after first boot to prepare Laravel inside the api-php container.
# Usage:  sh .dev-helpers/laravel-init.sh

echo "=> Running composer install..."
docker compose exec -T api-php bash -lc 'composer install --no-interaction --prefer-dist --no-progress'

echo "=> Generating app key (safe if already set)..."
docker compose exec -T api-php bash -lc 'php artisan key:generate --force || true'

echo "=> Running migrations (if any)..."
docker compose exec -T api-php bash -lc 'php artisan migrate --force || true'

echo "=> Cache clear (dev)"
docker compose exec -T api-php bash -lc 'php artisan config:clear && php artisan route:clear && php artisan view:clear'

echo "Done."
