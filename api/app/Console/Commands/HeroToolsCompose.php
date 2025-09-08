<?php

namespace App\Console\Commands;

use App\Hero\Tools\ComposeEditor;

class HeroToolsCompose extends HeroToolsBase
{
    protected $signature = 'hero:tools:compose {--include=} {--all} {--remove} {--dry-run} {--file=} {--no-backup}';
    protected $description = 'Aplica/Remove blocos de serviços no docker-compose.yml com segurança (merge idempotente).';

    public function handle(): int
    {
        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', (string)$this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $remove = (bool)$this->option('remove');
        $dry = (bool)$this->option('dry-run');
        $file = $this->option('file') ?: base_path('docker-compose.yml');
        $noBackup = (bool)$this->option('no-backup');

        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing selected. Use --include or --all.'); return self::SUCCESS; }

        $composeBlocks = ['services'=>[], 'volumes'=>[], 'networks'=>[]];
        foreach ($tools as $key => $def) {
            if (empty($def['compose']) || !is_array($def['compose'])) continue;
            foreach (['services','volumes','networks'] as $k) {
                if (!empty($def['compose'][$k]) && is_array($def['compose'][$k])) {
                    foreach ($def['compose'][$k] as $name => $v) { $composeBlocks[$k][$name] = $v; }
                }
            }
        }

        if (empty($composeBlocks['services']) && empty($composeBlocks['volumes']) && empty($composeBlocks['networks'])) {
            $this->info('Selected tools do not define compose blocks. Nothing to do.');
            return self::SUCCESS;
        }

        $editor = new ComposeEditor($file);
        if (!$noBackup && !$dry) {
            $backup = $editor->backup();
            $this->line('Backup created: ' . $backup);
        }

        $summary = $editor->apply($composeBlocks, $remove);
        $this->line('Summary:');
        foreach ($summary as $section => $info) {
            $rows = [];
            foreach ($info as $action => $items) {
                foreach ($items as $i) $rows[] = [$section, $action, $i];
            }
            if (!empty($rows)) $this->table(['Section','Action','Name'], $rows);
        }

        if ($dry) {
            $this->comment('Dry-run: no changes were written.');
            return self::SUCCESS;
        }
        $editor->save();
        $this->info('docker-compose.yml updated successfully.');
        return self::SUCCESS;
    }
}
