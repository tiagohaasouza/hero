#!/bin/sh
set -e

# Resolve FRONTEND_PORT robustly
PORT="${VITE_PORT:-${FRONTEND_PORT:-}}"

if [ -z "$PORT" ] && [ -f /var/www/html/app/.env ]; then
  PORT="$(grep -E '^[[:space:]]*VITE_PORT[[:space:]]*=' /var/www/html/app/.env | tail -n1 | cut -d= -f2- | tr -d '\r' | tr -d '"' | tr -d "'" )"
fi

PORT="$(printf "%s" "$PORT" | grep -o '[0-9]\+' | tail -n1)"
[ -z "$PORT" ] && PORT="3000"

export FRONTEND_PORT="$PORT"

cat > /etc/nginx/conf.d/default.conf <<CONF
map \$http_upgrade \$connection_upgrade {
  default upgrade;
  ''      close;
}

upstream php_backend {
  server ${PHP_FPM_HOST:-hero-api}:${PHP_FPM_PORT:-9000};
}

server {
  listen 80;
  listen [::]:80;
  server_name hero.localhost *.hero.localhost api.hero.localhost;
  return 301 https://\$host\$request_uri;
}

# API host
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name api.hero.localhost;

  ssl_certificate     /etc/nginx/ssl/hero.localhost.crt;
  ssl_certificate_key /etc/nginx/ssl/hero.localhost.key;

  access_log /var/log/nginx/access.log;
  error_log  /var/log/nginx/error.log;

  root  /var/www/html/api/public;
  index index.php;

  location / {
    try_files \$uri /index.php?\$query_string;
  }

  location ~ \.php$ {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME /var/www/html/api/public\$fastcgi_script_name;
    fastcgi_param HTTPS on;
    fastcgi_param HTTP_HOST \$host;
    fastcgi_pass php_backend;
    fastcgi_read_timeout 300;
  }
}

# App + Tenants
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name hero.localhost *.hero.localhost;

  ssl_certificate     /etc/nginx/ssl/hero.localhost.crt;
  ssl_certificate_key /etc/nginx/ssl/hero.localhost.key;

  access_log /var/log/nginx/access.log;
  error_log  /var/log/nginx/error.log;

  # Laravel API (central + tenants)
  location ^~ /api/ {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME /var/www/html/api/public/index.php;
    fastcgi_param HTTPS on;
    fastcgi_param HTTP_HOST \$host;
    fastcgi_param REQUEST_URI \$request_uri;
    fastcgi_param QUERY_STRING \$query_string;
    fastcgi_param REQUEST_METHOD \$request_method;
    fastcgi_param CONTENT_TYPE \$content_type;
    fastcgi_param CONTENT_LENGTH \$content_length;
    fastcgi_pass php_backend;
    fastcgi_read_timeout 300;
  }

  # SPA (Vite dev server)
  location / {
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection \$connection_upgrade;
    proxy_pass http://hero-frontend:$PORT;
  }
}
CONF

echo "[nginx] Using FRONTEND_PORT=$PORT"
nginx -t
exec nginx -g 'daemon off;'
