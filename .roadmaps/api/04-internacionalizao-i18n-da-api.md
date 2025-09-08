# 04 — Internacionalização (i18n) da API

**Objetivo:** Permitir que o backend atenda em dois idiomas (inglês e português), dependendo da preferência do usuário/cliente, espelhando o suporte multilíngue do frontend.

* **Sessão: Middleware de Locale**

* [ ] Criar middleware **LocaleFromRequest** que verifica o header Accept-Language da requisição (ou um parâmetro ?lang=)[\[8\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/.roadmaps/api/04-roadmap-i18n-api.md#L6-L14). Com base nisso, definir app()-\>setLocale($locale) para 'pt\_BR' ou 'en'. Implementar fallback para 'en' se não fornecido ou se valor não suportado.

* [ ] Registrar esse middleware no Kernel, de modo a executá-lo nas rotas da API (grupo api ou global).

* **Sessão: Arquivos de Tradução**

* [ ] Criar diretórios de idioma em **resources/lang/**: pelo menos en e pt\_BR. Copiar os arquivos padrão do Laravel (validation.php, auth.php, etc.) para ambos e traduzir o necessário (pode usar os já fornecidos pela comunidade Laravel PT-BR).

* [ ] Para mensagens customizadas da nossa aplicação (ex.: mensagens de erro padronizadas, textos de e-mail, etc.), definir chaves nos arquivos apropriados. Por exemplo: messages.php contendo USER\_CREATED\_SUCCESS \=\> "Usuário criado com sucesso." / "User created successfully."

* [ ] Padronizar uso de *placeholder* e construção de frases nos arquivos de idioma para facilitar tradução (evitar concatenar strings no código).

* **Sessão: Validação e Respostas**

* [ ] Garantir que mensagens de erro de validação usam o sistema de tradução: nas Form Requests, usar \_\_('validation.email') etc., ou configurar no *Validator* do Laravel para usar as strings de lang padrão. Laravel já pega de validation.php automaticamente para erros de validação comuns; para campos custom, adicionar entradas em validation.php.

* [ ] Ajustar nosso formato de resposta de erro para traduzir a mensagem: quando usamos ApiResponse::error, se a exceção for, por exemplo, *ModelNotFound*, retornar \_\_('errors.NOT\_FOUND') dependendo da localidade (definir essas keys em lang files). Mesmo para erros internos nossos (ex.: “Livro não encontrado”), fornecer tradução.

* [ ] Revisar conteúdos enviados para o front que sejam textual: por exemplo, e-mails (Mailables) devem ter versão em ambos idiomas, possivelmente usando notificações com locale (Passport envia e-mails de verificação?). Se aplicável, configurar para enviar no idioma do usuário (caso tenhamos campo lang no usuário).

* **Sessão: Frontend interface** (apenas referência, implementação no front): confirmar que o front envia o header Accept-Language conforme seleção do usuário (ex.: PT ou EN). Se não, coordenação para incluir isso nas chamadas axios.

**Deliverables:**  
- [ ] API retornando mensagens em português ou inglês. Ex.: fazer request com Accept-Language: pt-BR de um erro 404 retorna { error: { message: "Não encontrado" } }, com en retorna { message: "Not found" }.  
- [ ] Testes cobrindo o middleware de locale (enviar header e verificar App::getLocale() e resposta traduzida)  
- [ ] Documentação rápida em **docs/i18n.md** explicando como trocar idioma (basta enviar header) e quais idiomas suportados.
