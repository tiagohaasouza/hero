# Reverb via Docker Compose (override)

Foi criado um arquivo `docker-compose.reverb.yml` como **override**.
Uso sugerido:

docker compose -f docker-compose.yml -f docker-compose.reverb.yml up -d hero-reverb

Isso sobe um serviço `hero-reverb` que executa:
php artisan reverb:start --host=0.0.0.0 --port=${REVERB_PORT:-8080}

Requisitos:
- O serviço compartilha o volume do código com a API.
- Variáveis REVERB_* devem estar no /api/.env (já estão no seu .env).
