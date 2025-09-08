#!/usr/bin/env bash
set -euo pipefail

read -r -p "This will STOP and DELETE ALL docker containers/images/volumes/networks on this machine. Continue? [yes/NO] " ans
if [[ "${ans:-}" != "yes" ]]; then
  echo "Aborted."; exit 1
fi

echo "[nuke] Stopping containers..."
docker stop $(docker ps -q) 2>/dev/null || true

echo "[nuke] Removing containers..."
docker rm -f $(docker ps -aq) 2>/dev/null || true

echo "[nuke] Removing images..."
docker rmi -f $(docker images -q) 2>/dev/null || true

echo "[nuke] Removing volumes..."
docker volume rm -f $(docker volume ls -q) 2>/dev/null || true

echo "[nuke] Removing networks (except default)..."
for net in $(docker network ls -q); do
  # Skip default networks
  name=$(docker network inspect --format='{{.Name}}' "$net")
  if [[ "$name" != "bridge" && "$name" != "host" && "$name" != "none" ]]; then
    docker network rm "$net" || true
  fi
done

echo "[nuke] System prune..."
docker system prune -af --volumes || true

echo "[nuke] Done."
