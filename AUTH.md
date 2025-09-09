**AUTH.md**

# Autenticação & Segurança

**Objetivo:** Implementar a **autenticação baseada em token OAuth2** usando Laravel Passport, bem como estabelecer fundamentos de autorização (roles e permissões) para controle de acesso. Garantiremos o fluxo completo de login/refresh/logout para o frontend (SPA) e definiremos políticas básicas de segurança (CORS, rate limiting, senhas seguras). Tudo isso deve funcionar no ambiente multi-tenant – ou seja, tokens e usuários devem ser válidos somente dentro de seu tenant (ou no contexto central, se aplicável). Integraremos também um sistema de roles/permissões (usando Spatie) para permitir funcionalidades de admin vs usuário comum. Lembre-se que tanto a **central** quanto os **tenants** precisam suportar autenticação (por exemplo, um super-admin no contexto central e usuários nos tenants).

## Passport OAuth2 (Tokens de Acesso)

* [ ] **Instalar e configurar Passport:** Caso ainda não esteja presente, adicionar o pacote **Laravel Passport** ao projeto. Em seguida, rodar php artisan passport:install dentro do container da API para gerar as chaves de criptografia e os clientes OAuth padrão (Password Grant, etc.). Isso prepara o sistema para emitir tokens JWT/OAuth2.

* [ ] **Configurar provedor de auth OAuth:** Criar (ou atualizar) o **AuthServiceProvider** do Laravel para registrar as rotas do Passport (Passport::routes()). Nesta configuração, definir tempos de expiração dos tokens conforme necessário – por exemplo, **access tokens** válidos por 1 dia, **refresh tokens** por 15 dias (valores sugeridos que podem ser ajustados). Também já definir, se possível, alguns escopos padrão via Passport::tokensCan (por exemplo: scope admin, users.read, users.write, etc.), que serão usados para delimitar permissões dos tokens.

* [ ] **Isolar OAuth por tenant:** Verificar as migrations de OAuth (tabelas oauth\_\* do Passport). No contexto multi-tenant, queremos que cada tenant tenha suas próprias tabelas de tokens e clients para garantir isolamento. Certificar que as migrations dessas tabelas estão sendo aplicadas **dentro dos bancos dos tenants** (no projeto anterior, essas migrations foram colocadas em database/migrations/tenant). Caso no setup atual as tabelas OAuth estejam sendo criadas apenas no banco central, mover essas migrations para a pasta de migrations de tenant e rodar novamente nos tenants, assim cada tenant gerencia seus tokens de forma independente. (O banco central não precisa guardar tokens de usuários de tenants, a menos que haja usuários globais com tokens separados.)

* [ ] **Controlador de autenticação API:** Implementar um controlador para as rotas de auth da API (por exemplo, AuthController em App\\Http\\Controllers\\Api). Este controlador terá os endpoints:

* **login**: Recebe credenciais do usuário (email/senha) e realiza a obtenção de um token do Passport. Pode internamente fazer uma requisição para /oauth/token usando o Password Grant (fornecendo client\_id, secret, username, password) e devolver ao frontend o access\_token, refresh\_token e dados básicos do usuário autenticado.

* **refresh**: Recebe um refresh\_token válido e obtém um novo access\_token (e possivelmente um novo refresh token) do Passport, retornando-os ao cliente. Assim, mantém a sessão ativa sem novo login.

* **logout**: Revoga o token atual do usuário. Podemos usar Passport para revogar o token de acesso (e idealmente os refresh tokens associados) de modo que ele não possa mais ser utilizado.

* **me**: Retorna os dados do perfil do usuário atualmente autenticado (com base no token enviado), permitindo ao frontend obter informações do usuário logado e verificar se o token ainda é válido.

* [ ] **Definir rotas de auth:** Mapear as rotas no arquivo de rotas da API (grupo v1). Por exemplo: POST /auth/login, POST /auth/refresh, POST /auth/logout, GET /auth/me. As rotas de **login** e **refresh** devem ser públicas (não exigem token prévio), enquanto **logout** e **me** devem estar protegidas por middleware auth:api (exigindo token válido no header Authorization). Garantir que essas rotas funcionem tanto no contexto de um tenant (um usuário comum fazendo login no seu tenant) quanto, possivelmente, no contexto central se houver um usuário administrativo global.

* [ ] **Formato de resposta unificado:** Assegurar que as respostas desses endpoints sigam um formato JSON padrão de sucesso ou erro. Por exemplo, no login bem-sucedido, retornar código 200 com um JSON contendo os campos do token (access\_token, refresh\_token, token\_type, expires\_in) e dados do usuário (nome, email, etc. necessários). Em caso de erro (credenciais inválidas), retornar um erro 401 com mensagem apropriada. Podemos posteriormente utilizar um helper de resposta (como uma classe ApiResponse) para padronizar, mas desde já seguir consistência nos campos retornados.

## Roles & Permissions (Spatie)

* [ ] **Instalar Spatie Permission:** Adicionar o pacote **spatie/laravel-permission** que nos fornece gestão de roles (papéis) e permissions. Executar php artisan vendor:publish para publicar a configuração em config/permission.php e as migrations das tabelas de roles/permissions.

* [ ] **Configuração multi-tenant:** Ajustar config/permission.php se necessário para suportar múltiplos guards. Provavelmente, usaremos apenas o guard api para autenticação via token em ambos contextos (central e tenants), mas precisamos pensar: se houver usuários globais (guard separado), poderíamos ter dois guards (api-central e api-tenant). Decidir conforme a estratégia de usuários globais. Em um cenário simples sem usuários globais, podemos usar um único guard API para tudo e o próprio tenant id dos usuários diferencia contextos.

* [ ] **Migrations das permissions por tenant:** As migrations padrão do Spatie criarão tabelas (roles, permissions, model\_has\_roles, etc.). Precisamos garantir que **essas tabelas existam em cada banco de tenant**. Ou seja, colocar as migrations de roles/permissions dentro da pasta de migrations dos tenants, assim ao criar/migrar um tenant, ele ganha suas próprias tabelas de autorização. (Alternativamente, rodar manualmente tenants:migrate após publicar as migrations do Spatie). Confirmar que no banco central não há necessidade dessas tabelas para usuários comuns, apenas possivelmente se decidirmos ter roles para usuários globais.

* [ ] **Seeder básico de auth por tenant:** No processo de inicialização de cada tenant (por exemplo, no seeder executado após criação do tenant), criar roles e permissions padrão:

* Pelo menos duas roles: por exemplo, **admin** (administrador do tenant) e **user** (usuário padrão).

* Definir um conjunto básico de permissões que representem ações no sistema, por exemplo: users.view, users.edit, books.view, books.edit, etc., abrangendo as entidades principais do sistema.

* Atribuir todas as permissões à role **admin** (de forma que o admin tenha acesso total no tenant) e talvez permissões limitadas à role user (ou nenhuma explícita, dependendo da política – usuários comuns podem ter acesso implícito a certas ações).

* [ ] **Usuário admin padrão:** Assegurar que, ao criar um tenant novo, o primeiro usuário (ou o usuário padrão criado) receba a role **admin** automaticamente. Por exemplo, se no seeder de criação do tenant geramos um usuário administrador (como admin@tenant.com), devemos associá-lo à role admin criada acima. No projeto antigo (hero-alpha), aparentemente era criado um superadmin global via seeder – aqui podemos replicar a lógica por tenant ou ajustar conforme a decisão de usuário global. Em resumo, cada tenant deve ter pelo menos um usuário administrador para gerenciar suas configurações.

* [ ] **Mapeamento de escopos OAuth \-\> permissões:** Integrar os scopes do Passport com o sistema de permissões. Por exemplo, ao chamar Passport::tokensCan(\[...\]) podemos definir scopes como admin, users.write, users.read, etc. Podemos então, durante a autenticação, conceder certos scopes ao token (por exemplo, se o usuário for admin, dar scope admin). No lado da API, poderemos verificar if ($user-\>tokenCan('users.write')) para permitir determinada ação, embora muitas vezes verificar a permission via Spatie (attached to user) seja suficiente. Documentar quais scopes existem e garantir consistência com as permissions definidas. *(Obs: Scopes podem ser opcionais no front-end inicialmente, mas já deixamos prontos para um controle adicional caso necessário.)*

* [ ] **Restringir acesso por roles/permissões:** Aplicar proteção em rotas conforme as roles e permissões definidas. O pacote Spatie fornece middleware como role: ou permission: que podemos usar nas rotas (ex.: \-\>middleware('permission:users.view') em uma rota de listar usuários). Também podemos usar Gates/Policies para cenários mais complexos. Inicialmente, podemos optar por uma configuração simplificada onde todos os usuários autenticados dentro de um tenant podem acessar as funcionalidades básicas (CRUD) – isso agiliza os testes. Porém, é importante deixar pronta a estrutura para, por exemplo, **restringir rotas de gestão de usuários apenas para admins**. Podemos fazer um teste aplicando ao menos uma restrição de exemplo: por exemplo, exigir permission:users.view na rota de listar usuários, e permission:users.edit na rota de editar usuário. Assim validamos que a checagem de permissão está funcionando.

## Segurança e Hardening

* [ ] **CORS:** Habilitar/configurar o **CORS (Cross-Origin Resource Sharing)** corretamente para a API. No arquivo config/cors.php, incluir a origem do front-end (no desenvolvimento, https://hero.localhost e possivelmente subdomínios como \*.hero.localhost) como permitida, bem como os métodos HTTP necessários (GET, POST, PUT, DELETE) e cabeçalhos. Isso garantirá que o browser permita as requests do front (que roda num domínio) para a API (que está em outro subdomínio).

* [ ] **Rate Limiting em login:** Proteger o endpoint de **login** contra tentativas de força bruta. Podemos usar o middleware ThrottleRequests do Laravel definindo, por exemplo, um limite de 5 tentativas por minuto por IP/usuário para o login. Assim, múltiplas credenciais erradas seguidas bloquearão temporariamente novas tentativas daquele cliente.

* [ ] **HTTPS apenas:** Em ambiente local já estamos usando HTTPS via Nginx (porta 443 com certificado self-signed). Devemos garantir que o frontend consuma a API via https://api.hero.localhost para simular produção e evitar problemas de conteúdo misto. Caso necessário, habilitar no Laravel a variável APP\_FORCE\_SCHEME=https ou similares para gerar URLs sempre com https. (No dev, possivelmente não precisamos forçar já que o Nginx cuida disso, mas é bom ficar atento a usar sempre https no front.)

* [ ] **Hash de Senhas:** Confirmar que as senhas dos usuários estão sendo hashadas usando algoritmo forte – por padrão o Laravel utiliza **bcrypt**, o que é adequado. Não é necessário customizar isso no momento (opcionalmente, poderíamos adicionar um "pepper" adicional via config se quiséssemos mais segurança, mas não é prioridade).

* [ ] **Fluxos de recuperação de acesso (opcional):** Se for escopo do projeto, planejar a implementação de **verificação de e-mail** e **recuperação de senha**. Isso envolve:

* Configurar um serviço de e-mail (em dev, usar o Mailhog já incluso) e as filas necessárias.

* Criar endpoint POST /auth/forgot que recebe um email e envia um email de reset de senha para o usuário (usar as Notifications do Laravel, que geram um token de reset e um link).

* Criar endpoint POST /auth/reset que, recebendo o token de reset e a nova senha, realiza a alteração da senha do usuário.

* Esses detalhes podem ficar para segunda fase se não forem prioritários agora, mas é bom deixar anotado para futura implementação. O importante é que toda a infraestrutura de autenticação já suporta adicionar isso sem grandes mudanças.

## Deliverables

* [ ] **Fluxo de login completo:** Usuário consegue fazer login via API com email e senha e recebe um token de acesso (e refresh token) válido. Testes via ferramenta (Postman ou similar) devem mostrar: com credenciais corretas, a API retorna token \+ dados do usuário; com credenciais incorretas, retorna erro 401 com mensagem de erro.

* [ ] **Refresh token e logout:** O endpoint de refresh gera um novo access token quando enviado um refresh token válido, e o endpoint de logout revoga o token atual corretamente (tokens revogados não permitem mais acessar rotas protegidas).

* [ ] **Roles e permissões aplicadas:** Em cada tenant, existe um usuário admin padrão com todas as permissões. As roles/permissões foram criadas nas tabelas do tenant. Foi verificado, por exemplo, que o usuário admin consegue acessar uma rota restrita (ex.: listar usuários se exige users.view), enquanto um usuário comum (se configurado com menos permissões) seria barrado.

* [ ] **Admin do tenant padrão:** Ao criar um novo tenant, confirma-se que o usuário inicial do tenant possui role **admin** atribuída e que essa role possui as permissões básicas. Esse usuário consegue gerenciar seu tenant (de acordo com permissões), enquanto usuários não-admin ficariam limitados.

* [ ] **Segurança básica habilitada:** CORS configurado permitindo o front-end acessar a API sem erros, limite de requisições no login ativo (tentativas excessivas resultam em erro 429), e toda comunicação ocorrendo via HTTPS local. Não houve problemas de conteúdo misto e as senhas dos usuários estão devidamente seguras no banco.
