# Hero Tools — v2 (Laravel 12)

Comandos Artisan para instalar/desinstalar ferramentas, **aplicar blocos no docker-compose.yml**, e **listar URLs** via rotas e CLI.

## Instalação
1) Extraia este pacote na raiz do projeto (os caminhos já começam com `api/`).
2) Registre o provider em `api/bootstrap/providers.php`:
```
<?php

return [
    // ...
    App\Providers\HeroToolsServiceProvider::class,
];
```
3) Se for usar edição do compose, instale:
```
composer require symfony/yaml --dev
```

## Rotas
- `GET /tools` → página HTML com links das ferramentas
- `GET /tools/json` → JSON com todas
- `GET /tools/{key}` → HTML de uma ferramenta
- Dica: defina `APP_URL` no `.env` para que os hosts sejam montados corretamente.

## CLI
Listar (com URLs):
```
php artisan hero:tools:list --urls
```

Instalar e aplicar blocos do compose:
```
php artisan hero:tools:install --include=mailhog,meilisearch --compose
# ou
php artisan hero:tools:install --all --compose
```

Remover e retirar blocos do compose:
```
php artisan hero:tools:uninstall --include=minio --compose
```

Aplicar/remover manualmente:
```
php artisan hero:tools:compose --include=mailhog,meilisearch
php artisan hero:tools:compose --include=minio --remove
```

Dry-run:
```
php artisan hero:tools:compose --include=adminer --dry-run
```

## Segurança do compose
- Backup automático: `docker-compose.yml.bak.YYYYmmdd-HHMMSS`
- Merge idempotente; listas (ports/volumes/depends_on/environment) deduplicadas
- Scalars do bloco sobrescrevem os existentes para o serviço alvo
