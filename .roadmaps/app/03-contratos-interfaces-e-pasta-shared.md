# Sessão 03 — Contratos/Interfaces e Pasta **shared**

Para reutilizar tipos entre **app** e **api**, utiliza-se o pacote local **/shared** com módulos TypeScript. Essas interfaces e tipos já foram estabelecidos inicialmente; precisamos garantir que estão atualizadas e sendo usadas corretamente:

* [ ] **Tipos Básicos (core):** Conferir tipos genéricos como BaseEntity { id, createdAt, updatedAt }, PageRequest, PageResponse, ApiError, Result\<T,E\>[\[10\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L69-L77). Usar BaseEntity como base para entidades do sistema (User, Book herdam id e timestamps).

* [ ] **Módulo auth:** Contém LoginRequest, LoginResponse, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyCodeRequest, TokenPayload, Role (enum)[\[11\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L71-L79). Verificar se os campos batem com o implementado no back (por ex., LoginResponse deve ter accessToken, refreshToken, tokenType etc. conforme retorna API).

* [ ] **Módulo user:** Define interface User (id, nome, sobrenome, email, avatar, status, preferencias)[\[52\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L73-L81), UserProfileUpdate, UserStatus. Ajustar se necessário (ex.: se backend usa firstName/lastName ao invés de nome/sobrenome, alinhar interfaces e adaptar no Resource).

* [ ] **Módulo book:** Define Book (id, title, author, description, coverUrl, status), BookCreateRequest, BookUpdateRequest[\[78\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L75-L83). Validar com modelo e Resource do back.

* [ ] **Módulo chart:** DTOs para gráficos (provavelmente algo como ChartData, ChartSeries)[\[79\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L77-L85). Ajustar conforme uso no front (ex.: definir tipos específicos para dados esperados de API de gráficos).

* [ ] **Módulo notification:** Notification (id, título, mensagem, tipo, dataCriacao, lida), NotificationPreferences[\[80\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L79-L83). Ver se o backend terá entidade Notification; caso sim, manter contratos sincronizados.

* [ ] **Módulo i18n:** Locale, TranslationKey, TranslationFileMetadata – tipos para internacionalização (podemos manter simples, apenas indicar códigos de língua suportados etc.)[\[81\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L81-L84).

* [ ] **Módulo security:** RateLimit, OtpRequest, OtpVerifyRequest, TwoFactorMethod[\[82\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L81-L85) – se houver funcionalidades de 2FA ou limiter, tipos já previstos.

* [ ] **Utils Compartilhados:**

* **validation.ts** – funções de validação reusáveis (e.g. isValidEmail(email), isStrongPassword(pw) etc.) para usar tanto no front quanto possivelmente no back (via tradução para PHP ou referência)[\[53\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L87-L95).

* **api.ts** – helpers para criar estruturas padronizadas de resposta (pode conter implementações dummy de success() e error() só para tipagem)[\[83\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L89-L92).

* [ ] **Barrel file:** Exportar todos os módulos a partir de shared/index.ts para facilitar importes[\[84\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/app/ROADMAP.md#L87-L94).

* [ ] **Uso no Front:** Certificar que esses tipos estão sendo usados nas props/composables. Ex.: useBooks deve retornar Ref\<Book\[\]\> de acordo com interface, useAuthForm utiliza LoginRequest etc. Assim, se algo mudar no contrato, TypeScript acusará inconsistência.
