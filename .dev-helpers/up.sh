#!/usr/bin/env sh
set -e
# Helper to spin the stack with TLS-ready Nginx
# Run from repository root:  sh .dev-helpers/up.sh

echo "=> Ensuring dev TLS certs exist..."
if [ ! -f "api/docker/certs/hero.localhost.crt" ] || [ ! -f "api/docker/certs/hero.localhost.key" ]; then
  echo "-> Certificates not found. Generating..."
  sh .dev-helpers/create-dev-certs.sh
else
  echo "-> Certificates already present."
fi

echo "=> Restarting containers..."
docker compose down -v --remove-orphans || true
docker compose up --build
