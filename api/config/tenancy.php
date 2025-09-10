<?php

return [
    // Domínios centrais (onde a aplicação central roda). Separe por vírgula no .env.
    'central_domains' => array_filter(array_map('trim', explode(',', env('CENTRAL_DOMAINS', 'localhost')))),

    // Identificação do tenant: por domínio (subdomínios) por padrão.
    'tenant_identification_middleware' => [
        \Stancl\Tenancy\Middleware\InitializeTenancyByDomain::class,
    ],

    // Rotas que são consideradas centrais e não devem ser acessadas de domínios de tenant.
    'central_route_middleware' => [
        \Stancl\Tenancy\Middleware\PreventAccessFromTenantDomains::class,
    ],

    // Modelo de Tenant padrão (pode usar o nativo do pacote)
    'tenant_model' => \Stancl\Tenancy\Database\Models\Tenant::class,

    // Mapeamento opcional de storage->config (ex.: cada tenant com sua fila/mail/etc.).
    // Adicione conforme necessidade do projeto.
    'storage_to_config_map' => [
        // 'mail.from.address' => 'mail_from_address',
    ],

    // Caminhos de migrations específicas de tenant (estas rodam com `tenants:migrate`).
    'tenant_migrations_paths' => [
        database_path('migrations/tenant'),
    ],

    // Prefixo do cache de rota/arquivo config para tenants (evita colisões).
    'cache_prefix' => env('TENANCY_CACHE_PREFIX', 'tenant:'),
];
