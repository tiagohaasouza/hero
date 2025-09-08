# Sessão 02 — Composables a Criar

O código atual utilizava classes complexas em script/Logos/Vue/App. Vamos migrar funcionalidades para composables reativos (mantendo Options API para integração suave com Vuetify)[\[60\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L19-L27). Implementar cada composable abaixo em src/composables, com testes unitários quando aplicável:

**UI & Layout**

* [x] **useLayout** – controla visibilidade de elementos de layout (sidebar, footer, loading global) e fornece métodos como toggleSidebar(), showLoading()[\[61\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L21-L29). Deve interagir com store de layout (se houver) ou encapsular estado internamente.

* [x] **useTheme** – gerencia o tema claro/escuro, permitindo alternar manualmente e sincronizar com preferências do SO. Integra com Vuetify $vuetify.theme ou configuração global[\[62\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L23-L26).

* [x] **useDialog** – composable para modais de confirmação/alerta usando componentes Vuetify (v-dialog). Fornece funções tipo confirm(message) que retornam Promise, facilitando uso em fluxos assíncronos.

* [x] **useNotification** – sistema de notificações (toasts/snackbars). Deve expor método notify({message, type}) e manter fila de notificações. Integra com Vuetify VSnackbar global[\[63\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L27-L29).

* [x] **useModal** – controle genérico para modais custom (além dos diálogos simples), se houver casos de múltiplos modais na tela. Gerencia estado de abertura/fechamento e talvez conteúdo dinâmico.

**Navegação & Guards**

* [x] **useRouterEnhancer** – fornece utilitários para navegação programática (p. ex. goBack(), redirectToDashboard()) e lida com parâmetros de rota serializados. Inclui também um listener global para transições de rota (ex.: ativar um loading durante navegações) substituindo lógica antes feita em router.beforeEach[\[64\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L33-L41).

* [x] **useAuthGuard** – verifica se o usuário está autenticado antes de permitir acesso a rotas protegidas. Deve ser usado em combinação com o router (talvez integrado no useRouterEnhancer). Se não autenticado, redireciona para login[\[65\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L33-L39). Lê estado de autenticação de uma store ou composable useSession.

* [x] **usePermissionGuard** – parecido com o anterior, mas para permissões específicas. Impede acesso a rotas ou funcionalidades se o usuário não tiver certa role/permissão. Baseado no atributo meta das rotas (ex.: meta: { permission: 'admin' })[\[66\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L35-L40).

**Dados & API**

* [x] **useApiClient** – wrapper para cliente HTTP (provavelmente axios) centralizando configuração: URL base da API, interceptors para incluir token de auth e tratar erros globalmente[\[67\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L41-L49). Deve expor métodos GET/POST/etc. ou instância axios configurada.

* [x] **useSession** – gerencia tokens JWT (access/refresh) no localStorage ou cookie. Oferece métodos login(credentials), logout(), refreshToken() e mantém estado de autenticação (usuario logado/não)[\[68\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L43-L46). Deve reagir à expiração de token automaticamente (talvez via interceptor no useApiClient).

* [x] **useUser** – composable para dados do usuário autenticado. Fornece currentUser (reativo) e métodos para carregar/atualizar perfil[\[69\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L43-L48). Pode usar store interna (Pinia user store) ou encapsular diretamente chamadas API de perfil.

* [x] **useBooks** – gerencia lista de livros exibida na tela de livros. Inclui estado de lista, paginação, filtros e operações CRUD básicas (fetch list, create, update, delete)[\[70\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L49-L55). Isso isola a lógica da página de livros.

* [x] **useCharts** – encapsula preparação de dados para gráficos (tanto Chart.js quanto ApexCharts). Pode fornecer funções utilitárias para formatar séries de dados, e estado reativo para filtros selecionados[\[71\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L49-L53).

* [x] **useI18nHelper** – composable para internacionalização no front. Oferece métodos de tradução (wrap do i18n global), formatação de datas/números e carregamento dinâmico de mensagens se suportado[\[72\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L51-L54). Substitui as antigas classes AppI18N.

* [x] **useFileUpload** – abstração de upload de arquivos com suporte a validação (tipo, tamanho), feedback de progresso e cancelamento. Utiliza API do browser File/Blob e talvez axios para envio com progresso[\[73\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L53-L56).

**Estado & Outros**

* [x] **useNotificationStore** – caso seja necessário, uma Pinia store ou composable para notificações “persistentes” (notificações no sentido de avisos do sistema, não apenas toasts). Exemplo: contagem de notificações não lidas, lista de notificações do usuário[\[74\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L57-L65).

* [x] **useSettings** – gerencia preferências do usuário (tema, idioma, etc.) com persistência local (LocalStorage). Conecta com useTheme e useI18nHelper para aplicar as preferências salvas[\[75\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L57-L64).

* [x] **useRealtime** – composable para integrar com WebSockets (provavelmente usando socket.io-client ou native WebSocket)[\[76\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L61-L64). Fornece métodos para se inscrever em eventos (ex.: novas notificações, mensagens de chat) e emite eventos se necessário. Deve lidar com reconexão automática e autenticação no handshake (envio de token).

* [x] **useAuthForm** – auxilia formulários de autenticação (login, registro, recuperar senha, códigos de verificação). Centraliza a lógica de validação desses formulários, possivelmente integrando com *shared/auth* DTOs e exibindo erros de forma consistente[\[77\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L63-L66).
