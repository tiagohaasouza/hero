# 03 — Multi-Tenancy (Stancl Tenancy)

**Objetivo:** Finalizar a configuração multi-tenant garantindo isolamento total dos dados e facilitar a administração de tenants.

* **Sessão: Configuração do Tenancy**

* [ ] Validar arquivo config/tenancy.php: deve estar configurado para identificar tenant por **subdomínio** (central domain hero.localhost)[\[39\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L12-L20)

* [ ] Verificar que o *DB central* e *template de tenants* estão corretos: conexão central apontando para banco principal (ex.: database hero), e *tenants* herdando configurações (usuário/senha) com nome de BD dinâmico (ex.: prefixo \+ tenant UUID)[\[39\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L12-L20)

* [ ] Garantir que recursos compartilhados têm segregação: Stancl Tenancy por padrão aplica tags no Redis, filesystem etc. – checar se tenancy.bootstrappers inclui Cache, Filesystem e Redis para isolamento (deveria)[\[38\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L22-L25).

* **Sessão: Rotas e Domínios**

* [ ] Definir rotas “centrais” (acessíveis pelo domínio principal sem tenant) vs rotas de tenant:

  * Rotas centrais em routes/api.php – ex.: criação de novo tenant, gestão global – não inicializam tenancy

  * Rotas específicas de tenant em routes/tenant.php – inicializadas pelo middleware de Tenancy (ex.: InitializeTenancyByDomain)[\[48\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L13-L16)

* [ ] Assegurar que o **middleware de bloqueio** (PreventAccessFromCentralDomains) está ativo nas rotas de tenant, para impedir acesso via domínio errado[\[49\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L14-L17).

* [ ] Revisar subdomínio padrão para tenant “central” (super-admin): possivelmente usar central.hero.localhost ou apenas hero.localhost para contexto global. Garantir que esse não conflita com nenhum tenant real. Stancl Tenancy costuma tratar requests sem identificação como central automaticamente.

* **Sessão: Ciclo de Vida dos Tenants**

* [ ] Comando **tenants:create** – já implementado ou a implementar: criar um novo tenant a partir de nome/domínio fornecido (usando Stancl Tenancy, e.g. Tenant::create()), gerar UUID, criar domínio etc.[\[50\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L16-L24)

* [ ] Comandos **tenants:migrate** e **tenants:seed** – verificar se o pacote fornece out-of-the-box (Stancl tem comandos para aplicar migrations a todos tenants). Se não, criar comandos shortcuts para rodar migrate em todos tenants.

* [ ] Ao **criar um tenant**, executar automaticamente: criação do banco de dados do tenant, execução das migrations de tenant e seed básico (por ex., criar um usuário admin). No hero-alpha, isso ocorria via eventos do TenancyServiceProvider (TenantCreated -\> criar BD e migrar)[\[39\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L12-L20)[\[38\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L22-L25). Confirmar se está configurado (hooks tenancy.create\_database e tenancy.migrate\_database habilitados). Ajustar se necessário.

* [ ] **Deleção de tenant**: implementar fluxo seguro: comando tenants:delete {tenantId} que:

  * Revogue todos tokens OAuth daquele tenant (pode usar Stancl Tenancy para executar código no contexto do tenant ou iterar usuários e revogar via Passport)

  * Delete o banco de dados do tenant (Stancl fornece método Tenant::delete() que dispara evento TenantDeleted – verificar se configurado para dropar BD)[\[51\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L18-L25)

  * Remova registro do tenant do DB central

* [ ] Criar (se não existir) seeder para **Tenant de Exemplo**: popular um tenant novo com dados de exemplo (livros, usuários, etc. fictícios) – útil para ambientes de dev e demo. Pode ser ativado via opção no comando create (e.g. \--with-demo-data).

* **Sessão: Dados Globais vs do Tenant**

* [ ] Revisar quais modelos ficam no banco central: provavelmente apenas a tabela tenants e domains (do Stancl) e possivelmente usuários *super-admin* se houver (caso usuários globais que gerenciam todos os tenants). Decidir se haverá usuários globais; se sim, implementar guard separado ou distinguir permissões. Se não, todos os usuários pertencem a tenants.

* [ ] Garantir que **migrations de tenant** estão separadas em database/migrations/tenant. Conferir se o comando do Stancl busca nessa pasta – ajustar tenancy.php se necessário para apontar para migrations de tenant[\[49\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L14-L17).

* [ ] Atualizar qualquer lógica de **seeds**: ex. se temos DatabaseSeeder global, talvez chamar Tenancy::withoutTenancy para rodar seeds centrais, e tenants:seed para rodar nos tenants.

* [ ] (Teste) Criar via comando 2 tenants e verificar: cada um possui suas tabelas de usuários, livros, etc. Criar registros em um tenant não afeta outro (ver através do app ou tinker).

**Deliverables:**  
- [ ] Comandos de criação e remoção de tenant testados (ex.: artisan tenants:create Acme acme.hero.localhost)  
- [ ] Acesso isolado: acessando API de tenant A com token de usuário de A retorna dados, mas com token de B nega acesso ou não encontra (conforme esperado)  
- [ ] Rotas centrais (ex.: criação de tenant) não inicializam tenancy e funcionam no domínio hero.localhost  
- [ ] Documentação **docs/tenancy.md** resumindo como funciona (como criar tenant, entrar no tenant via subdomínio, etc.)
