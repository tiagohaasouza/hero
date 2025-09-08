# 05 — Padronização de Respostas JSON

**Objetivo:** Garantir que todas as respostas da API sigam um formato uniforme, facilitando o consumo pelo frontend e o tratamento de erros consistente.

* **Sessão: Formato Unificado**

* [ ] Definir e documentar o formato padrão de resposta **Sucesso** e **Erro**. Basear-se nas interfaces TS em /shared/api.ts do hero-alpha[\[7\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L5):

  * Sucesso: { ok: true, status: \<código HTTP\>, data: \<payload\> }

  * Erro: { ok: false, status: \<código HTTP\>, error: { code: \<CÓDIGO\_ERRO\>, message: \<mensagem amigável\>, details: \<opcional\> } }

* [ ] Criar helper ou **Trait ApiResponse** no Laravel (ex.: App\\Support\\ApiResponse) com métodos estáticos:

  * success($data, int $status \= 200\) – retorna um JsonResponse no formato acima (ok true, status, data)

  * error(string $code, string $message, int $status) – retorna JsonResponse formatado com ok false e objeto error. O $code aqui é uma identificação interna (p. ex. USER\_NOT\_FOUND), e $message pode ser traduzido conforme locale atual.

* [ ] Usar esses helpers em todos os controladores da API para retornar respostas. Refatorar controladores existentes (usuários, etc.) para não retornar objetos ou arrays diretamente, mas sim return ApiResponse::success(\[...\]).

* **Sessão: Tratamento Global de Erros**

* [ ] Customizar a classe **Exception Handler** (App\\Exceptions\\Handler):

  * Implementar o método render($request, Exception $e) para interceptar certos tipos de exceção (ModelNotFound, ValidationException, AuthenticationException, AuthorizationException, etc.) e retornar usando ApiResponse::error com códigos e mensagens adequadas.

  * Ex.: ModelNotFound -\> retornar 404 com code NOT\_FOUND e message traduzida "Recurso não encontrado". ValidationException -\> 422 com code VALIDATION\_ERROR e detalhes dos campos (manter estrutura).

  * Garantir que qualquer exceção não tratada caia em um erro 500 genérico: code SERVER\_ERROR message "Erro interno do servidor" (ou "Internal server error"). Logar detalhes internamente mas não expor stack trace.

* [ ] Mapear códigos de erro padronizados e defini-los em um lugar central (pode ser um enum ou constante). O hero-alpha tinha um **docs/errors.md** listando possíveis erros e códigos[\[7\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L5) – podemos criar similar ou incluir no docs de API.

* [ ] Ajustar form requests para lançar ValidationException com mensagens tratadas (Laravel já faz). Opcionalmente, customizar a estrutura de erros de validação para incluir, por exemplo, um campo errors: { field: \[mensagens\] } dentro do details.

* **Sessão: Contratos no Front**

* [ ] Garantir que os tipos do front (TS) correspondem a esse formato (já há interfaces ApiSuccess/ApiFailure no /shared). Se mudarmos algo, atualizar lá também. Ex.: se adicionarmos campo status no objeto error, refletir na interface.

* [ ] Verificar se o front-end (useApiClient composable) já interpreta esse formato – ajustar interceptors no axios para, por exemplo, detectar ok: false e lançar automaticamente um erro tratado. (Essa tarefa é do lado front, mas mencionada para coordenação).

**Deliverables:**  
- [ ] Respostas consistentes em todos endpoints. Ex.: Chamadas de listagem, criação, atualização retornam sempre ok: true \+ status \+ data esperada.  
- [ ] Erros como 404, 401, 500 retornam ok: false com código e mensagem.  
- [ ] Documentação em **docs/errors.md** com tabela de códigos de erro e significado (pode aproveitar doc do hero-alpha)  
- [ ] Testes unitários do helper ApiResponse (passar data e ver se estrutura JSON sai correta) e testes de integração para Handler (forçar um 404 e conferir JSON).
