<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class HeroPassportSeedClients extends Command
{
    protected $signature = 'hero:passport:seed-clients {--force : Recria chaves/clients se necessário}';

    protected $description = 'Gera chaves do Passport e cria clients (personal/password) de forma idempotente, sem publicar migrations.';

    public function handle(): int
    {
        $this->line('• Ensuring Passport keys...');
        Artisan::call('passport:keys', ['--force' => true]);
        $this->output->write(Artisan::output());

        try {
            DB::table('oauth_clients')->exists();
        } catch (\Throwable $e) {
            $this->components->error('Tabela oauth_clients não existe. Rode as migrations primeiro.');
            return self::FAILURE;
        }

        $hasPersonal  = DB::table('oauth_clients')->where('personal_access_client', 1)->exists();
        $hasPassword  = DB::table('oauth_clients')->where('password_client', 1)->exists();

        if (!$hasPersonal || $this->option('force')) {
            $this->line('• Creating/refreshing Personal Access Client...');
            Artisan::call('passport:client', ['--personal' => true, '--no-interaction' => true, '--name' => 'Default Personal Access Client']);
            $this->output->write(Artisan::output());
        } else {
            $this->line('• Personal Access Client already present; skipping');
        }

        if (!$hasPassword || $this->option('force')) {
            $this->line('• Creating/refreshing Password Grant Client...');
            Artisan::call('passport:client', ['--password' => true, '--no-interaction' => true, '--name' => 'Default Password Grant Client']);
            $this->output->write(Artisan::output());
        } else {
            $this->line('• Password Grant Client already present; skipping');
        }

        $this->components->info('Passport clients OK.');
        return self::SUCCESS;
    }
}
