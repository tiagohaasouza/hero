Patch v2.3.5
- Install agora é LAZY por padrão (use --eager para modo completo).
- Se o docker-compose.yml não estiver acessível no container, os comandos não falham: geram um patch YAML em storage/hero/compose/blocks-*.yml para aplicar no host.
- Adicionada config hero_tools.compose_path (pode apontar para o compose no host via env HERO_COMPOSE_PATH).
- ComposeEditor mantém autodetecção múltipla de paths e mensagem de erro com as paths tentadas.
