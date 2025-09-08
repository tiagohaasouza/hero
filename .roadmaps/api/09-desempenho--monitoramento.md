# 09 — Desempenho & Monitoramento

**Objetivo:** Introduzir melhorias de performance e monitoramento para garantir que o sistema escale e seja observável em produção.

* **Sessão: Cache & Redis Multi-Tenant**

* [ ] Confirmar que o Tenancy está adicionando tags nos caches e prefixo nas keys do Redis para evitar colisão entre tenants[\[38\]](https://github.com/tiagohaasouza/hero-alpha/blob/85e28bcc6b12e118f300d17cfad3d2c37f2760ab/BLUEPRINT.md#L22-L25). Testar colocando algo no cache em um tenant e lendo em outro (deve não achar).

* [ ] Configurar algum cache para queries frequentes se aplicável: por exemplo, cache de configurações do tenant ou lista de permissões por 1 minuto – melhorias pontuais caso identificadas.

* [ ] Validar uso do **Repository de Cache** do Laravel com tagging (Stancl injeta tag via Tenant ID).

* **Sessão: Filas & Horizon**

* [ ] Avaliar a necessidade de **Laravel Horizon**: se o sistema passar a ter diversas jobs (envio de emails, geração de relatórios), Horizon facilita monitorar e gerenciar filas. Considerar incluir no projeto (pacote laravel/horizon) e subir um container separado rodando horizon.

* [ ] (Mesmo se não usar agora) Planejar a separação de filas por prioridade ou tipo no futuro (por ex, fila “emails”, fila “processamento pesado”) – anotar na doc.

* **Sessão: WebSockets**

* [ ] Manter por ora o servidor Node WebSocket existente. Incluir seu start no ambiente Docker – possivelmente rodá-lo dentro do container **frontend** ou criar um **ws** separado. O hero-alpha não tinha container explícito para ws; provavelmente rodava via script junto do Vite ou via PM2. Simplicidade: podemos adicionar um comando no Docker Compose (ex.: usar npm run dev && node src/node/server.js combinado via ferramenta *concurrently*, ou criar um container node-ws específico).

* [ ] Integrar WebSocket com a autenticação: implementar no server Node a validação do token JWT do Passport ao receber nova conexão (fazer request para /auth/me com token ou decodificar JWT se público). Isso garante que somente usuários logados recebam eventos.

* [ ] Configurar canais: decidir estrutura de canais WS (ex.: canal por tenant: tenant-{id} para notificações globais do tenant, ou canais por recurso). Garantir que informações sensíveis de um tenant não vazem para outro – provavelmente usando tenant id no nome do canal e fazendo o Node ingressar clientes somente no canal do seu tenant.

* [ ] Monitorar funcionamento: testar envio de um evento no Laravel (ex.: evento de “novo livro cadastrado”) e recebimento no cliente via WS. Pode requerer integração via Redis (Laravel publica no Redis, Node subscreve).

* **Sessão: Logging & Erro Tracking**

* [ ] Ajustar formato de logs do Laravel para JSON estruturado (hero-alpha ativou LOG\_CHANNEL=json)[\[17\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L5), pois facilita enviar para sistemas de log. Manter isso.

* [ ] Configurar logs do Nginx para gravar em storage/logs/nginx-access.log e ...error.log (no compose já estava montado)[\[18\]](https://github.com/tiagohaasouza/hero/blob/b24a5efe76e936f4a29c6e8edd153c8e15efb676/ARCHITECTURE.md#L2-L4). Assim, todos logs ficam acessíveis via arquivos ou via docker logs.

* [ ] (Opcional) Integrar **Sentry** ou similar para captura de exceções do backend e do frontend. Adicionar SDK Sentry no Laravel e Vue, enviar erros não tratados. Não é prioritário agora, mas arquitetar pensando nisso (ex.: manter DSN em .env).

* **Sessão: Testes de Carga**

* [ ] (Apenas planejamento) Considerar usar ferramenta como JMeter ou k6 para um pequeno teste de carga assim que principais endpoints estiverem prontos, a fim de identificar gargalos (particularmente verificar overhead do tenancy e Passport em múltiplos requests).

* [ ] Se desempenho de multi-tenancy se mostrar crítico, avaliar uso de caches agressivos ou mesmo Sharding de serviços (ex.: cada tenant grande em instância separada) – mas isso é horizonte distante, apenas mencionar.

**Deliverables:**  
- [ ] Ambiente pronto para observar e escalar: logs estruturados, possiblidade de adicionar Horizon facilmente.  
- [ ] Decisão tomada sobre WebSockets: continuar com Node (documentar como iniciar em produção) ou migrar para Laravel WebSockets – por ora, Node configurado rodando via Docker.  
- [ ] Documentação **docs/architecture.md** atualizada com seção de observabilidade (como coletar logs, monitorar queues, etc.).
