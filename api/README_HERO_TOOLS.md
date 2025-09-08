# Hero Tools — Artisan (Laravel 12)

Comandos Artisan para instalar/desinstalar ferramentas e editar o docker-compose.yml.

## Instalação
1) Copie estes arquivos para **/api** mantendo os caminhos.
2) Registre o provider em **/api/bootstrap/providers.php**:
```
<?php

return [
    // outros providers ...
    App\Providers\HeroToolsServiceProvider::class,
];
```
3) (Opcional) Publique a config:
```
php artisan vendor:publish --tag=hero-tools-config
```
4) Para editar docker-compose via comando, instale a dependência YAML:
```
composer require symfony/yaml --dev
```

## Comandos

Listar ferramentas:
```
php artisan hero:tools:list
```

Instalar ferramentas específicas (altera .env e mostra pacotes Composer se houver):
```
php artisan hero:tools:install --include=mailhog,meilisearch
```

Instalar todas:
```
php artisan hero:tools:install --all
```

Dry-run sem alterar .env:
```
php artisan hero:tools:install --include=minio --dry-run --no-env
```

Imprimir comandos docker após instalar:
```
php artisan hero:tools:install --include=redis-commander --with-docker
```

Desinstalar e remover chaves do .env:
```
php artisan hero:tools:uninstall --include=meilisearch
```

Desinstalar todas mantendo o .env:
```
php artisan hero:tools:uninstall --all --keep-env
```

### Editar docker-compose.yml (merge seguro)
Aplicar blocos de serviços no docker-compose.yml (com backup):
```
php artisan hero:tools:compose --include=mailhog,meilisearch
```
Remover blocos:
```
php artisan hero:tools:compose --include=minio --remove
```
Dry-run:
```
php artisan hero:tools:compose --include=adminer --dry-run
```
Arquivo alternativo:
```
php artisan hero:tools:compose --include=mailhog --file=./docker/docker-compose.dev.yml
```

## Notas de segurança
- O merge do compose cria **backup automático** (ex.: docker-compose.yml.bak.YYYYmmdd-HHMMSS) — restaure se necessário.
- Listas (ports, volumes, depends_on, environment) são **deduplicadas**.
- Em conflitos de chave **escalares**, o bloco **sobrescreve** o valor existente para o serviço alvo.
- Revise o plano com `--dry-run` antes de aplicar em ambientes sensíveis.
