# 02 — Autenticação & Segurança

**Objetivo:** Implementar autenticação baseada em token (Passport OAuth2) no Laravel e estabelecer fundamentos de autorização (roles/permissões), garantindo fluxo completo de login/logout no front.

* **Sessão: Passport OAuth2**

* [ ] Instalar e configurar **Laravel Passport** (caso ainda não esteja instalado). Rodar php artisan passport:install dentro do container app para gerar keys e clients default

* [ ] Criar AuthServiceProvider ou usar existente para chamar Passport::routes() e definir tokens expirations (ex.: 1 dia access token, 15 dias refresh) e scopes básicos[\[3\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L10)

* [ ] Verificar migrations de OAuth nas migrations de tenant (hero-alpha as tinha em database/migrations/tenant) – garantir que ao migrar tenants essas tabelas sejam criadas. Caso contrário, mover migrations OAuth para pasta tenant

* [ ] Implementar controlador de autenticação API (ex.: AuthController em App\\Http\\Controllers\\Api):

  * Método **login**: valida credenciais e realiza request para /oauth/token (Password Grant) internamente, retornando tokens \+ dados do usuário

  * Método **refresh**: recebe refresh\_token e obtém novo access\_token

  * Método **logout**: revoga token atual (Passport::revoke) e talvez todos refresh tokens do usuário

  * Método **me**: retorna perfil do usuário autenticado

* [ ] Adaptar rotas: configurar rotas /auth/login, /auth/refresh, /auth/logout, /auth/me no grupo API v1. Proteger /logout e /me com middleware auth:api (token requerido)

* [ ] Garantir que nas respostas de login/refresh estamos seguindo formato padronizado de sucesso/erro (usar ApiResponse helper futuramente) e incluindo informações como token type, expires\_in se útil

* **Sessão: Roles & Permissions (Spatie)**

* [ ] Instalar pacote **spatie/laravel-permission** e publicar config (config/permission.php)

* [ ] Atualizar config para usar múltiplas guards se necessário (provavelmente guard api apenas) e armazenar roles/permissions nas tabelas de cada tenant (usar conexões tenancy – verificar integração do stancl/tenancy com Spatie)

* [ ] Criar migrations para roles/permissions se não geradas automaticamente (Spatie gera via vendor:publish). Colocar essas migrations em database/migrations/tenant para cada tenant ter suas tabelas de roles/permissions

* [ ] No seeder de cada tenant (ex.: TenantSeeder rodado ao criar um tenant), criar roles básicas: ex. **admin**, **user**, e permissões básicas: **users.view**, **users.edit**, **books.view**, **books.edit**, etc. Atribuir todas permissões ao role admin[\[46\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L30-L38)

* [ ] Ao criar um tenant novo, garantir que o usuário “administrador” padrão receba role **admin**. Se o hero-alpha já criava um “superadmin@example.com” via seeder, replicar lógica para cada tenant ou para um contexto central conforme decisão[\[6\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L8-L11)

* [ ] Mapear scopes OAuth do Passport para permissões: ex. definir em Passport::tokensCan scopes como *admin*, *users.write*, *users.read*, etc., e usar estes scopes no Passport quando emitir tokens. Assim, no front podemos solicitar scopes específicos e no back validar via $user-\>tokenCan('users.write') conforme necessário[\[3\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L10)[\[5\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L8-L16)

* [ ] Proteger rotas de acordo com roles/permissões: aplicar middleware permission: do Spatie ou usar Gate/Policy. Ex.: rotas de gestão de usuários somente acessíveis por quem tem role admin. No início, podemos simplificar assumindo que todos usuários autenticados de um tenant podem acessar os CRUDs básicos, mas deixar a estrutura pronta para restringir depois.

* **Sessão: Segurança e Hardening**

* [ ] Habilitar **CORS** no Laravel adequadamente: atualizar config/cors.php permitindo origem https://hero.localhost e subdomínios \*.hero.localhost para recursos da API (métodos GET/POST/etc.)

* [ ] Configurar rate limiting em rotas sensíveis (especialmente login) para prevenir brute force: usar ThrottleRequests middleware do Laravel (por ex., max 5 tentativas por minuto no login)

* [ ] Forçar uso de HTTPS em ambiente local para simular produção (Nginx já serve 443, então garantir que URL da API no front é https://api.hero.localhost) – isso ajuda a descobrir problemas de conteúdo misto, etc.

* [ ] Verificar se senhas de usuários estão sendo hashadas com algoritmo forte (Laravel default bcrypt ok). Configurar *pepper* ou outras medidas se necessário – provavelmente não, manter padrão.

* [ ] (Opcional) Implementar verificação de e-mail e recuperação de senha: configurar Mail para que o fluxo de “Forgot Password” funcione via Mailhog. Isso envolve criar endpoints POST /auth/forgot para disparar notificação de reset (usando Notification::send com template) e /auth/reset para definir nova senha. Essas funcionalidades podem ficar em segundo plano se não prioritárias agora, mas deixar anotado.

**Deliverables:**  
- [ ] Fluxo de login JWT funcionando (testar via Postman: login com credenciais corretas retorna token e dados usuário; com incorretas retorna erro 401 formatado)  
- [ ] Refresh token e logout operacionais (token revogado não pode mais acessar rotas)  
- [ ] Usuário admin padrão criado e associado a role/permissões adequadas no tenant de exemplo  
- [ ] Restrições básicas de autorização aplicadas em pelo menos uma rota de exemplo (p. ex., listar usuários requer permissão users.view)  
- [ ] Documentação de autenticação atualizada em **docs/auth.md** incluindo exemplos de requests e respostas de login/refresh/logout[\[3\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L10)[\[47\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L4-L6)
