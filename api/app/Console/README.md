# Hero Tools — Artisan


Conjunto de comandos Artisan para instalar/desinstalar ferramentas auxiliares integradas ao seu stack Docker.


## Instalação


1) Adicione os arquivos deste pacote dentro de `/api` conforme caminhos listados.
2) Registre o provider em `config/app.php`:
   'providers' => [ App\Providers\HeroToolsServiceProvider::class, ... ]
3) Publique a config (opcional):
   php artisan vendor:publish --tag=hero-tools-config


## Comandos


Listar ferramentas suportadas:
php artisan hero:tools:list


Instalar ferramentas específicas (ex.: Mailhog + Meilisearch):
php artisan hero:tools:install --include=mailhog,meilisearch


Instalar todas as ferramentas:
php artisan hero:tools:install --all


Instalar sem alterar .env (apenas mostrar o que seria feito):
php artisan hero:tools:install --include=minio --dry-run --no-env


Instalar e imprimir os comandos docker correspondentes:
php artisan hero:tools:install --include=redis-commander --with-docker


Desinstalar ferramentas específicas e remover chaves do .env:
php artisan hero:tools:uninstall --include=meilisearch


Desinstalar todas mas manter as chaves do .env:
php artisan hero:tools:uninstall --all --keep-env


## Observações


• Os comandos **não executam** Docker por você. Use `--with-docker` para receber as sugestões de `docker compose up -d <service>` ou `stop` e rode-as no host.
• A lista de ferramentas e variáveis pode ser expandida em `config/hero_tools.php`.
• Para Horizon, após instalar o pacote, publique assets/configs conforme documentação do Laravel Horizon e adicione o processo ao seu supervisor/container de queue.
