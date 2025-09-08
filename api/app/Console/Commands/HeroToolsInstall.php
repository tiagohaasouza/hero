<?php

namespace App\Console\Commands;

class HeroToolsInstall extends HeroToolsBase
{
    protected $signature = 'hero:tools:install {--include=} {--all} {--no-env} {--dry-run} {--with-docker} {--compose}';
    protected $description = 'Instala ferramentas auxiliares (env, dependências e dicas de docker compose).';

    public function handle(): int
    {
        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', (string)$this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $noEnv = (bool)$this->option('no-env');
        $dry = (bool)$this->option('dry-run');
        $withDocker = (bool)$this->option('with-docker');
        $applyCompose = (bool)$this->option('compose');

        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing to install. Use --include or --all.'); return self::SUCCESS; }

        foreach ($tools as $key => $def) {
            $this->info("Installing: " . ($def['title'] ?? $key) . " ($key)");

            if (!$noEnv && !empty($def['env']) && is_array($def['env'])) {
                $this->line('  • Applying .env changes');
                $this->applyEnv($def['env'], false, $dry);
            }

            if (!empty($def['laravel']['composer'])) {
                $pkgs = implode(' ', (array)$def['laravel']['composer']);
                $this->line("  • Composer: require $pkgs");
                $this->line("    Run: composer require $pkgs");
            }

            if ($applyCompose && !empty($def['compose'])) {
                $this->line('  • Compose: use hero:tools:compose to apply blocks');
                $this->line("    php artisan hero:tools:compose --include=$key");
            }

            if (!empty($def['docker']['service'])) {
                $svc = (string)$def['docker']['service'];
                if ($withDocker) $this->printDockerHints($svc, true);
            }
        }

        $this->info('Done. Review the printed docker commands and run as needed.');
        return self::SUCCESS;
    }
}
