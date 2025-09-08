<?php
namespace App\Console\Commands;


class HeroToolsUninstall extends HeroToolsBase
{
    protected $signature = 'hero:tools:uninstall {--include=} {--all} {--keep-env} {--dry-run} {--with-docker}';
    protected $description = 'Desinstala ferramentas (reverte env e mostra dicas para parar serviços docker).';


    public function handle()
    {
        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', $this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $keepEnv = (bool)$this->option('keep-env');
        $dry = (bool)$this->option('dry-run');
        $withDocker = (bool)$this->option('with-docker');


        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing to uninstall. Use --include or --all.'); return self::SUCCESS; }


        foreach ($tools as $key => $def) {
            $this->info("Uninstalling: ".$def['title']." ($key)");


            if (!$keepEnv && !empty($def['env'])) {
                $this->line(' • Removing .env keys');
                $this->applyEnv(array_fill_keys(array_keys($def['env']), ''), true, $dry);
            }


            if (!empty($def['docker']['service'])) {
                $svc = $def['docker']['service'];
                if ($withDocker) $this->printDockerHints($svc, false);
            }
        }


        $this->info('Done.');
        return self::SUCCESS;
    }
}
