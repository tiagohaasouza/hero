# 12 — Documentação (Swagger e Guias)

**Objetivo:** Produzir documentação completa do sistema, incluindo referência de API (Swagger) e guias de uso/administração.

* **Sessão: Documentação Markdown**

* [ ] Criar pasta **/docs** no repositório com subpastas ou arquivos temáticos:

  * **docs/api.md** – visão geral de como usar a API (autenticação, versionamento, erros comuns)[\[55\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L8-L12)

  * **docs/auth.md** – detalhes dos fluxos de OAuth2 (Login, Refresh) e exemplos de requisição e resposta[\[56\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L10-L14)

  * **docs/errors.md** – códigos de erro padronizados e seu significado[\[7\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L5)

  * **docs/tenancy.md** – explicação resumida do multi-tenancy (como os subdomínios funcionam, criação de tenants, etc.)

  * **docs/websockets.md** – instruções de como conectar ao WS, formato de mensagens, eventos suportados (se implementado)

  * **docs/frontend.md** (opcional) – instruções para desenvolvedores front sobre estrutura, etc. (pode ser coberto no README da app também)

* [ ] Escrever esses documentos aproveitando conteúdo do hero-alpha (traduzindo se necessário para português e adaptando para hero.localhost). Por exemplo, hero-alpha tinha guia de auth e errors que podemos reutilizar trechos[\[55\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L8-L12)[\[20\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L13-L15).

* [ ] Incluir seções de **FAQ** ou dicas de solução de problemas se pertinente (ex.: “Não consigo acessar hero.localhost – verifique arquivo hosts ou DNS”).

* **Sessão: OpenAPI/Swagger**

* [ ] Definir um arquivo **openapi.yaml** ou **openapi.json** descrevendo todos endpoints v1:

  * Incluir schemas de modelos (User, Book, etc.) e schemas de requests (LoginRequest, etc.)

  * Descrever cada rota: método, URL, parâmetros, corpo, respostas (com exemplo).

  * Usar as mesmas descrições em PT-BR ou EN? Idealmente, documentação bilingue – mas inicialmente escrever em português (público alvo interno).

* [ ] Adicionar endpoint na aplicação para servir essa documentação – seja integrando **swagger-ui** via uma página no frontend ou um pacote Laravel (e.g. DarkaOnLine/L5-Swagger está incluído no composer[\[57\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/api/composer.json#L12-L19)). Talvez usar L5-Swagger para gerar a spec a partir de annotations. Como tempo é curto, gerar manualmente a spec pode ser mais garantido.

* [ ] Garantir que a documentação inclui indicação da versão (v1) em todos paths e menciona possibilidade de futuras versões.

* [ ] (Opcional) Preparar versão traduzida: ou dois arquivos OpenAPI ou usar recursos de i18n do Swagger UI (não trivial – talvez manter em inglês técnico e fornecer guias em PT separadamente).

* **Sessão: README e Informações Gerais**

* [ ] Atualizar README.md principal do repositório com um resumo do projeto, instruções rápidas de como rodar (Docker), e link para docs detalhadas.

* [ ] Atualizar **/app/README.md** e **/api/README.md** se necessário com informações específicas (por ex.: app README com instruções de build front, api README com links para docs de API).

**Deliverables:**  
- [ ] Pasta /docs populada com pelo menos os arquivos principais (api, auth, errors, tenancy...)  
- [ ] Documento OpenAPI disponível – validado em editor Swagger.  
- [ ] Interface de visualização da API (Swagger UI) funcionando em dev (ex.: acessar https://hero.localhost/docs carrega Swagger UI).  
- [ ] Equipe alinhada quanto ao conteúdo da documentação (revisado pelo PO/DevOps etc. para cobrir tudo necessário).

---

Com essa arquitetura proposta e o roadmap detalhado, o projeto **Hero** passa a ter uma base sólida para evoluir. Iniciaremos pela configuração do ambiente Docker unificado (etapa 01), pois isso habilita um ciclo de desenvolvimento rápido e consistente para as demais funcionalidades. Em seguida, implementaremos autenticação e multi-tenancy, por serem fundamentos que impactam todo o resto do sistema. A padronização de respostas e contratos garante que frontend e backend permaneçam em sincronia, reduzindo bugs de integração. Os módulos CRUD virão na sequência para entregar valor ao usuário final (gestão de entidades como usuários e livros), seguidos pelas melhorias de performance, segurança avançada e testes automatizados para assegurar qualidade contínua. Por fim, a documentação e pipelines CI completarão o trabalho, entregando não apenas um sistema funcional, mas também manutenível, escalável e bem documentado. Cada passo do roadmap foi pensado com base nas práticas adotadas no **hero-alpha** e nos requisitos discutidos, adaptando e aprimorando onde necessário para que o **Hero** atinja o nível desejado de excelência.

---
