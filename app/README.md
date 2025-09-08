# Aplicação Hero App – Visão Geral

Esta aplicação faz parte do monorepo **hero-alpha** e corresponde ao cliente SPA (Single Page Application) desenvolvido com Vue 3, Vuetify 3 e Pinia. O projeto visa fornecer uma base completa para a futura plataforma **Hero**, incluindo dashboards com gráficos, área de livros, páginas de autenticação e um módulo de chat com IA.

## Características

* **Arquitetura modular:** páginas (Home, Livros, Gráficos, Login, Registro, Recuperação de senha etc.) declaradas via roteador. As rotas definidas no arquivo HeroApp.ts incluem protegidas por autenticação e páginas públicas[\[1\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100).

* **Componentização:** componentes reutilizáveis distribuídos em src/components/Hero para cartões, tabelas e layouts de página. Exemplos: DashboardSummaryCard, PageHeader, PageFooter[\[2\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/pages/HomePage.vue#L24-L32).

* **Estado global com Pinia:** store user para manter dados do usuário logado e preferências (tema e idioma)[\[3\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts#L11-L74), com previsão de outras stores (auth, layout, notificações).

* **Suporte a gráficos:** integração com Chart.js e ApexCharts para criação de diversos tipos de gráficos (Bar, Line, Pie, Radar etc.)[\[4\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/pages/HomePage.vue#L24-L42).

* **Internacionalização:** sistema de tradução modular baseado no composable useI18nHelper para tradução, formatação e carregamento dinâmico de locais.

* **UI responsiva:** uso de Vuetify 3 para componentes consistentes, com temas claro/escuro.

* **PWA (Progressive Web App):** registro de service-worker.js para possibilitar modo offline e notificação push[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts#L13-L24).

## Instalação e execução

Pré‑requisitos: Node \>= 18 e um gerenciador de pacotes (PNPM ou NPM). Clone o repositório e instale as dependências dentro da pasta app:

```
pnpm install
```

Scripts comuns:

* `pnpm dev` – inicia o servidor de desenvolvimento Vite.
* `pnpm build` – compila os arquivos para produção.
* `pnpm preview` – executa um servidor local para pré‑visualizar a build.
* `pnpm lint` – aplica lint com ESLint.
* `pnpm format` – formata o código com Prettier.

## Estrutura de pastas sugerida

* src/pages — componentes de página (HomePage.vue, BooksPage.vue, LoginPage.vue etc.).

* src/components — componentes reutilizáveis. Organize por domínio (Hero/HTML/Card, Hero/Widget/ChartJS etc.).

* src/composables — composables reativos (useLayout, useAuth, useBooks, useCharts etc.).

* src/stores — stores do Pinia (user, auth, layout, book etc.).

* src/services — módulos de acesso à API (axios/fetch) e regras de negócio.
* src/utils — funções utilitárias e helpers compartilháveis.
* src/router — configuração de rotas segmentadas por domínio.
* src/i18n — arquivos de tradução e helpers.
* src/styles — arquivos Less/Sass com tokens de design.

## Aliases de caminho

Os principais aliases configurados em `tsconfig.json` são:

* `@/` → `src/`
* `@components/` → `src/components/`
* `@stores/` → `src/stores/`
* `@pages/` → `src/pages/`
* `@services/` → `src/services/`
* `@utils/` → `src/utils/`
* `@router/` → `src/router/`
* `@i18n/` → `src/i18n/`
* `@themes/` → `src/themes/`
* `@styles/` → `src/styles/`
* `@app` → `src/app.ts`
* `@book` → `src/book.ts`
* `@types` → `src/types.ts`
* `@shared/` → `../shared/`

## Convenções de desenvolvimento

* **Options API:** todos os componentes devem seguir a Options API do Vue. Evitar quebras de linha em atributos HTML e listas de arrays, conforme as preferências do autor.

* **Composição em vez de herança:** ao refatorar, preferir composables e stores a classes abstratas. Ver roadmap para detalhes.
* **Padronização de estilo:** o lint é realizado com ESLint e Prettier; commits executam um hook do Husky que roda `pnpm lint`.
* **Documentação:** adicionar comentários apenas quando solicitado; manter o código limpo e legível.

## Próximos passos

Consulte o arquivo **roadmap.md** na raiz do repositório para um plano detalhado das tarefas. Lá são listados composables a implementar, contratos a mover para a pasta shared e sugestões de melhorias gerais. Este README deverá ser ajustado conforme novas features sejam implementadas e outras pastas criadas.

---

[\[1\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts#L72-L100) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/script/Hero/HeroApp.ts)

[\[2\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/pages/HomePage.vue#L24-L32) [\[4\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/pages/HomePage.vue#L24-L42) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/pages/HomePage.vue](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/pages/HomePage.vue)

[\[3\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts#L11-L74) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/stores/user.ts)

[\[5\]](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts#L13-L24) GitHub

[https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts](https://github.com/tiagohaasouza/hero-alpha/blob/master/app/src/plugins/index.ts)