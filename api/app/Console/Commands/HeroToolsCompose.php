<?php

namespace App\Console\Commands;

use App\Hero\Tools\ComposeEditor;
use App\Hero\Tools\ToolsComposeWriter;

class HeroToolsCompose extends HeroToolsBase
{
    protected $signature = 'hero:tools:compose {--include=} {--all} {--remove} {--dry-run} {--file=} {--no-backup} {--as-file=override}';
    protected $description = 'Gera docker-compose.override.yml (default) ou tools.yml. Se o base não estiver acessível, grava em storage e imprime um docker cp para publicar.';

    protected function buildBlocks(array $tools): array
    {
        $composeBlocks = ['services'=>[], 'volumes'=>[], 'networks'=>[]];
        foreach ($tools as $key => $def) {
            if (empty($def['compose']) || !is_array($def['compose'])) continue;
            foreach (['services','volumes','networks'] as $k) {
                if (!empty($def['compose'][$k]) && is_array($def['compose'][$k])) {
                    foreach ($def['compose'][$k] as $name => $v) { $composeBlocks[$k][$name] = $v; }
                }
            }
        }
        return $composeBlocks;
    }

    public function handle(): int
    {
        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', (string)$this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $remove = (bool)$this->option('remove');
        $dry = (bool)$this->option('dry-run');
        $asFile = (string)$this->option('as-file') ?: 'override';

        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing selected. Use --include or --all.'); return self::SUCCESS; }

        $blocks = $this->buildBlocks($tools);

        if (!$remove) {
            try {
                $editor = new ComposeEditor($this->option('file') && file_exists($this->option('file')) ? $this->option('file') : null);
                $base = $editor->getPath();
                $target = dirname($base) . DIRECTORY_SEPARATOR . ($asFile === 'tools' ? 'docker-compose.tools.yml' : 'docker-compose.override.yml');
                $yaml = ToolsComposeWriter::toYaml($blocks);
                if (@file_put_contents($target, $yaml) !== false) {
                    $this->info(($asFile === 'tools' ? 'docker-compose.tools.yml' : 'docker-compose.override.yml') . ' written: ' . $target);
                    if ($asFile === 'tools') $this->line('Use: docker compose -f docker-compose.yml -f docker-compose.tools.yml up -d');
                    else $this->line('Use: docker compose up -d');
                    return self::SUCCESS;
                }
                throw new \RuntimeException('Failed to write add-on compose beside base file.');
            } catch (\Throwable $e) {
                $this->warn('Base compose not accessible from container (' . $e->getMessage() . ').');
                $file = storage_path('hero/compose/' . ($asFile === 'tools' ? 'docker-compose.tools.yml' : 'docker-compose.override.yml'));
                @mkdir(dirname($file), 0775, true);
                $yaml = ToolsComposeWriter::toYaml($blocks);
                if (@file_put_contents($file, $yaml) !== false) {
                    $baseName = basename($file);
                    $this->line('Add-on compose written at: ' . $file);
                    $this->line('From HOST, publish with:');
                    $this->line('$ docker cp hero-api:/var/www/html/api/storage/hero/compose/' . $baseName . ' ./' . $baseName);
                    $this->line('Then run: docker compose up -d');
                    return self::SUCCESS;
                }
                $this->error('Failed to write add-on compose file to storage.');
                return self::SUCCESS;
            }
        }

        $this->warn('Remove mode not supported for add-on file workflow. Remove services from the add-on file.');
        return self::SUCCESS;
    }
}
