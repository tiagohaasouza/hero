# 07 — Funcionalidades BÁSICAS (BREAD & CRUDs)

**Objetivo:** Implementar os módulos CRUD principais (como Usuários, Livros, etc.) seguindo o padrão BREAD e utilizando ferramentas de geração de código quando possível.

* **Sessão: Comando make:bread**

* [ ] Implementar comando Artisan **make:bread {Nome}** caso não exista: gerar Migration, Model, Factory, Seeder, Controller API, Requests e Resource para {Nome}. Pode-se basear no pacote [Laravel Blueprint](https://github.com/laravel-shift/blueprint) ou nos stubs custom do hero-alpha (presentes em api/stubs/bread/\*)[\[13\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L5).

* [ ] Incluir opções no comando:

  * \--tenant para indicar que as migrations devem ir em database/migrations/tenant e modelo deve usar TenantConnection, etc.

  * \--softdeletes para incluir timestamps de deleção nas migrations e nos modelos

  * \--uuid para usar UUID como tipo de chave primária em vez de auto-incremento

* [ ] Testar o comando gerando, por exemplo, Book. Revisar arquivos gerados: ajustar stubs se necessário para incluir namespace correto, uso de ApiResource no controller, etc.[\[14\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/06-roadmap-bread-e-geracao.md#L6-L14)[\[15\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/06-roadmap-bread-e-geracao.md#L10-L18).

* **Sessão: CRUD de Usuários (Exemplo)**

* [ ] Implementar endpoints CRUD para **Usuários** do tenant (exceto talvez DELETE se não for permitir excluir usuário? Mas incluir para completo). Métodos: index, show, store, update, destroy.

* [ ] Controlador UsersController: usar Policy ou checks para autorização (ex.: only admin can create or delete).

* [ ] Requests de validação: UserStoreRequest, UserUpdateRequest validando campos (nome obrigatório, email formato, etc.).

* [ ] Usar UserResource para resposta. Ao criar, retornar 201 com objeto usuário criado.

* [ ] Testar fluxo completo via API e integrar no front (front já possuía tela de gerenciamento de usuários? Verificar e ajustar).

* **Sessão: CRUD de Livros (Exemplo)**

* [ ] Semelhante ao de usuários: implementar BookController com endpoints CRUD.

* [ ] Aplicar multi-tenancy: cada livro pertence a um tenant (ficará no DB do tenant). Ao listar, só traz do tenant atual (Stancl já filtra conexões).

* [ ] Validar permissões: talvez qualquer usuário autenticado no tenant pode ver livros, mas apenas admin pode criar/editar – ajustar conforme regras de negócio.

* [ ] Testar e integrar com front (há página de Books no front).

* **Sessão: Outros Módulos**

* [ ] Identificar outros módulos planejados (ex.: Relatórios, Notificações, Gráficos). Muitos deles podem ser adicionados posteriormente, mas deixar pontos de extensão. Por exemplo, notamos presença de algo de *Reports* e *Features* no hero-alpha (migrations para features, talvez feature flags).

* [ ] Garantir que a estrutura BREAD facilitará adicionar esses módulos quando priorizados.

**Deliverables:**  
- [ ] Comando make:bread funcionando e gerando arquivos corretos (pelo menos 1 POC executado e mergeado, ex.: Book)  
- [ ] CRUD de Usuários completo e coberto por testes (unitários ou postman)  
- [ ] CRUD de Livros completo e coberto por testes  
- [ ] Documentação dos endpoints principais (usuários, livros) disponível no Swagger ou docs de API, para referência do front e QA
