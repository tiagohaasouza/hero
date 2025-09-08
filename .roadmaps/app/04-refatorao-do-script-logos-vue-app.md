# Sessão 04 — Refatoração do **script/Logos/Vue/App**

O repositório original continha muitas classes estáticas em @/script/Logos/Vue/App (ex.: HeroApp, AppRouter, AppI18N) que concentravam diversas responsabilidades[\[85\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L99-L107). Vamos substituí-las gradualmente pelos composables criados e pela arquitetura modular:

* [ ] **Mapear Classes Legadas:** Listar todas as classes e componentes em src/script/Logos/Vue/App. Identificar o propósito de cada uma – roteamento, i18n, layout, autenticação, guards etc.[\[86\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L101-L109).

* [ ] **Substituir por Composables/Serviços:** Para cada classe, direcionar para o novo composable equivalente:

* *AppRouter/AppRouterData* → lógica passa a residir no **useRouterEnhancer** e rotas definidas em arquivos dedicados (ver Sessão 6). Remover métodos estáticos de construção de rotas da classe e usar composable/router do Vue diretamente[\[87\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L103-L111).

* *AppI18N* → substituído por **useI18nHelper**, que lida com carga de arquivos de língua dinamicamente e fallback.

* *AppLayout* → substituído por **useLayout**, controlando slots e visibilidade de layout global.

* *AuthenticationGuard* → substituído por **useAuthGuard** (integrado ao router).

* *HeroApp / AppData* → inicialização da aplicação agora pode ser feita em main.ts diretamente instanciando Vuetify, Router, Pinia, e chamando composables de bootstrap (ex.: set initial theme) em vez de uma classe monolítica HeroApp[\[86\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L101-L109)[\[88\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L113-L116).

* [ ] **Remover Gradualmente:** Após implementar composables e garantir que páginas e componentes passam a usá-los, eliminar as classes originais. Isso envolverá trocar importações nos componentes (por exemplo, componentes que usavam HeroApp.getInstance() agora usam funções do composable correspondente).

* [ ] **Testes para Novos Composables:** Criar testes unitários simulando o comportamento das classes antigas. Ex.: antes HeroApp montava rotas – agora um teste para useRouterManager verifica se ao chamar setup ele registra as rotas corretas.

* [ ] **Documentar Mudanças:** Anotar no README ou docs quaisquer mudanças de comportamento para outros desenvolvedores entenderem (por ex.: “Removido uso de HeroApp, agora use composables X e Y”).
