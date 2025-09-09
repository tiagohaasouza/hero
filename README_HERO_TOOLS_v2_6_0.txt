Hero Tools - Patch v2.6.0 (fresh start)
--------------------------------------------------
Inclui:
- Geração do docker-compose.override.yml SEM 'version', injetando hero-db com env_file=./api/.env e MYSQL_* escapados (host não interpola).
- Entrypoint robusto da API: espera DB, corrige permissões, roda migrations; grava stamp APENAS se migrar com sucesso.

Passos para subir do zero:
1) Garanta /api/.env com, por exemplo:
   DB_CONNECTION=mysql
   DB_HOST=hero-db
   DB_PORT=3306
   DB_DATABASE=api
   DB_USERNAME=hero
   DB_PASSWORD=hero
   DB_ROOT_PASSWORD=root

2) Gere o override com o comando de instalação (fora do container):
   php artisan hero:tools:install --all --compose

3) Suba limpo (cria DB e usuário a partir do /api/.env no primeiro boot):
   docker compose down -v
   docker compose up -d

4) Verifique:
   - phpMyAdmin (porta conforme override): login com hero/hero (ou o que definiu)
   - Logs da API: docker compose logs -f hero-api (deve mostrar migrations ok)

Dica:
- Se o override for gerado dentro do container em storage, publique para a raiz com:
  docker cp hero-api:/var/www/html/api/storage/hero/compose/docker-compose.override.yml ./docker-compose.override.yml
