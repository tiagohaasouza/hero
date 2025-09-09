**MULTITENANCY.md**

# Multi-Tenancy (Stancl Tenancy)

**Objetivo:** Completar a configuração **multi-tenant**, garantindo isolamento total dos dados entre tenants e facilitando a administração central dos tenants. A aplicação será tratada conceitualmente como dois contextos (central e tenants) dentro do mesmo monólito modular, com estrutura separada (app/Central/\* vs app/Tenant/\*) seguindo Domain-Driven Design. Será utilizado o pacote **stancl/tenancy** para implementar o multi-tenancy via subdomínios, com banco de dados separado por tenant. Lembre-se que recursos como autenticação (Passport) e WebSockets devem funcionar tanto no contexto central quanto nos dos tenants.

## Configuração do Tenancy

* [ ] **Configurar identificação por subdomínio:** Validar o arquivo de configuração **config/tenancy.php** para assegurar que a identificação do tenant ocorre por **subdomínio**. O domínio principal (ex.: hero.localhost) será tratado como contexto central (sem tenant).

* [ ] **Banco de dados central vs. tenants:** Verificar as conexões de banco de dados no projeto. Deve haver um **DB central** apontando para o banco principal (por exemplo, database hero) e uma conexão **tenants** herdando as credenciais (usuário/senha) porém com nome de banco dinâmico (por exemplo, usando um prefixo \+ UUID ou slug do tenant). Assim, cada tenant terá seu próprio banco isolado.

* [ ] **Isolamento de recursos compartilhados:** Garantir que recursos como cache, filesystem e Redis sejam segregados por tenant. O Stancl Tenancy, por padrão, aplica **tags** ou prefixos nesses serviços. Conferir se em tenancy.php a configuração de bootstrappers inclui **Cache**, **Filesystem** e **Redis** para isolamento. Ajustar se necessário para evitar colisão de chaves entre tenants.

## Rotas e Domínios

* [ ] **Separar rotas centrais vs. de tenant:** Definir claramente quais rotas pertencem ao contexto **central** (acessíveis via domínio principal, sem um tenant específico) e quais são rotas de **tenant**.

* As rotas **centrais** (por exemplo, criação de um novo tenant, login central se houver, gestão global) devem residir em routes/api.php ou em um arquivo dedicado para rotas central, e **não** inicializar o contexto de tenancy. Ou seja, essas rotas devem ser acessíveis apenas pelo domínio principal (e.g. api.hero.localhost) e usar dados do banco central.

* As rotas de **tenant** específicas (CRUD de recursos do tenant, etc.) devem ficar em um arquivo separado (por exemplo routes/tenant.php) e ser registradas com o middleware do tenancy (por exemplo, InitializeTenancyByDomain) para que sejam resolvidas para o banco do tenant adequado.

* [ ] **Proteger acesso cruzado de domínios:** Aplicar o middleware **PreventAccessFromCentralDomains** (fornecido pelo Stancl Tenancy) nas rotas de tenant. Isso garantirá que rotas de tenant não sejam acessíveis pelo domínio central incorretamente (evitando leaks de dados se alguém tentar usar o domínio errado).

* [ ] **Domínio para contexto central:** Definir qual domínio será usado para o contexto central (super-admin). Por padrão, podemos usar o próprio **hero.localhost** como domínio central global (Stancl automaticamente trata requisições sem subdomínio como central). É importante garantir que nenhum tenant real use esse mesmo domínio. Alternativamente, podemos adotar um subdomínio reservado como **central.hero.localhost** para o administrativo global, se quisermos separar explicitamente – contanto que isso não conflite com tenants. Essa decisão deve estar clara para diferenciar o ambiente central dos ambientes de cada tenant.

## Ciclo de Vida dos Tenants

* [ ] **Criação de tenant:** Implementar (ou finalizar) o comando artisan **tenants:create** para criar um novo tenant. Esse comando deve receber pelo menos um nome e domínio (subdomínio) para o tenant e então utilizar as APIs do Stancl Tenancy (por exemplo, Tenant::create(\[...\])) para gerar um novo tenant. Ao criar, gerar um identificador único (UUID ou slug) e registrar o domínio fornecido para esse tenant. *Exemplo de uso esperado:* php artisan tenants:create Acme acme.hero.localhost deve criar um tenant “Acme” acessível via acme.hero.localhost.

* [ ] **Comandos de manutenção (migrar/seed):** Verificar se o pacote stancl/tenancy já fornece comandos para executar migrations e seed em todos os tenants (normalmente existem tenants:migrate, tenants:rollback, etc.). Caso não estejam disponíveis ou adequados, criar comandos auxiliares (shortcuts) como **tenants:migrate** e **tenants:seed** para aplicar as migrations e seed em **todos** os bancos de tenants de forma fácil. Isso assegura que, ao atualizar o sistema, conseguimos propagar mudanças de schema para cada tenant.

* [ ] **Hooks pós-criação:** Ao criar um tenant via comando ou via API, executar automaticamente as ações de **provisionamento** do tenant:

* Criação do banco de dados físico do tenant (caso o banco não seja criado automaticamente pelo Stancl, podemos fazê-lo via evento).

* Execução das **migrations** específicas desse tenant no novo banco.

* Execução de um **seed básico** no tenant (por exemplo, criar um usuário administrador padrão nesse tenant, carregar configurações iniciais, etc.). O Stancl Tenancy possui eventos (como TenantCreated) e configurações automáticas (tenancy.create\_database, tenancy.migrate\_database) para isso. Verificar se esses hooks estão habilitados na config e funcionando; caso contrário, implementar no **TenancyServiceProvider**: por exemplo, escutar o evento de criação para acionar a criação do schema e rodar migrations/seeds. No projeto anterior (*hero-alpha*), essas ações eram realizadas no TenantCreated dentro do service provider – podemos seguir abordagem similar.

* [ ] **Deleção de tenant:** Implementar um fluxo seguro para remoção de tenants via comando **tenants:delete {tenantId}**. Esse comando deve:

* Revogar todos os tokens OAuth associados àquele tenant (garantir que usuários daquele tenant não mantenham acessos após remoção). Isso pode ser feito iterando sobre os usuários do tenant e revogando via Passport, ou utilizando alguma funcionalidade do Stancl para executar código no contexto do tenant que revogue tokens em massa.

* Remover o banco de dados daquele tenant por completo. O Stancl Tenancy oferece um método $tenant-\>delete() que já dispara um evento TenantDeleted. Precisamos confirmar se a configuração padrão está programada para **dropar** o schema do tenant automaticamente nesse evento; caso contrário, executar a exclusão do banco manualmente ao deletar.

* Remover o registro do tenant do banco central (tabela tenants/domains) após a remoção dos dados relacionados, para limpar a referência.

* [ ] **Dados de exemplo (seed de demo):** Criar, se ainda não existir, um seeder ou opção para popular um tenant de exemplo com dados fictícios. Por exemplo, ao rodar tenants:create poder passar uma flag \--with-demo-data para já inserir no novo tenant alguns registros (como livros, usuários, etc.) para fins de desenvolvimento ou demonstração. Esse seeder de demo facilita validar rapidamente o funcionamento em um ambiente recém-criado.

## Dados Globais vs. do Tenant

* [ ] **Definir modelos no banco central:** Revisar e decidir quais dados permanecem no **banco de dados central** e quais ficam em bancos dos tenants. Provavelmente, apenas a tabela de **tenants** e **domains** (gerenciadas pelo pacote Tenancy) e talvez usuários **super-admin globais** (se existirem) residirão no banco central. Decidir se teremos usuários globais (que podem gerenciar todos os tenants). Se sim, implementar um guard separado ou lógica de permissões diferenciada para esses usuários globais no sistema (por exemplo, um guard admin para o contexto central). Se não houver usuários globais, então **todos os usuários** cadastrados pertencem a algum tenant e não haverá login no contexto central exceto talvez um usuário “master” técnico.

* [ ] **Migrations separadas:** Garantir que as **migrations de tenant** estão organizadas separadamente (por exemplo, em database/migrations/tenant ou conforme padrão do stancl/tenancy). O Tenancy deve estar configurado para buscar migrations nessa pasta ao criar/migrar novos tenants. Revisar tenancy.php para a opção de paths de migrations de tenants e ajustar se necessário. (Ex.: Stancl costuma permitir configurar migrations\_directory ou similar.)

* [ ] **Seeds separados:** Adaptar a lógica de seed para suportar contexto multi-tenant. Por exemplo, podemos manter um DatabaseSeeder global para dados do banco central (se necessário) e um seeder específico para tenants. Ao criar um novo tenant, rodar esse TenantSeeder no contexto do tenant. Além disso, se rodarmos db:seed globalmente, usar Tenancy::withoutTenancy() para evitar interferência, e talvez criar um comando para semear todos tenants (tenants:seed) conforme mencionado.

* [ ] **Testar isolamento na prática:** Depois de implementar as etapas acima, realizar testes manuais básicos para verificar o isolamento: criar pelo menos 2 tenants diferentes e certificar que cada um possui suas próprias tabelas (usuários, dados de domínio de negócio, etc.). Inserir dados em um tenant (via API ou Tinker) e confirmar que não aparecem no outro tenant. Também testar autenticação: por exemplo, acessar a API de um tenant A usando um token de usuário do tenant A (deve funcionar e retornar dados de A), mas usando esse mesmo token para tentar acessar o tenant B deve falhar (não autorizado ou sem dados encontrados, conforme a regra de isolamento).

## Deliverables

* [ ] **Comandos de tenant operando:** Comandos artisan de criar e deletar tenant funcionando e testados (e.g., artisan tenants:create Acme acme.hero.localhost cria corretamente o tenant e artisan tenants:delete \<id\> remove-o completamente).

* [ ] **Isolamento completo de dados:** Confirmado que ao usar a API, cada token de usuário só acessa os dados do seu próprio tenant. Qualquer tentativa de usar um token de outro tenant para acessar recursos alheios resulta em erro ou ausência de dados (isolamento garantido).

* [ ] **Rotas distintas funcionando:** As rotas do contexto **central** (por exemplo, criação de tenant, login de admin global se houver) funcionam somente no domínio central (hero.localhost ou definido) e não ativam o tenant. As rotas de **tenant** funcionam nos subdomínios correspondentes e acessam apenas os dados do tenant correto.

* [ ] **Provisionamento automático:** Ao criar um tenant novo, o banco de dados é criado e migrations/seeds de tenant são executados automaticamente (incluindo criação de usuário admin padrão no tenant). Da mesma forma, o comando de deleção remove completamente os dados daquele tenant.  
  *(Com a arquitetura multi-tenant estabelecida, podemos então integrar os módulos de autenticação e WebSockets de forma que operem adequadamente em ambos os contextos.)*
