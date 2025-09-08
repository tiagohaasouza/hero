<?php

namespace App\Console\Commands;

class HeroToolsUninstall extends HeroToolsBase
{
    protected $signature = 'hero:tools:uninstall {--include=} {--all} {--keep-env} {--dry-run} {--with-docker} {--compose}';
    protected $description = 'Desinstala ferramentas (reverte env e mostra dicas para parar serviços docker).';

    public function handle(): int
    {
        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', (string)$this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $keepEnv = (bool)$this->option('keep-env');
        $dry = (bool)$this->option('dry-run');
        $withDocker = (bool)$this->option('with-docker');
        $applyCompose = (bool)$this->option('compose');

        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing to uninstall. Use --include or --all.'); return self::SUCCESS; }

        foreach ($tools as $key => $def) {
            $this->info("Uninstalling: " . ($def['title'] ?? $key) . " ($key)");

            if (!$keepEnv && !empty($def['env']) && is_array($def['env'])) {
                $this->line('  • Removing .env keys');
                $this->applyEnv(array_fill_keys(array_keys($def['env']), ''), true, $dry);
            }

            if ($applyCompose && !empty($def['compose'])) {
                $this->line('  • Compose: use hero:tools:compose --remove to drop blocks');
                $this->line("    php artisan hero:tools:compose --include=$key --remove");
            }

            if (!empty($def['docker']['service'])) {
                $svc = (string)$def['docker']['service'];
                if ($withDocker) $this->printDockerHints($svc, false);
            }
        }

        $this->info('Done.');
        return self::SUCCESS;
    }
}
