# Sessão 05 — Stores (Pinia) e Estado Global

Atualmente só existe uma store Pinia para usuário (src/stores/user.ts)[\[89\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L119-L127). Vamos criar outras stores modulares para melhor gerenciar o estado global:

* [x] **useAuthStore** – armazena tokens de acesso/refresh, estado de login (logado/não), e possivelmente informações básicas do perfil. Fornece actions login, logout, refresh que interagem com a API e atualizam estado[\[90\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L121-L129).

* [x] **useLayoutStore** – controla estado global de layout: se sidebar está aberta/fechada, se tela está em modo cheio, preferência de tema, etc. Permite que componentes distantes reajam a mudanças de layout[\[90\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L121-L129).

* [x] **useBookStore** – mantém dados relacionados a livros: lista atual, filtros, paginação. Assim, diferentes componentes (p. ex. barra de busca e tabela de livros) podem compartilhar estado via store[\[91\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L123-L131).

* [x] **useNotificationStore** – armazena notificações recebidas via API/WS e seu status (lida/não lida)[\[92\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L125-L133). Útil para ter badge de notificações globais e listar notificações.

* [x] **useChartStore** – guarda dados e configurações globais de gráficos, se necessário. Por exemplo, dados já carregados de algum relatório que podem ser reutilizados entre componentes de gráfico diferentes (pode ser combinado com composable se trivial)[\[93\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L127-L131).

*Obs:* As stores Pinia podem ser integradas aos composables (por ex., useUser composable pode internamente usar useUserStore, mas isolamos para organizar o código).
