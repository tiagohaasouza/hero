# Sessão 08 — Testes e Qualidade

* [ ] **Testes Unitários (Vitest):** Escrever testes para composables e stores:

* Testar que useSession corretamente armazena tokens, e efetua logout limpando estado.

* Testar useAuthGuard isoladamente: dado um estado não autenticado, retorna redirecionamento esperado.

* Testar serviços com axios mock: por ex., authService.login faz chamada e recebe tokens – simular axios e verificar store atualizada.

* Testar componentes críticos se possível (com Jest \+ vue-test-utils): ex.: formulário de login – preencher campos e simular submit, mockar serviço e verificar comportamento.

* [ ] **Testes E2E (Cypress):** Criar alguns cenários ponta-a-ponta:

* **Login Flow:** Iniciar app não logado, tentar acessar rota protegida -\> redireciona login, efetuar login com credenciais válidas (talvez precisamos de um usuário de teste fixo no back para isso), verificar que navega para dashboard.

* **CRUD Básico:** Navegar para página de livros, clicar "Adicionar Livro", preencher form e salvar -\> verificar que novo livro aparece na lista.

* **Logout Flow:** Estando logado, acionar logout -\> voltar para tela de login e estado limpo.

* [ ] **Snapshots (opcional):** Usar testing-library/vue ou vue-test-utils para gerar snapshots de componentes de apresentação (ex.: um Card de Livro) para detectar mudanças visuais inesperadas.

* [ ] **Cobertura:** Rodar npm run test:unit \-- \--coverage e garantir cobertura mínima \~70%. Identificar áreas críticas sem testes e acrescentar.
