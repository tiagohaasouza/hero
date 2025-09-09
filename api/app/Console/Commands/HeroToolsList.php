<?php

namespace App\Console\Commands;

use App\Hero\Tools\ToolUrlResolver;

class HeroToolsList extends HeroToolsBase
{
    protected $signature = 'hero:tools:list {--urls}';
    protected $description = 'Lista as ferramentas; use --urls para exibir as URLs resolvidas.';

    public function handle(): int
    {
        $withUrls = (bool)$this->option('urls');
        $rows = [];
        foreach ($this->toolsConfig() as $key => $def) {
            $urls = $withUrls ? implode(' | ', array_values(ToolUrlResolver::url($key, $def))) : '-';
            $rows[] = [
                $key,
                $def['title'] ?? $key,
                $def['docker']['service'] ?? '-',
                !empty($def['env']) ? implode(',', array_keys((array)$def['env'])) : '-',
                !empty($def['compose']) ? 'yes' : 'no',
                $urls
            ];
        }
        $headers = ['Key','Title','Docker service','Env keys','Compose','URLs'];
        $this->table($headers, $rows);
        return self::SUCCESS;
    }
}
