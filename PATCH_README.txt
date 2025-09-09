Hero Patch (recriado): Multitenancy + Auth (Passport) + WebSockets (Reverb)
--------------------------------------------------------------------------
1) Extraia todo o conteúdo na RAIZ do repositório (onde existem /api e /app).
2) Rode: sh ./apply_patch.sh
3) Para subir o Reverb via Docker:
   docker compose -f docker-compose.yml -f docker-compose.reverb.yml up -d hero-reverb

Notas:
- BROADCAST_DRIVER (Laravel) é a var correta; seu .env tem BROADCAST_CONNECTION=reverb. Mantive compatibilidade, mas recomendo adicionar BROADCAST_DRIVER=reverb.
- REVERB_* já constam no seu /api/.env; o serviço hero-reverb usa essas variáveis.
- Commands criados: tenant:create, tenant:delete (adicione no Console\Kernel).
- Rotas de auth: /api/auth/login|refresh|me|logout (central). Rotas tenant: /api/tenant/ping (exemplo).
