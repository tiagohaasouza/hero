<?php

namespace App\Console\Commands;

class HeroToolsPublishCompose extends \Illuminate\Console\Command
{
    protected $signature = 'hero:tools:publish-compose {--file=docker-compose.override.yml} {--container=hero-api}';
    protected $description = 'Gera instruções (docker cp) para publicar o compose add-on do container para a raiz do projeto no host.';

    public function handle(): int
    {
        $file = (string)$this->option('file');
        $container = (string)$this->option('container');

        $storagePath = storage_path('hero/compose/' . $file);
        if (!file_exists($storagePath)) {
            $this->error('File not found in storage: ' . $storagePath);
            $this->line('Use the install/compose command first to generate it.');
            return self::SUCCESS;
        }

        $containerPath = '/var/www/html/api/storage/hero/compose/' . $file;
        $hostCmd = 'docker cp ' . $container . ':' . $containerPath . ' ./' . $file;

        // Create helper script in storage
        $script = storage_path('hero/compose/publish-compose.sh');
        @file_put_contents($script, "#!/usr/bin/env bash\nset -e\n" . $hostCmd . "\necho 'Published: " . $file . "'\n");
        @chmod($script, 0o775);

        $this->info('Run this on the HOST (not inside the container):');
        $this->line('$ ' . $hostCmd);
        $this->line('Helper script created at: ' . $script . ' (run from host if you prefer)');
        return self::SUCCESS;
    }
}
