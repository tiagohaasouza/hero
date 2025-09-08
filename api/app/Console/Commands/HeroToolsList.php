<?php

namespace App\Console\Commands;

class HeroToolsList extends HeroToolsBase
{
    protected $signature = 'hero:tools:list';
    protected $description = 'Lista as ferramentas suportadas pela instalação automatizada.';

    public function handle(): int
    {
        $rows = [];
        foreach ($this->toolsConfig() as $key => $def) {
            $rows[] = [
                $key,
                $def['title'] ?? $key,
                $def['docker']['service'] ?? '-',
                !empty($def['env']) ? implode(',', array_keys((array)$def['env'])) : '-',
                !empty($def['compose']) ? 'yes' : 'no',
            ];
        }
        $this->table(['Key','Title','Docker service','Env keys','Compose block'], $rows);
        return self::SUCCESS;
    }
}
