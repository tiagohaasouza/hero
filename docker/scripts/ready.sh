#!/bin/sh
set -e

echo "[ready] aguardando endpoints..."

poll() {
  url="$1"
  tries=60
  i=0
  while [ $i -lt $tries ]; do
    if wget -qO- --no-check-certificate "$url" >/dev/null 2>&1; then
      echo "[ready] ok: $url"
      return 0
    fi
    i=$((i+1))
    sleep 2
  done
  echo "[ready] timeout: $url"
  return 1
}

ok=0
poll "https://api.hero.localhost/api/health" && ok=$((ok+1))
poll "https://hero.localhost/" && ok=$((ok+1))

if [ "$ok" -ge 2 ]; then
  echo "✅ Hero stack pronto!  |  API: https://api.hero.localhost  |  App: https://hero.localhost"
  exit 0
fi

echo "⚠️  Nem todos os serviços responderam a tempo."
exit 1
