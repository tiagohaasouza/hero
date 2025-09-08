#!/bin/sh
set -e
mkdir -p /usr/src/app
cd /usr/src/app

pm="npm"
if [ -f pnpm-lock.yaml ] && command -v pnpm >/dev/null 2>&1; then
  pm="pnpm"
elif [ -f yarn.lock ] && command -v yarn >/dev/null 2>&1; then
  pm="yarn"
fi
echo "[frontend] using package manager: $pm"

install_deps() {
  case "$pm" in
    pnpm) pnpm install ;;
    yarn) yarn install ;;
    *)    if [ -f package-lock.json ]; then npm ci || npm install; else npm install; fi ;;
  esac
}

# Install deps if node_modules missing/empty
if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "[frontend] installing dependencies..."
  install_deps
fi

# Ensure vite exists if dev script uses it
NEED_VITE=0
if [ -f package.json ] && grep -q '"dev"[[:space:]]*:[[:space:]]*".*vite' package.json; then
  NEED_VITE=1
fi
if [ "$NEED_VITE" -eq 1 ] && [ ! -x node_modules/.bin/vite ]; then
  echo "[frontend] vite not found — installing devDependency"
  case "$pm" in
    pnpm) pnpm add -D vite @vitejs/plugin-vue >/dev/null 2>&1 || pnpm add -D vite >/dev/null 2>&1 ;;
    yarn) yarn add -D vite @vitejs/plugin-vue >/dev/null 2>&1 || yarn add -D vite >/dev/null 2>&1 ;;
    *)    npm i -D vite @vitejs/plugin-vue >/dev/null 2>&1 || npm i -D vite >/dev/null 2>&1 ;;
  esac
fi

HOST="${VITE_HOST:-0.0.0.0}"
PORT="${VITE_PORT:-3000}"

echo "[frontend] starting Vite at ${HOST}:${PORT}"
case "$pm" in
  pnpm) exec pnpm run dev -- --host "$HOST" --port "$PORT" ;;
  yarn) exec yarn dev --host "$HOST" --port "$PORT" ;;
  *)    exec npm run dev -- --host "$HOST" --port "$PORT" ;;
esac
