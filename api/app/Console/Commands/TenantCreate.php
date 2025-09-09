<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Stancl\Tenancy\Database\Models\Tenant;
use Stancl\Tenancy\Database\Models\Domain;

class TenantCreate extends Command
{
    protected $signature = 'tenant:create {name} {domain}';
    protected $description = 'Cria um tenant com domínio';

    public function handle()
    {
        $name = $this->argument('name');
        $domain = $this->argument('domain');

        $tenant = Tenant::create(['name' => $name]);
        Domain::create(['tenant_id' => $tenant->id, 'domain' => $domain]);

        $this->info("Tenant {$name} criado: {$domain} (id={$tenant->id})");
        $this->call('tenants:migrate', []);
        return Command::SUCCESS;
    }
}
