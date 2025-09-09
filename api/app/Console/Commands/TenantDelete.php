<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Stancl\Tenancy\Database\Models\Tenant;

class TenantDelete extends Command
{
    protected $signature = 'tenant:delete {id}';
    protected $description = 'Remove um tenant e seus dados';

    public function handle()
    {
        $id = $this->argument('id');
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();
        $this->info("Tenant {$id} removido.");
        return Command::SUCCESS;
    }
}
