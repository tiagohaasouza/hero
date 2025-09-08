#!/usr/bin/env sh
set -e

# Generates dev TLS certs for hero.localhost and *.hero.localhost
# Uses mkcert if available; falls back to openssl self-signed.
# Run from repository root:  sh .dev-helpers/create-dev-certs.sh

CERT_DIR="api/docker/certs"
mkdir -p "$CERT_DIR"

DOMAIN_BASE="hero.localhost"
CERT="$CERT_DIR/hero.localhost.crt"
KEY="$CERT_DIR/hero.localhost.key"

echo "=> Creating dev TLS certs in $CERT_DIR"

# Try mkcert
if command -v mkcert >/dev/null 2>&1; then
  echo "-> mkcert found. Using mkcert..."
  mkcert -install
  mkcert -key-file "$KEY" -cert-file "$CERT" "$DOMAIN_BASE" "*.$DOMAIN_BASE"
  echo "=> Done (mkcert)."
  exit 0
fi

# Fallback to openssl self-signed with SAN
echo "-> mkcert not found. Using openssl self-signed..."
TMPCONF="$(mktemp)"
cat > "$TMPCONF" <<EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[dn]
C = BR
ST = SP
L = Sao Paulo
O = Dev
OU = Dev
CN = hero.localhost

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = hero.localhost
DNS.2 = *.hero.localhost
EOF

openssl req -x509 -newkey rsa:2048 -nodes -sha256 -days 3650 \
  -keyout "$KEY" -out "$CERT" -config "$TMPCONF"

rm -f "$TMPCONF"
echo "=> Done (openssl self-signed)."
echo "NOTE: You may need to trust this certificate in your OS/browser."
