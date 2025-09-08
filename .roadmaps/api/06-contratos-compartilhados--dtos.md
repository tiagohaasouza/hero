# 06 — Contratos Compartilhados & DTOs

**Objetivo:** Sincronizar os **DTOs** e formatos de dados entre backend e frontend, minimizando diferenças e facilitando integração.

* **Sessão: Definição de Interfaces (shared)**

* [ ] Revisar a pasta **/shared** no repositório: deve conter definições TypeScript para todas as principais entidades e operações (User, Book, Auth, etc.)[\[10\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L69-L77)[\[52\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L73-L81). Atualizar/Adicionar se algo estiver faltando ou desatualizado. Por exemplo, assegurar que shared/user.ts tem campos adequados (nome, email, avatar, etc.) e shared/auth.ts tem LoginRequest, LoginResponse etc.

* [ ] Padronizar formatos: usar **camelCase** em todos os nomes de campos JSON enviados ao front (Laravel por padrão usa snake\_case nas Eloquent, mas usaremos Resources para converter a camelCase)[\[53\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L87-L95). Confirmar que as interfaces TS também usam camelCase (provável que sim).

* [ ] Definir tipagens consistentes para datas (usar string em ISO8601 no TS e retornar assim no Laravel) e IDs (provavelmente string se UUID, ou number se autoincremento – escolher e manter, hero-alpha usava UUID para tenants ao menos).

* **Sessão: Recursos e Transformers no Laravel**

* [ ] Criar **API Resources** para as principais Models: ex. UserResource, BookResource, etc., que transformam o Model em JSON conforme contrato. Usar -\>toArray() do Resource para mapear campos (e.g. $user-\>name -\> 'name' \=\> $this-\>name). Assim garantimos camelCase e possibilidade de formatar sub-objetos.

* [ ] Ajustar controladores para retornar Resources ao invés de models diretamente. Ex.: no UserController@index retornar UserResource::collection($users) dentro de ApiResponse::success (ApiResponse pode detectar se é Resource e extrair dados).

* [ ] Para endpoints que retornam simples mensagens ou nenhum dado (ex.: logout success), definir respostas padrão (talvez um ApiResponse::success sem data ou com data {} e mensagem no error apenas em casos de erro).

* [ ] Validar que todos endpoints implementados até agora estão seguindo os DTOs do /shared. Se houver discrepância, decidir se ajustamos o back ou atualizamos o contrato – preferencialmente ajustar o back para aderir ao contrato acordado.

* **Sessão: Geração Automática (futuramente)**

* [ ] (Opcional, marcar como ideia) Pesquisar pacote **spatie/laravel-typescript-transformer** ou similar, que poderia gerar interfaces TS a partir de Resources ou vice-versa. Anotar no backlog para possível implantação futura, mas não no escopo imediato.

**Deliverables:**  
- [ ] Tabela de correspondência entre classes backend e interfaces front concluída – ex.: User model -\> UserResource -\> interface User (TS) perfeitamente alinhados.  
- [ ] Teste manual: pegar um objeto JSON retornado pela API (ex.: de /me ou /books) e validar no frontend contra a interface TS (sem TypeScript acusar falta ou sobra de campos).  
- [ ] Nenhum *workaround* no front para ajustar campos (ex.: não precisar fazer .replace('\_', '') em nomes ou converter data). Tudo deve vir pronto do back.  
- [ ] Documentação de referência (pode ser no Swagger ou Markdown) listando os campos de cada entidade e suas descrições em ambos idiomas.
