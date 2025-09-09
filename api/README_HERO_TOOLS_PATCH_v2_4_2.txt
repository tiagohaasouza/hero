Patch v2.4.2
- Default: gera docker-compose.override.yml.
- Se o compose base não está montado no container, o comando grava em api/storage/hero/compose/ e IMPRIME o comando:
  docker cp hero-api:/var/www/html/api/storage/hero/compose/docker-compose.override.yml ./docker-compose.override.yml
- Novo comando: php artisan hero:tools:publish-compose
  - Exibe o docker cp e escreve um helper script em storage/hero/compose/publish-compose.sh
