# Atualização para incluir a ferramenta **Laravel Reverb** no Hero

Para integrar o **Laravel Reverb** ao sistema de ferramentas do projeto Hero, serão necessárias modificações na configuração, no Docker Compose e na lógica de instalação Artisan. A seguir detalhamos cada passo da atualização, garantindo que o Reverb seja tratado de forma consistente com as demais ferramentas (Mailhog, Horizon, etc.) e que todas as alterações em variáveis de ambiente utilizem o EnvEditor.

## 1\. Configuração da nova ferramenta no config/hero\_tools.php

No arquivo de configuração de ferramentas (api/config/hero\_tools.php), adicione uma entrada para o **Reverb**, seguindo o padrão das demais ferramentas. Por exemplo, podemos incluir um array 'reverb' com as seguintes chaves: título, variáveis de ambiente, URLs e blocos do docker-compose:

'reverb' \=\> \[  
    'title' \=\> 'Laravel Reverb (WebSockets)',  
    'docker' \=\> \['service' \=\> 'hero-reverb'\],  
    'env' \=\> \[  
        'BROADCAST\_CONNECTION' \=\> 'reverb',  
        'REVERB\_APP\_ID'       \=\> 'hero-app-id',  
        'REVERB\_APP\_KEY'      \=\> 'hero-app-key',  
        'REVERB\_APP\_SECRET'   \=\> 'hero-app-secret',  
        'REVERB\_SERVER\_HOST'  \=\> '0.0.0.0',  
        'REVERB\_SERVER\_PORT'  \=\> '8080',  // Porta interna do servidor Reverb  
        'REVERB\_HOST'         \=\> 'localhost',  
        'REVERB\_PORT'         \=\> '8080',  // Porta que a aplicação Laravel usará para enviar broadcasts  
        'REVERB\_SCHEME'       \=\> 'http'  
    \],  
    'urls' \=\> \[  
        'ws' \=\> \[  
            'scheme'   \=\> 'ws',  
            'host'     \=\> null,  
            'port'     \=\> 8080,  
            'env\_port' \=\> 'REVERB\_SERVER\_PORT',  
            'path'     \=\> '/'   
        \],  
    \],  
    'compose' \=\> \[ /\* definido abaixo \*/ \]  
\],

* **Variáveis .env:** Foram adicionadas as chaves necessárias para o Reverb. Em especial, BROADCAST\_CONNECTION=reverb para definir o driver de broadcast como Reverb[\[1\]](https://github.com/laravel/framework/blob/a46b55100bb7ac0b7f7e782f67a21e686608ce45/src/Illuminate/Foundation/Console/BroadcastingInstallCommand.php#L81-L85), além das credenciais do app Reverb (REVERB\_APP\_ID, REVERB\_APP\_KEY, REVERB\_APP\_SECRET) e configurações de host/porta. Esses valores padrão garantem uma configuração inicial funcional (podendo ser ajustados depois conforme necessário). Por exemplo, definimos REVERB\_SERVER\_HOST=0.0.0.0 e porta 8080 para que o servidor escute em todas interfaces na porta 8080, e configuramos REVERB\_HOST=localhost e REVERB\_PORT=8080 para que a aplicação cliente (Laravel Echo) se conecte via *WebSocket* localmente na mesma porta. O esquema http indica uso de **WS** (não TLS) em desenvolvimento. *(Obs.: Caso o projeto use um domínio custom local (ex: hero.local), o valor de REVERB\_HOST deve ser alterado para esse host para evitar problemas de origem; da mesma forma, se a porta 8080 já estiver em uso por outra ferramenta (ex.: Adminer), pode-se escolher uma porta livre, como 8083 ou 6001.)*

* **URL no painel:** A seção 'urls' define como o link para o Reverb aparecerá no painel de ferramentas. Usamos scheme \=\> 'ws' para indicar protocolo WebSocket, e deixamos 'host' \=\> null para herdar o host base da aplicação (conforme ToolUrlResolver utiliza baseHost() automaticamente[\[2\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolUrlResolver.php#L26-L34)). O port é associado à variável de ambiente REVERB\_SERVER\_PORT, assim, se ajustarmos a porta no .env, a URL exibida no painel refletirá essa mudança. No painel, o Reverb será listado com um *badge* "ws" e um link como ws://\<seu-host\>:8080/ – ainda que clicar nesse link não abra uma interface (pois é um serviço de WebSocket sem UI), ele serve para **visualizar e validar a URL/porta configurada** conforme solicitado.

## 2\. Bloco Docker Compose do serviço **hero-reverb**

Em **hero\_tools.php**, na chave 'compose' da ferramenta Reverb, defina a especificação do serviço Docker **hero-reverb** de forma similar a outras ferramentas. Por exemplo:

'compose' \=\> \[  
    'services' \=\> \[  
        'hero-reverb' \=\> \[  
            'image'         \=\> 'php:8.3-fpm',  
            'container\_name'=\> 'hero-reverb',  
            'restart'       \=\> 'unless-stopped',  
            'working\_dir'   \=\> '/var/www/html/api',  
            'env\_file'      \=\> \['./api/.env'\],  
            'volumes'       \=\> \[  
                './api:/var/www/html/api',  
                './docker/entrypoints:/docker/entrypoints:ro'  
            \],  
            'depends\_on'    \=\> \['hero-api'\],  
            'entrypoint'    \=\> \['/bin/sh', '/docker/entrypoints/reverb-entrypoint.sh'\],  
            'networks'      \=\> \['hero\_net'\],  
            'ports'         \=\> \['8080:8080'\]  
        \]  
    \]  
\]

Vamos explicar cada parte:

* **Imagem e container:** Usamos a mesma imagem base do PHP usada pelo API (php:8.3-fpm) para o container do Reverb, uma vez que ele executará comandos Artisan do Laravel. A configuração espelha em boa parte o serviço hero-queue (responsável pelo Horizon/queues), alterando apenas o nome do container e o script de entrada[\[3\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L72-L80)[\[4\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L89-L93).

* **Volumes:** Montamos o diretório do código (./api) no mesmo caminho dentro do container, assim como o volume de entrypoints somente-leitura. Isso permite que o container tenha acesso ao código Laravel e ao script de inicialização.

* **Env\_file:** Incluímos env\_file: \["./api/.env"\] para garantir que o container do Reverb carregue todas as variáveis definidas no .env da API. Isso é fundamental para que o Reverb leia as credenciais e configurações (como DB, Redis, e as próprias variáveis REVERB\_*) iguais às do app. A preferência pelo uso de env\_file segue o padrão do projeto – por exemplo, o serviço hero-api e hero-queue já usam o ./api/.env para carregar variáveis[\[5\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L42-L50)[\[3\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L72-L80). O sistema de ferramentas até impõe essa abordagem: o código de geração do compose* *adiciona automaticamente*\* env\_file no hero-db para evitar valores literais de ${...} no YAML[\[6\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolsComposeWriter.php#L16-L24). Portanto, estamos consistentes com essa prática.

* **Depends\_on:** Configuramos depends\_on: \['hero-api'\] para que o Reverb inicie somente após o container principal da API estar de pé. Isso garante que quaisquer dependências (p.ex. bootstrap da aplicação, ou migrações executadas no startup do hero-api) já tenham ocorrido. É similar ao que é feito para o serviço de fila hero-queue (que depende do hero-api)[\[4\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L89-L93).

* **Entrypoint:** Definimos um entrypoint customizado apontando para um script *shell* no container (/docker/entrypoints/reverb-entrypoint.sh). Esse script deve encapsular o comando Artisan que inicia o servidor Reverb, por exemplo: php artisan reverb:start. Assim, quando o container hero-reverb subir, ele automaticamente executará o servidor WebSocket do Reverb e permanecerá rodando. O uso de um entrypoint script segue o padrão do projeto; o serviço de fila, por exemplo, usa queue-entrypoint.sh para rodar o Horizon ou o worker[\[4\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L89-L93). Será necessário **criar o arquivo** docker/entrypoints/reverb-entrypoint.sh (similar aos existentes para API, queue e frontend) contendo algo como:

\#\!/bin/sh  
cd /var/www/html/api  
php artisan reverb:start

Certifique-se de dar permissão de execução a este script. Na inicialização dos containers, o *preflight* do projeto irá verificar e ajustar as quebras de linha e permissão desse arquivo automaticamente (assim como faz para os demais entrypoints)[\[7\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker/scripts/preflight.sh#L16-L25).

* **Port mapping:** No exemplo acima, mapeamos '8080:8080' nas portas do container, tornando o WebSocket acessível na porta 8080 do host (útil se você for consumir de fora do cluster Docker, ex.: front-end rodando no host). Caso você utilize um proxy reverso ou dominio custom (e.g., acessando via nginx com proxy), essa exposição direta pode não ser necessária – ajuste conforme o cenário. O importante é que o **compose override gerado inclua o serviço hero-reverb**, permitindo iniciá-lo com os demais (docker compose up \-d). Ao usar o Artisan com \--compose, o arquivo docker-compose.override.yml será gerado contendo esse bloco do serviço[\[8\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L110-L118), e uma mensagem confirmará a escrita do arquivo[\[9\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L126-L134).

## 3\. Instalação via Artisan (hero:tools:install)

Com a configuração acima, o comando Artisan de instalação de ferramentas já irá reconhecer o **Reverb** tanto via \--include=reverb quanto via \--all. Basta garantir que a lista de ferramentas inclua o novo item (o método toolsConfig() lê do config[\[10\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L10-L18)). Ao rodar php artisan hero:tools:list, o Reverb deverá aparecer na listagem junto com as outras ferramentas, incluindo a chave, título, serviço docker e variáveis definidas[\[11\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsList.php#L16-L24).

**Ajustes na aplicação do .env:** Para melhorar a consistência e evitar edições manuais no .env, devemos atualizar a lógica base de instalação para **centralizar o uso do EnvEditor** em todas as inserções de variáveis:

* *Antes:* O método HeroToolsBase::applyEnv() criava internamente um EnvEditor e já chamava save() a cada invocação[\[12\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L27-L36)[\[13\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L41-L48). Assim, ao instalar múltiplas ferramentas (ou usando \--all), o .env era aberto e salvo repetidamente. Embora funcional, isso fragmenta a operação.

* *Depois:* Podemos modificar o fluxo para usar **um único EnvEditor** durante todo o processo de instalação, acumulando as mudanças e salvando ao final. Por exemplo, em HeroToolsInstall::handle(), já existe um $envEditor \= new EnvEditor(); instanciado[\[14\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L90-L98) para sincronizar as variáveis de MySQL. Podemos reaproveitá-lo para as demais ferramentas:

* Para cada ferramenta $def instalada, iterar sobre $def\['env'\] e chamar $envEditor-\>set($key, $value) em vez de usar applyEnv diretamente. Em modo *dry-run*, podemos ainda chamar applyEnv(..., $dry=true) apenas para exibir a tabela de mudanças sem salvar (já que no modo normal salvaremos tudo de uma vez no final).

* Remover as chamadas redundantes de $envEditor-\>save() dentro de applyEnv() ou evitar usá-las no loop. Ao final do loop de instalação, já existe uma chamada única if (\!$noEnv && \!$dry) $envEditor-\>save();[\[15\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L120-L128) que escreverá todas as alterações acumuladas de uma só vez no .env.

Desse modo, **todas as edições de .env passam pelo EnvEditor** (que cuida do parsing e formatação corretamente) e são persistidas de forma atômica. Isso evita edições manuais ou inconsistentes. A alteração garante que mesmo novas variáveis do Reverb (como as adicionadas acima) serão inseridas no .env via EnvEditor – mantendo comentários, ordem e quebras de linha adequadas, conforme implementado no próprio EnvEditor[\[16\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php#L26-L35)[\[17\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php#L59-L64). Em suma, nenhuma ferramenta fará mais manipulação “na unha” do arquivo; tudo fica padronizado via métodos set()/remove() do editor de ambiente.

## 4\. Validação do carregamento do .env e exibição no painel

Após implementar as mudanças, verifique os seguintes pontos para garantir que o Reverb foi integrado corretamente:

* **Env File no Compose:** Certifique-se de que o arquivo docker-compose.override.yml gerado inclua o bloco do hero-reverb com env\_file: ./api/.env. Isso garantirá que as variáveis definidas (incluindo REVERB\_\*) estão disponíveis no container do Reverb no momento da inicialização. O sistema Hero já está preparado para carregar o .env dessa forma (vide o uso de env\_file no hero-api e hero-queue[\[5\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L42-L50)[\[3\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L72-L80)), portanto estamos seguindo o padrão adequado.

* **Service Provider e env\_file:** O Hero utiliza a configuração env\_file do Docker para propagar o .env, ao invés de passar tudo via environment. No codebase, por exemplo, há lógica para assegurar que mesmo serviços adicionados posteriormente usem o .env compartilhado (veja a adição automática de env\_file no serviço de banco[\[6\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolsComposeWriter.php#L16-L24)). Portanto, adicionar o hero-reverb com env\_file mantém essa consistência. *Não há necessidade de carregamento manual do .env via código PHP*, pois o Docker já injeta as variáveis – o Reverb usará env('REVERB\_APP\_KEY') e similares normalmente.

* **Painel de Ferramentas (UI):** Abra o painel administrativo onde as ferramentas são listadas (rota /hero/tools ou similar). O Reverb deverá aparecer na lista com o título fornecido e um indicativo de URL. Por exemplo, assim como o Mailhog mostra um link para sua interface web[\[18\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L14-L22), o Reverb mostrará a URL WS configurada. O controlador da view simplesmente pega os URLs gerados pelo ToolUrlResolver para cada ferramenta[\[19\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Http/Controllers/Hero/ToolsController.php#L16-L24), de forma que nossa entrada 'urls' para Reverb resultará em um item 'ws' \=\> 'ws://seu-host:8080/'. Não há interface HTML para o Reverb, mas a presença desse link confirma que o serviço está disponível e em execução na porta esperada. Além disso, a lógica do ToolsController define um status "probe" padrão para serviços não especiais[\[20\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Http/Controllers/Hero/ToolsController.php#L22-L29), então possivelmente haverá um indicador de status tentando pingar o serviço. Se implementado, ele pode tentar conectar no socket para verificar se está ativo. Em ambiente local sem TLS, verifique se o navegador não bloqueia o *websocket* (pode ser necessário acessar via http:// para que ws:// funcione, ou ajustar para wss:// em caso de HTTPS).

* **Instalação individual/todas:** Teste os comandos Artisan: php artisan hero:tools:install \--include=reverb e também \--all. Em ambos os casos, o sistema deve adicionar as variáveis no .env (sem duplicatas ou corrupções) e, se usado \--compose, gerar corretamente o compose override com o serviço. Teste também php artisan hero:tools:uninstall \--include=reverb para garantir que ele remove as chaves REVERB\_\* e o bloco do compose (o HeroToolsUninstall utiliza applyEnv com unset=true para remover as keys[\[21\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php#L28-L35) e atualiza o compose removendo serviços adicionados[\[22\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php#L30-L38)[\[23\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php#L44-L52), o que deverá abranger o hero-reverb também).

Por fim, com o **Laravel Reverb** rodando como parte do projeto Hero, você terá um servidor WebSocket em tempo real integrado. A URL e porta configuradas podem ser usadas pelo Laravel Echo (no front-end) para se conectar e receber eventos broadcast. Vale lembrar de instalar o pacote do Reverb no backend (via Composer) caso ainda não tenha feito – o Hero Tools pode apenas indicar o comando. Na nossa configuração, poderíamos adicionar em 'laravel' \=\> \['composer' \=\> \['laravel/reverb:^1.0'\]\] se desejarmos que o comando de instalação sugira o composer require (similar ao Horizon e Scout/MeiliSearch que listam dependências[\[24\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L88-L96)[\[25\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L153-L155)).

Com essas alterações, o **Reverb** passa a ser tratado como uma ferramenta de primeira classe no Hero: \- Configurável via .env e visível no painel com URL, \- Inicializável junto com a aplicação (container dedicado hero-reverb ligado à rede hero\_net e iniciando automaticamente com o restante do stack), \- Instalável ou removível através dos comandos Artisan padronizados, \- E com garantia de que manipulações no .env ocorrem de forma segura via EnvEditor, evitando inconsistências.

**Referências:**

* Configuração de ferramentas no Hero (exemplo do Mailhog)[\[26\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L6-L13)[\[27\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L17-L25).

* Uso de env\_file para compartilhar .env entre serviços Docker[\[5\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L42-L50)[\[6\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolsComposeWriter.php#L16-L24).

* Código do Artisan *install* mostrando montagem do docker-compose override e merge de serviços[\[8\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L110-L118)[\[9\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L126-L134).

* Implementação do EnvEditor e aplicação de variáveis de ambiente[\[16\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php#L26-L35)[\[13\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L41-L48).

* Documentação Laravel Reverb – variáveis de ambiente de credencial e uso no .env[\[28\]](https://laravel.com/docs/12.x/reverb#:~:text=In%20order%20to%20establish%20a,using%20the%20following%20environment%20variables)[\[29\]](https://laravel.com/docs/12.x/reverb#:~:text=Alternatively%2C%20you%20may%20define%20,configuration%20file).

---

[\[1\]](https://github.com/laravel/framework/blob/a46b55100bb7ac0b7f7e782f67a21e686608ce45/src/Illuminate/Foundation/Console/BroadcastingInstallCommand.php#L81-L85) BroadcastingInstallCommand.php

[https://github.com/laravel/framework/blob/a46b55100bb7ac0b7f7e782f67a21e686608ce45/src/Illuminate/Foundation/Console/BroadcastingInstallCommand.php](https://github.com/laravel/framework/blob/a46b55100bb7ac0b7f7e782f67a21e686608ce45/src/Illuminate/Foundation/Console/BroadcastingInstallCommand.php)

[\[2\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolUrlResolver.php#L26-L34) ToolUrlResolver.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolUrlResolver.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolUrlResolver.php)

[\[3\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L72-L80) [\[4\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L89-L93) [\[5\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml#L42-L50) docker-compose.yml

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker-compose.yml)

[\[6\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolsComposeWriter.php#L16-L24) ToolsComposeWriter.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolsComposeWriter.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/ToolsComposeWriter.php)

[\[7\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker/scripts/preflight.sh#L16-L25) preflight.sh

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker/scripts/preflight.sh](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/docker/scripts/preflight.sh)

[\[8\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L110-L118) [\[9\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L126-L134) [\[14\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L90-L98) [\[15\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php#L120-L128) HeroToolsInstall.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsInstall.php)

[\[10\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L10-L18) [\[12\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L27-L36) [\[13\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php#L41-L48) HeroToolsBase.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsBase.php)

[\[11\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsList.php#L16-L24) HeroToolsList.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsList.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsList.php)

[\[16\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php#L26-L35) [\[17\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php#L59-L64) EnvEditor.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Hero/Tools/EnvEditor.php)

[\[18\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L14-L22) [\[24\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L88-L96) [\[25\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L153-L155) [\[26\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L6-L13) [\[27\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php#L17-L25) hero\_tools.tools.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero\_tools.tools.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/config/hero_tools.tools.php)

[\[19\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Http/Controllers/Hero/ToolsController.php#L16-L24) [\[20\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Http/Controllers/Hero/ToolsController.php#L22-L29) ToolsController.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Http/Controllers/Hero/ToolsController.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Http/Controllers/Hero/ToolsController.php)

[\[21\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php#L28-L35) [\[22\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php#L30-L38) [\[23\]](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php#L44-L52) HeroToolsUninstall.php

[https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php](https://github.com/tiagohaasouza/hero/blob/6081a68aaac122f1d24314817f369076108a6050/api/app/Console/Commands/HeroToolsUninstall.php)

[\[28\]](https://laravel.com/docs/12.x/reverb#:~:text=In%20order%20to%20establish%20a,using%20the%20following%20environment%20variables) [\[29\]](https://laravel.com/docs/12.x/reverb#:~:text=Alternatively%2C%20you%20may%20define%20,configuration%20file) Laravel Reverb \- Laravel 12.x \- The PHP Framework For Web Artisans

[https://laravel.com/docs/12.x/reverb](https://laravel.com/docs/12.x/reverb)