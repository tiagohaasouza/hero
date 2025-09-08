# 08 — Comandos Artisan e Automação de Tarefas

**Objetivo:** Criar comandos úteis para desenvolvedores e administradores manterem o sistema, além de incorporar scripts existentes.

* **Sessão: Utilitários de Desenvolvimento**

* [ ] Comando **cache:clear-all** (se não houver): limpa config, route, view e cache de query de uma vez (atalho para vários comandos Laravel). Poderia ser php artisan hero:refresh que chama internamente optimize:clear e outros.

* [ ] Comando **db:refresh-tenants**: derruba e recria os bancos de todos tenants em dev, re-populando dados de teste. Útil quando há mudança estrutural e muitos tenants de teste. (CUIDADO: só uso em dev\!)

* [ ] Comando **tenant:seed-demo {id?}**: semeia dados de exemplo em um tenant específico (ou todos). Poderia utilizar *TenantSeeder* com dados fictícios.

* **Sessão: Operação e Manutenção**

* [ ] Integrar geração de cert dentro de Artisan: por exemplo php artisan hero:generate-cert que invoca o mesmo script .dev-helpers caso precisem regenerar certificado ou adicionar domínios.

* [ ] Comando **queue:retry-failed** (já existe no Laravel) mas talvez criar atalhos como **queue:flush** para limpar jobs pendentes, etc., se for recorrente no projeto.

* [ ] Comando **schedule:run-tenants**: se for usar scheduler, pensar como agendar tarefas por tenant – possivelmente não necessário agora.

* **Sessão: Seeders e Data Reset**

* [ ] Garantir presença de seeders úteis: *TenantAdminSeeder*, *ExampleDataSeeder*, etc., e documentar seu uso. Talvez criar um comando hero:reset-demo que recria banco central, droppa tenants, recria um tenant demo e popula dados – para quickly resetar ambiente de demo.

* [ ] Verificar scripts shell existentes (scripts/clear\_laravel\_caches.sh etc. no hero)[\[16\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L5) e portar lógica para comandos artisan quando aplicável, para manter tudo dentro do PHP (facilita execução dentro do container).

**Deliverables:**  
- [ ] Lista de comandos custom implementados (visíveis via php artisan list em categoria própria, ex.: “hero:” prefixo)  
- [ ] Documentação breve em **README** ou **docs/maintenance.md** sobre como usar esses comandos (ex.: criar tenant, limpar caches, etc.)  
- [ ] Scripts shell legados removidos ou substituídos (manter talvez apenas os de conveniência para Docker, se ainda necessários).
