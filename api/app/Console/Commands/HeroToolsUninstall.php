<?php

namespace App\Console\Commands;

use App\Hero\Tools\ComposeEditor;

class HeroToolsUninstall extends HeroToolsBase
{
    protected $signature = 'hero:tools:uninstall {--include=} {--all} {--keep-env} {--dry-run} {--with-docker} {--compose} {--compose-file=} {--no-backup}';
    protected $description = 'Desinstala ferramentas (reverte env, remove blocos do compose opcionalmente).';

    public function handle(): int
    {
        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', (string)$this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $keepEnv = (bool)$this->option('keep-env');
        $dry = (bool)$this->option('dry-run');
        $applyCompose = (bool)$this->option('compose');
        $composeFile = $this->option('compose-file') ?: base_path('docker-compose.yml');
        $noBackup = (bool)$this->option('no-backup');

        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing to uninstall. Use --include or --all.'); return self::SUCCESS; }

        $composeBlocks = ['services'=>[], 'volumes'=>[], 'networks'=>[]];

        foreach ($tools as $key => $def) {
            $this->info("Uninstalling: " . ($def['title'] ?? $key) . " ($key)");

            if (!$keepEnv && !empty($def['env']) && is_array($def['env'])) {
                $this->line('  • Removing .env keys');
                $this->applyEnv(array_fill_keys(array_keys($def['env']), ''), true, $dry);
            }

            if ($applyCompose && !empty($def['compose']) && is_array($def['compose'])) {
                foreach (['services','volumes','networks'] as $k) {
                    if (!empty($def['compose'][$k]) && is_array($def['compose'][$k])) {
                        foreach ($def['compose'][$k] as $name => $v) { $composeBlocks[$k][$name] = $v; }
                    }
                }
            }
        }

        if ($applyCompose) {
            $editor = new ComposeEditor($composeFile);
            if (!$noBackup && !$dry) {
                $backup = $editor->backup();
                $this->line('Backup created: ' . $backup);
            }
            $summary = $editor->apply($composeBlocks, true);
            $this->line('Compose summary:');
            foreach ($summary as $section => $info) {
                $rows = [];
                foreach ($info as $action => $items) {
                    foreach ($items as $i) $rows[] = [$section, $action, $i];
                }
                if (!empty($rows)) $this->table(['Section','Action','Name'], $rows);
            }
            if (!$dry) { $editor->save(); $this->info('docker-compose.yml updated successfully.'); }
            else { $this->comment('Dry-run: compose NOT written.'); }
        }

        $this->info('Done.');
        return self::SUCCESS;
    }
}
