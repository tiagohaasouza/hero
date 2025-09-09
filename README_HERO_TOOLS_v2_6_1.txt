Hero Tools - Patch v2.6.1 (DB user fix)
--------------------------------------------------
Correção do usuário do banco (ex.: hero/hero) não criado:
- Removemos o 'environment' do hero-db no override (evita valores literais como '${DB_USERNAME}' no container).
- Agora o install sincroniza MYSQL_* no /api/.env com base nos DB_* atuais, para a imagem MariaDB criar o DB/usuário no primeiro boot.

Fluxo recomendado (fresh start):
1) Ajuste /api/.env (DB_* e, opcionalmente, deixe MYSQL_* em branco).
2) Rode: php artisan hero:tools:install --all --compose
3) Suba limpo: docker compose down -v && docker compose up -d
4) phpMyAdmin: logue com o usuário definido (ex.: hero/hero).

Observação:
- A imagem MariaDB só cria banco/usuário na primeira inicialização do volume. Se você não puder apagar o volume, crie o usuário/grants manualmente.
