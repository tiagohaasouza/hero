#!/bin/sh
set -e
./docker/scripts/preflight.sh
docker compose up -d --build
echo "Acompanhe: docker compose logs hero-ready -f"
