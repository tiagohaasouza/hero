# ROADMAP para o subprojeto **app**

Este documento foi construído após a análise inicial do repositório e destina‑se a organizar as próximas tarefas. Nele separam‑se as atividades por contexto, listando composables necessários, contratos para a pasta **shared** e orientações para refatoração do código objeto‑oriented de script/Logos. As caixas de seleção são pensadas para serem marcadas conforme as tarefas forem concluídas.

## ☑️ Sessão 1 – Fundamentos e estrutura

* [x] Criar ou atualizar **/app/README.md** com instruções de instalação, scripts de execução, normas de estilo e estrutura de pastas. Aproveitar para documentar aliases como @app, @components, @stores etc.

* [x] Verificar se as dependências definidas em app/package.json (Vue, Vuetify, Pinia, Vite, axios, ChartJS, ApexCharts etc.) estão instaladas e actualizadas, e remover o que não está a ser usado[\[1\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/package.json#L71-L98).

* [x] Padronizar configurações de ESLint/Prettier e Hooks (Husky) para manter o estilo de código. Incluir regras específicas para **Options API** e Vuetify.

* [x] Definir convenções de estrutura de pastas: src/pages, src/components, src/composables, src/stores, src/services, src/utils, src/router e src/i18n.

* [x] Configurar um tema base do Vuetify com tokens (cores, tipografia, espaçamentos) e suporte a modo claro/escuro.

## 🛠️ Sessão 2 – Composables a criar

O código actual utiliza classes complexas e estáticas em script/Logos/Vue/App, mas o objetivo é migrar para composables reativos, seguindo o padrão Options API[\[2\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/main.ts#L3-L12). Crie cada useX() abaixo em src/composables para encapsular lógica reutilizável. Não se esqueça de adicionar testes unitários:

* **UI & Layout**

* [x] useLayout — controla cabeçalho, rodapé, barra lateral, menus de contexto e loading global. Deve expor propriedades como isSidebarOpen, toggleSidebar(), showPageLoading() etc.

* [x] useTheme — gerencia o tema (claro/escuro) e permite alternância manual ou automática. Integra com as preferências do usuário.

* [x] useDialog — wrapper para diálogos de confirmação/alerta usando Vuetify; centraliza títulos, mensagens e botões padrão.

* [x] useNotification — sistema de toasts/snackbars para exibir mensagens de sucesso, erro e avisos, com fila e opções de duração.

* [x] useModal — controle de modais customizados e comportamentos de abertura/fecho.

* **Navegação & Guards**

* [x] useRouterEnhancer — helpers para navegação programática (push, replace, back) e serialização de parâmetros. Inclui listener global de carregamento de página, substituindo o router.beforeEach actual[\[3\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/router/index.ts#L11-L22).

* [x] useAuthGuard — verifica autenticação antes de carregar páginas protegidas; lê estado de autenticação no store e redireciona para login quando necessário.

* [x] usePermissionGuard — verifica permissões/roles do usuário e evita acesso a rotas específicas com base no escopo.

* **Dados & API**

* [x] useApiClient — cliente HTTP centralizado (axios ou fetch) com interceptores para adicionar tokens de autenticação e tratamento de erros.

* [x] useSession — guarda tokens (access/refresh), controla expiração e renovação automática e expõe login(), logout() e refresh().

* [x] useUser — consome a store de usuário, oferecendo métodos para carregar, actualizar e limpar o perfil. Exemplo: useUser().updateUser()[\[4\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts#L25-L61).

* [x] useBooks — abstrai a listagem de livros da página de livros; deve permitir paginação, busca e CRUD básico.

* [x] useCharts — lida com dados de gráficos (Chart.js e ApexCharts), encapsulando configuração de séries e opções padrões.

* [x] useI18nHelper — encapsula tradução, formatação de datas/números e carregamento dinâmico de locais. Deve substituir as classes AppI18N.

* [x] useFileUpload — suporte a upload com validação de tamanho e tipo, barra de progresso e cancelamento.

* **Estado & Outros**

* [x] useNotificationStore — store global para notificações persistentes (marcações, avisos a serem lidos etc.).

* [x] useSettings — preferencias do usuário (tema, idioma) com persistência em LocalStorage.

* [x] useRealtime — wrapper para WebSockets (socket.io-client) para chat/notifications em tempo real.

* [x] useAuthForm — validação de formulários de login/registro/esqueci senha/verificação de código; integra‑se aos contratos do backend.

## ☑️ Sessão 3 – Contratos/Interfaces e pasta **shared**

Para promover o reuso entre **app** e **api**, crie um pacote local **/shared** com módulos TypeScript. O objetivo é centralizar tipos e DTOs. Sugere‑se a seguinte estrutura:

* [x] shared/core — tipos genéricos como BaseEntity { id, createdAt, updatedAt }, PageRequest, PageResponse, ApiError, Result\<T,E\>.

* [x] shared/auth — LoginRequest, LoginResponse, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyCodeRequest, TokenPayload, Role (enum).

* [x] shared/user — User (id, nome, sobrenome, email, avatar, status, preferências), UserProfileUpdate, UserStatus.

* [x] shared/book — Book (id, title, author, description, coverUrl, status), BookCreateRequest, BookUpdateRequest.

* [x] shared/chart — DTOs para dados de gráficos (categorias, séries) para ChartJS e ApexCharts.

* [x] shared/notification — Notification (id, título, mensagem, tipo, dataCriacao, lida), NotificationPreferences.

* [x] shared/i18n — Locale, TranslationKey, TranslationFileMetadata.

* [x] shared/security — RateLimit, OtpRequest, OtpVerifyRequest, TwoFactorMethod.

Crie também utilitários comuns:

* [x] validation.ts — funções para validação (email, password, códigos), que poderão ser usadas tanto no front quanto no back.

* [x] api.ts — helpers para criar respostas padronizadas (success(), error()), mapeando códigos HTTP.

* [x] Exportar todos estes tipos a partir de shared/index.ts para consumo fácil pelo **app** e **api**.

Usar estes contratos ao tipar os composables descritos na sessão anterior.

## 🔄 Sessão 4 – Refatoração do **script/Logos/Vue/App**

O repositório actual contém muitas classes sob @script/Logos/Vue/App (por exemplo, HeroApp, AppRouter, AppI18N) que misturam responsabilidades e tornam o código difícil de manter[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100). Propõe‑se a migração gradual para uma arquitetura mais simples e funcional:

* [ ] Listar todas as classes existentes em script/Logos/Vue/App e identificar as responsabilidades (roteamento, i18n, layout, autenticação, guards etc.).

* [ ] Para cada classe, criar um **composable** ou **service** equivalente em /src/composables ou /src/services, separando lógica de estado, efeitos (side effects) e definições estáticas.

* **AppRouter/AppRouterData** → useRouterManager (gera rotas dinamicamente, registra guards, permite lazy‑loading). Deve substituir o código de definição de rotas embedado em HeroApp[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100).

* **AppI18N** → useI18nHelper (descrita na Sessão 2) com carregamento assíncrono de arquivos de tradução e fallback automático.

* **AppLayout** → useLayout com gerenciamento de slots, componentes de página (cabeçalho, rodapé, conteúdo) e controles de layout personalizados.

* **AuthenticationGuard** → useAuthGuard (descrita anteriormente), integrado ao router via beforeEach.

* **AppData/HeroApp** → será substituído por funções de inicialização (bootstrapApp()) que criam stores, i18n, router e layout separadamente e retornam um objeto agregador. Essa função poderá ser chamada em main.ts.

* [ ] Após criar os novos composables, substituir imports no código por estes novos recursos, removendo gradualmente as classes originais.

* [ ] Criar testes unitários para os composables de roteamento e i18n para garantir que o comportamento continue o mesmo.

## 📁 Sessão 5 – Stores (Pinia) e estado global

Actualmente existe apenas a store user[\[6\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts#L11-L74). Para melhor organização de estado, criar outras stores especializadas:

* [x] useAuthStore — mantém tokens de acesso/refresh, status de login, erros de autenticação e métodos para autenticar/renovar/desconectar.

* [x] useLayoutStore — controla visibilidade de barras laterais, tema, modo cheio etc., para que os componentes possam reagir globalmente.

* [x] useBookStore — mantém a lista de livros, página actual, filtros e resultados de busca. Deve permitir ações de carregamento, criação, atualização e remoção.

* [x] useNotificationStore — armazena notificações recebidas (via API ou WebSocket) e seu estado de leitura. Pode ser usado pelo useNotification para exibir toasts.

* [x] useChartStore — armazena dados e configurações de gráficos, permitindo reatividade ao mudar filtros ou dados.

## 🧭 Sessão 6 – Rotas e Guards

O arquivo HeroApp.ts define manualmente todas as rotas[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100). Recomenda‑se migrar essa configuração para arquivos de rota que possam ser auto‑gerados e organizados por domínio (auth, livros, gráficos, admin, super etc.):

* [ ] Criar src/router/routes.ts com arrays de rotas segmentados (authRoutes, bookRoutes, chartRoutes, adminRoutes, superRoutes).

* [ ] Importar estes arrays no novo useRouterManager e registrar dinamicamente. Incluir lazy‑loading de páginas (() \=\> import('@pages/BooksPage.vue')).

* [ ] Implementar beforeEach de autenticação e permissão no useRouterManager, usando useAuthGuard e usePermissionGuard.

* [ ] Configurar rotas notFound() e redirecionamentos (por exemplo, /logout redireciona para /login).

## 🔗 Sessão 7 – Integração com API

Apesar de a API ainda não estar implementada, o app já tem várias páginas que dependem de dados (livros, gráficos, cadastro, autenticação). Definir a estrutura de chamadas para futura integração:

* [ ] Criar src/services/api.ts com a instância do axios (ou fetch) e interceptores para adicionar tokens, gerir loading global e mapear erros para mensagens amigáveis.

* [ ] Criar serviços específicos (ex.: src/services/bookService.ts, src/services/authService.ts) que chamem endpoints (ex.: GET /books, POST /auth/login) e retornem dados tipados com os DTOs de **shared**.

* [ ] Centralizar mensagens de erro e sucesso no useNotification.

* [ ] Configurar um interceptor para renovar o token quando receber 401 Unauthorized.

## 📑 Sessão 8 – Testes e Qualidade

* [ ] Configurar Jest/Vitest para testes unitários de composables e stores.

* [ ] Configurar Cypress ou Playwright para testes end‑to‑end. Criar cenários para login, cadastro, navegação de livros e gráficos.

* [ ] Adicionar testes de snapshot para componentes mais complexos (cartões de dashboard, formulários). Use bibliotecas como @vue/test-utils.

* [ ] Medir cobertura e definir uma meta mínima (ex.: 70%).

## 🚀 Sessão 9 – Melhorias Gerais e Futuras

* [ ] Simplificar o código removendo herança excessiva e implementando composição (princípio “composition over inheritance”).

* [ ] Melhorar acessibilidade (a11y): usar atributos aria, gerenciar foco, suportar navegação por teclado e contraste.

* [ ] Otimizar carregamento de traduções (lazy‑loading) e armazenamento em cache de idiomas.

* [ ] Implementar PWA com service worker para suporte offline e push notifications (já há um service-worker.js registado no registerPlugins)[\[7\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts#L13-L24).

* [ ] Analisar e modularizar os componentes sob @components/Hero/ para evitar duplicação e tornar os widgets reutilizáveis. Padronizar a criação de cartões, tabelas e formulários.

* [ ] Criar página de perfil do usuário e integração com preferências (tema/idioma) gravadas na store e persistidas em localStorage.

* [ ] Incluir monitoramento de performance (Web Vitals) e log de erros com Sentry ou similar.

* [ ] Definir um design system documentado (por exemplo, via Storybook) para permitir que novos componentes sigam o mesmo estilo.

---

**Observação:** Este roadmap é um ponto de partida baseado na leitura de alguns arquivos do repositório, como main.ts e HeroApp.ts[\[2\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/main.ts#L3-L12)[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100). Pode ser refinado conforme novas funcionalidades sejam identificadas durante a refatoração.

---

[\[1\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/package.json#L71-L98) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/package.json](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/package.json)

[\[2\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/main.ts#L3-L12) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/main.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/main.ts)

[\[3\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/router/index.ts#L11-L22) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/router/index.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/router/index.ts)

[\[4\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts#L25-L61) [\[6\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts#L11-L74) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts)

[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts)

[\[7\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts#L13-L24) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts)