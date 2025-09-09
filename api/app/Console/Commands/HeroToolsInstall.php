<?php

namespace App\Console\Commands;

use App\Hero\Tools\ComposeEditor;
use App\Hero\Tools\EnvEditor;
use App\Hero\Tools\ToolsComposeWriter;

class HeroToolsInstall extends HeroToolsBase
{
    protected $signature = 'hero:tools:install {--include=} {--all} {--no-env} {--dry-run} {--with-docker} {--compose} {--compose-file=} {--compose-file-mode=override} {--no-backup} {--lazy} {--eager}';
    protected $description = 'Instala ferramentas: .env e (opcional) gera docker-compose.override.yml. Lazy por padrão. Backups em storage/hero/backups.';

    protected function pickComposePath(): ?string
    {
        $cli = $this->option('compose-file');
        if ($cli && file_exists($cli)) return $cli;
        return null;
    }

    protected function storageBackupDir(): string
    {
        $dir = storage_path('hero/backups');
        @mkdir($dir, 0775, true);
        return $dir;
    }

    protected function backupEnvToStorage(string $suffix): ?string
    {
        $envPath = base_path('.env');
        if (!file_exists($envPath)) return null;
        $dst = $this->storageBackupDir() . '/env-' . $suffix . '.bak';
        return @copy($envPath, $dst) ? $dst : null;
    }

    protected function writeAddonComposeBeside(string $baseComposePath, array $blocks, string $mode = 'override'): ?string
    {
        $dir = dirname($baseComposePath);
        $file = $dir . DIRECTORY_SEPARATOR . ($mode === 'tools' ? 'docker-compose.tools.yml' : 'docker-compose.override.yml');
        $yaml = ToolsComposeWriter::toYaml($blocks);
        if (@file_put_contents($file, $yaml) !== false) return $file;
        return null;
    }

    protected function writeAddonComposeToStorage(array $blocks, string $mode = 'override'): ?string
    {
        $file = storage_path('hero/compose/' . ($mode === 'tools' ? 'docker-compose.tools.yml' : 'docker-compose.override.yml'));
        @mkdir(dirname($file), 0775, true);
        $yaml = ToolsComposeWriter::toYaml($blocks);
        if (@file_put_contents($file, $yaml) !== false) return $file;
        return null;
    }

    protected function ensureMysqlVars(EnvEditor $env): void
    {
        // Sincroniza MYSQL_* no /api/.env com base nos DB_* atuais
        $db  = $env->get('DB_DATABASE') ?? 'hero';
        $usr = $env->get('DB_USERNAME') ?? 'hero';
        $pwd = $env->get('DB_PASSWORD') ?? 'hero';
        $root = $env->get('DB_ROOT_PASSWORD') ?? 'root';

        // Apenas define se ausentes, para não sobrescrever decisão do usuário
        if ($env->get('MYSQL_DATABASE') === null)      $env->set('MYSQL_DATABASE', $db);
        if ($env->get('MYSQL_USER') === null)          $env->set('MYSQL_USER', $usr);
        if ($env->get('MYSQL_PASSWORD') === null)      $env->set('MYSQL_PASSWORD', $pwd);
        if ($env->get('MYSQL_ROOT_PASSWORD') === null) $env->set('MYSQL_ROOT_PASSWORD', $root);
    }

    public function handle(): int
    {
        $lazy = $this->option('eager') ? false : true;

        $include = $this->option('include') ? array_filter(array_map('trim', explode(',', (string)$this->option('include')))) : [];
        $all = (bool)$this->option('all');
        $noEnv = (bool)$this->option('no-env');
        $dry = (bool)$this->option('dry-run');
        $applyCompose = (bool)$this->option('compose');
        $noBackup = (bool)$this->option('no-backup');
        $mode = (string)$this->option('compose-file-mode') ?: 'override';

        $tools = $this->resolveTools($include, $all);
        if (empty($tools)) { $this->warn('Nothing to install. Use --include or --all.'); return self::SUCCESS; }

        $timestamp = date('Ymd-His');
        if (!$noBackup && !$dry) {
            $envBackup = $this->backupEnvToStorage($timestamp);
            if ($envBackup) $this->line('Backup (.env) created at: ' . $envBackup);
        }

        $composeBlocks = ['services'=>[], 'volumes'=>[], 'networks'=>[]];
        $envEditor = new EnvEditor();

        // Passo crítico: garantir MYSQL_* no /api/.env
        if (!$noEnv && !$dry) {
            $this->line('  • Syncing MYSQL_* with DB_* in /api/.env');
            $this->ensureMysqlVars($envEditor);
        }

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
            if ($applyCompose && !empty($def['compose']) && is_array($def['compose'])) {
                foreach (['services','volumes','networks'] as $k) {
                    if (!empty($def['compose'][$k]) && is_array($def['compose'][$k])) {
                        foreach ($def['compose'][$k] as $name => $v) { $composeBlocks[$k][$name] = $v; }
                    }
                }
            }
            $this->line(str_repeat('-', 40));
        }

        if (!$noEnv && !$dry) $envEditor->save();

        if ($applyCompose) {
            try {
                $editor = new ComposeEditor($this->pickComposePath());
                $base = $editor->getPath();
                $out = $this->writeAddonComposeBeside($base, $composeBlocks, $mode);
                if ($out) {
                    $this->info(($mode === 'tools' ? 'docker-compose.tools.yml' : 'docker-compose.override.yml') . ' written: ' . $out);
                    $this->line('Use: docker compose up -d');
                } else {
                    throw new \RuntimeException('Failed to write add-on compose beside base file.');
                }
            } catch (\Throwable $e) {
                $this->warn('Base compose not accessible from container (' . $e->getMessage() . ').');
                $out = $this->writeAddonComposeToStorage($composeBlocks, $mode);
                if ($out) {
                    $file = basename($out);
                    $this->line('Add-on compose written at: ' . $out);
                    $this->line('From HOST, publish with:');
                    $this->line('$ docker cp hero-api:/var/www/html/api/storage/hero/compose/' . $file . ' ./' . $file);
                    $this->line('Then run: docker compose up -d');
                } else {
                    $this->error('Failed to write add-on compose file to storage.');
                }
            }
        }

        if ($lazy) $this->comment('Lazy mode (default): .env e compose add-on prontos; rode composer/up quando quiser.');
        $this->info('Done.');
        return self::SUCCESS;
    }
}
