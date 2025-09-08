# 10 — Testes Automatizados & Qualidade

**Objetivo:** Garantir a qualidade do código através de testes automatizados (backend e frontend) e ferramentas de análise estática.

* **Sessão: Configuração de Testes (Laravel)**

* [ ] Configurar ambiente de teste no Laravel: arquivo **.env.testing** com configurações adequadas (ex.: usar **sqlite :memory:** para testes unitários de repositórios, ou um segundo banco MariaDB de teste para testes integrais). Para multi-tenancy, talvez usar sqlite isolado por tenant em memória para rapidez.

* [ ] Escrever testes **Pest** para as funcionalidades críticas:

  * AuthTest: login com credenciais válidas (deve retornar 200 \+ token), login inválido (401), refresh token (200 novo token), acesso de rota protegida sem token (401).

  * TenantIsolationTest: criar dois tenants, criar um registro (ex. Book) em tenant A e verificar que no tenant B não existe.

  * UserCrudTest: CRUD de usuário retornando corretamente os status e dados (talvez usando SQLite memory ou transação).

  * Etc., conforme módulos implementados.

* [ ] Caso a estrutura multi-tenancy dificulte testes (por ex., Passport requer MariaDB devido a queries JSON?), considerar usar MariaDB em container para rodar testes – isso será tratado na CI.

* **Sessão: Testes Frontend**

* [ ] Configurar **Vitest** ou **Jest** no projeto Vue (caso não esteja). Hero-alpha mencionou usar Vitest. Incluir no package dev e criar config.

* [ ] Escrever testes unitários para composables e stores: por ex.: useAuth (login simulado – talvez mock axios), useLayout (alterar estado e verificar reação), etc.

* [ ] Configurar **Cypress** (ou Playwright) para testes ponta-a-ponta: ao menos um fluxo: login -\> acessar página X -\> verificar conteúdo. Usar um banco de teste com usuário padrão. Pode rodar contra o próprio ambiente Docker (talvez subir ambiente, seedar user, rodar Cypress apontando para hero.localhost).

* [ ] Medir cobertura de testes unitários no front com vitest \--coverage. Definir meta (ex.: 70%).

* **Sessão: Análise Estática & Linter**

* [ ] Integrar **Larastan** (PHPStan) no Laravel: adicionar como dev dependency (já presente no composer.json do hero-alpha)[\[54\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/api/composer.json#L30-L36). Configurar nível (start com 5 ou 6\) e executar análise. Corrigir eventuais issues importantes apontados (tipos indefinidos, métodos não existentes, etc.).

* [ ] Manter **ESLint/Prettier** no frontend ativo – já há config no hero. Garantir que npm run lint passa sem erros.

* [ ] Configurar **Laravel Pint** para padronização de código PHP. Adicionar e executar para formatar o código.

**Deliverables:**  
- [ ] Suíte de testes backend passando (executável via php artisan test ou pest) com relatório de cobertura (se aplicável).  
- [ ] Suíte de testes frontend passando (npm run test:unit e npm run test:e2e) com exemplos de componentes/composables testados.  
- [ ] CI configurada para executar os testes e reprovar build se falharem (detalhado na próxima seção).  
- [ ] Qualidade: código padronizado (Lint/Pint) e análise estática sem erros críticos.
