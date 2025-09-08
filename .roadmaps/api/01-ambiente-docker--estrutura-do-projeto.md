# 01 — Ambiente Docker & Estrutura do Projeto

**Objetivo:** Configurar o ambiente de desenvolvimento Docker de forma “zero config” e preparar a estrutura de código do Laravel para suportar as novas convenções.

* **Sessão: Docker Compose & .env**

* [x] Remover arquivo .env na raiz do repositório (e references nos scripts)

* [x] Definir valores padrão no docker-compose.yml para APP\_DOMAIN (hero.localhost), FRONTEND\_PORT (3000), NGINX\_HTTP/HTTPS (80/443), DB\_USERNAME/DB\_PASSWORD etc., eliminando dependência de .env externo[\[42\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L20-L23)

* [x] Integrar geração de certificado dev no processo de *up*: criar script de entrypoint no Nginx ou serviço auxiliar para gerar hero.localhost.crt/.key caso ausentes[\[27\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/.dev-helpers/create-dev-certs.sh#L26-L34)[\[29\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/.dev-helpers/create-dev-certs.sh#L53-L59)

* [x] Unificar templates Nginx em um só (ouvindo 80/443) e remover arquivos não usados; ajustar comando envsubst no compose conforme necessário

* [x] Garantir que o Nginx proxy direciona corretamente: hero.localhost -\> frontend (porta Vite), api.hero.localhost -\> Laravel (PHP-FPM), incluindo suporte a WebSockets (upgrade)

* [x] Revisar variáveis de ambiente de e-mail (Mailhog) e outras no compose, definindo portas padrão 1025/8025, etc.

* **Sessão: Build e Inicialização Automática**

* [x] Escrever script de entrypoint para container **app** (PHP) que:

  * Verifique se vendor/ está vazio; se sim, instale dependências (composer install)

  * Execute migrações iniciais (ex.: php artisan migrate \--seed) no banco central

  * (Opcional) Crie um tenant de exemplo se nenhum existir (pode ser controlado via variável)

  * Inicie o PHP-FPM

* [x] Modificar serviço **frontend** no compose para rodar npm install somente se node\_modules/ não existir (pode usar npm ci para consistência) – ou aceitar a instalação a cada up, aproveitando cache do volume node\_modules[\[43\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/docker-compose.yml#L108-L116)

* [x] Testar docker compose up em um ambiente limpo (sem volumes) e confirmar: containers sobem sem erros, certificado gerado, acessar https://hero.localhost carrega a SPA (mesmo que frontend ainda seja placeholder), e https://api.hero.localhost retorna algo (ex.: JSON de status)

* **Sessão: Estrutura de Pastas e Namespace**

* [x] Criar no backend estruturas de pastas sugeridas: **Domain**, **Application**, **Infrastructure** dentro de api/app (se optar por divisão DDD)

* [x] Mover/organizar models, providers e outros para estas pastas conforme lógica (por exemplo, Models e Repositories em Domain, Services em Application, Providers/Http em Infrastructure) – *obs.: refatoração cuidadosa, opcional neste momento inicial*

* [x] Revisar autoload do *composer.json*: adicionar namespaces correspondentes, e.g. "Domain\\\\": "app/Domain/" etc., caso a divisão acima seja implementada

* [x] Criar pasta app/Support para utilitários globais (Traits, helpers) e futura classe de resposta padronizada (ApiResponse)[\[44\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/01-roadmap-arquitetura-e-versionamento.md#L6-L14)

* [x] Criar pasta app/Contracts se necessário para interfaces de Serviço/Repo (alguns contratos podem ser definidos posteriormente, mas deixar estrutura pronta)

* [x] Atualizar o namespace base do projeto (se necessário no *composer.json* ou *Application.php*) para refletir nova estrutura – provavelmente manteremos App\\\\ para compatibilidade, mas usar sub-namespaces para novas pastas

* **Sessão: Versionamento da API**

* [x] Implementar prefixo de versão nos endpoints: adicionar no RouteServiceProvider um prefixo /api/v1 padrão para o grupo **api** ou ajustar as rotas existentes para um arquivo routes/api\_v1.php[\[22\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/01-roadmap-arquitetura-e-versionamento.md#L13-L19)

* [x] Provisionar um arquivo de rotas para futura versão v2 (ex.: routes/api\_v2.php com estrutura básica)[\[22\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/01-roadmap-arquitetura-e-versionamento.md#L13-L19)

* [x] Incluir nas respostas da API um header X-API-Version: 1 para clareza (pode ser feito via middleware ou direto no global response)[\[45\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/01-roadmap-arquitetura-e-versionamento.md#L14-L19)

* [x] Documentar estratégia de versionamento e deprecação (manteremos v1 ativa por X tempo após v2 lançar, etc.) – talvez não codificado, mas anotado em /docs

**Deliverables:**  
- [x] Docker Compose funcional e documentado (README de ambiente)  
- [x] Navegação básica front-back via domínio local (hero.localhost) funcionando  
- [x] Estrutura do projeto organizada para próxima fase (nenhuma classe quebrada após mover namespaces)  
- [x] Rotas da API acessíveis sob /api/v1/... com versionamento preparado
