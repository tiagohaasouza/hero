# Sessão 01 — Fundamentos e Estrutura

* [ ] **Documentação do Projeto:** Atualizar **/app/README.md** com instruções de setup, scripts disponíveis, estrutura de pastas e convenções de código. Incluir explicação dos aliases configurados (como *@app*, *@components*, *@stores* etc.) para facilitar contribuições.

* [ ] **Limpeza de Dependências:** Revisar as dependências listadas em app/package.json (Vue, Vuetify, Pinia, Vite, Axios, Chart.js, ApexCharts etc.) e remover pacotes não utilizados[\[58\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L7-L15). Atualizar versões conforme necessário para manter o projeto em dia.

* [ ] **Configurações de Lint/Format:** Padronizar ESLint/Prettier e hooks do Husky para garantir estilo consistente. Aplicar regras específicas para Vue 3 (Options API) e Vuetify, evitando warnings no build.

* [ ] **Estrutura de Pastas:** Validar a organização de pastas da aplicação: src/pages, src/components, src/composables, src/stores, src/services, src/utils, src/router, src/i18n[\[59\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L11-L19). Reorganizar arquivos se necessário para seguir esse padrão (por ex., mover componentes genéricos para /components, composables para /composables etc.).

* [ ] **Tema Global Vuetify:** Configurar um tema padrão no Vuetify (cores principais, tipografia, espaçamentos) com suporte a modo claro/escuro. Garantir que o tema possa ser trocado dinamicamente (armazenar preferência do usuário em store).
