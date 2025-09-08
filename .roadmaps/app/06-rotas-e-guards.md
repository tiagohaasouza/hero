# Sessão 06 — Rotas e Guards

No código legado, as rotas eram definidas programaticamente em HeroApp.ts[\[87\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L103-L111)[\[94\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L135-L139). Vamos adotar definição declarativa e modular de rotas:

* [ ] **Definição Modular de Rotas:** Criar arquivo src/router/routes.ts ou uma pasta src/router/routes/ contendo módulos de rotas segmentados por domínio funcional:

* authRoutes (login, register, forgot, reset)

* bookRoutes (lista de livros, detalhes, etc.)

* chartRoutes (gráficos/dashboards)

* adminRoutes (painel admin, gestão de tenants se aplicável)

* superRoutes (rotas exclusivas de super-admin global, se houver)[\[95\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L133-L141).

* [ ] **Registro Dinâmico:** No composable **useRouterEnhancer** (ou diretamente no setup do router), importar esses arrays de rotas e registrá-los ao criar o Router (ou usar router.addRoute se precisar dinâmico). Isso facilita manutenção – adicionar rota \= editar array correspondente.

* [ ] **Lazy Loading:** Certificar que as rotas usam *lazy-loading* dos componentes de página: ex. component: () \=\> import('@/pages/BooksPage.vue')[\[96\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L135-L143), para não pesar bundle inicial.

* [ ] **Guards de Autenticação:** No router.beforeEach (configurado talvez dentro useRouterEnhancer), aplicar **useAuthGuard** e **usePermissionGuard**:

* Se rota requer auth e usuário não logado -\> redirecionar para /login.

* Se rota requer permissão X e usuário não tem -\> redirecionar para página “Acesso negado” ou / com notificação.

* [ ] **Rotas Padrão:** Definir rota catch-all 404 (NotFound page já existe em Assets) e rota de redirecionamento para /login quando não autenticado e tenta acessar /logout (comportamento específico: ex., se /logout acessado, fazer logout e redir). Ajustar meta tags se necessário.

* [ ] **Transições e Feedback:** Usar **useRouterEnhancer** para acionar loading global em transições (opcional: criar um loading bar no topo durante mudança de rota). Melhorar experiência percebida.
