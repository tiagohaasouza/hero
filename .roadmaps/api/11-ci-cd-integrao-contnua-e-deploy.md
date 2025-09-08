# 11 — CI/CD (Integração Contínua e Deploy)

**Objetivo:** Configurar pipelines de CI para automatizar testes e análise a cada push, e planejar estratégia de deploy contínuo.

* **Sessão: GitHub Actions – CI**

* [ ] Adicionar workflow YAML em **.github/workflows/ci.yml** contendo passos:

  * Setup do PHP (usar matrix para versões 8.3 e possivelmente 8.2 se quiser garantir retrocompat)

  * Setup do Node (versão 20\)

  * Serviços do MySQL (MariaDB) e Redis para rodar testes integrados (usar services: do GH Actions)

  * Steps: composer install, npm ci

  * Run backend tests (php artisan test), run Larastan (php ./vendor/bin/phpstan), run Pint (php artisan pint \--test)

  * Run frontend tests (npm run test:unit e talvez e2e em headless)

  * Artefatos: opcional, coletar coverage reports.

* [ ] Garantir que o pipeline seja eficiente – por ex., usar cache de Composer e npm para acelerar.

* [ ] (Opcional) Configurar **codecov** ou semelhante para comentar PRs com cobertura.

* **Sessão: Deploy**

* [ ] Esboçar workflow de deploy (mesmo que não automatizado inicialmente):

  * Talvez usar Docker Compose em produção semelhante ao dev (só que com NODE\_ENV=production e front build estático servido pelo Nginx).

  * Ou construir imagens separadas: uma para Laravel (com código e vendor), outra para front (compilado) e usar um orquestrador (k8s, etc.).

  * Decidir um método simples: por exemplo, um script **deploy.sh** que faça build das imagens e publique em registry, ou use *scp* para servidor. Documentar isso.

* [ ] Incluir no CI um job *opcional* de deploy (manually triggered) que executa esses passos de build e envio. (Por enquanto, pode ficar apenas documentado).

* **Sessão: Variáveis de Ambiente Seguras**

* [ ] Configurar no repositório variáveis do GitHub Actions se necessário (ex.: credentials para algum serviço – talvez não por enquanto).

* [ ] Garantir que nenhum segredo sensível está hardcoded (ver keys do Passport – usar .env ou GitHub Secrets se precisar rodar Passport no CI com keys fixas).

**Deliverables:**  
- [ ] Badge de status do CI no README do repo indicando build passing/failing.  
- [ ] Pipeline rodando em todos PRs e *pushes* na branch principal, prevenindo merge de código quebrado.  
- [ ] Documento **docs/deploy.md** com guia de deploy manual (até termos CD automatizado).
