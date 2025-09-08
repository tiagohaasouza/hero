# Sessão 07 — Integração com API

Embora a API esteja em desenvolvimento simultâneo, precisamos estruturar o código front para consumir os dados assim que disponíveis, evitando lógica mock espalhada:

* [ ] **Serviços de API:** Criar módulo src/services/api.ts expondo o axios instanciado (configurado em useApiClient) e funções genéricas para chamadas (pode não ser necessário se useApiClient já cobre).

* [ ] **Serviços Específicos:** Criar serviços focados em entidades:

* src/services/authService.ts com funções login(credentials), refresh(token), logout() chamando endpoints correspondentes.

* src/services/userService.ts com getUsers(), getUser(id), createUser(data), etc.

* src/services/bookService.ts com métodos CRUD de livros.

* ... E assim por diante para outros módulos (notificationService, chartService).

Esses serviços devem utilizar **useApiClient/axios** para fazer requisições e já retornar os dados tipados (mapeando para interfaces do shared). Poderão ser usados dentro dos composables ou stores.

* [ ] **Tratamento de Erros Unificado:** Configurar interceptors no axios (dentro useApiClient) para:

* Em caso de erro 401, tentar automaticamente um refresh token (uma única vez) e refazer a requisição original se obtiver novo token[\[97\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/app/ROADMAP.md#L149-L157).

* Se refresh falhar ou sem refresh disponível, redirecionar para login.

* Para outros erros (400/403/500), talvez simplesmente deixar passar, mas poderíamos interceptar para exibir notificação de erro global (via useNotification) em alguns casos.

* [ ] **Notificações Globais de Sucesso/Erro:** Decidir como mostrar feedback ao usuário:

* Sucessos: talvez toast em operações CRUD (e.g. "Livro criado com sucesso").

* Erros: toast de erro genérico ou específico (se veio mensagem do back).

* Implementar isso chamando **useNotification.notify(...)** nas respostas dos serviços ou via interceptors.

* [ ] **Atualização de Estado Reativa:** Garantir que, ao criar/editar/deletar via serviços, o estado global (Pinia stores) seja atualizado. Por exemplo, ao criar um Book via bookService, adicionar o novo Book na useBookStore (ou refazer fetch da lista). Manter UI em sincronia com mínima latência.
