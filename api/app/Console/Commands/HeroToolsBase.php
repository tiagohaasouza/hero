<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Hero\Tools\EnvEditor;

abstract class HeroToolsBase extends Command
{
    protected function toolsConfig(): array
    {
        return config('hero_tools.tools', []);
    }

    protected function resolveTools(array $include, bool $all): array
    {
        $tools = $this->toolsConfig();
        if ($all) return $tools;
        $selected = [];
        foreach ($include as $key) {
            if (isset($tools[$key])) $selected[$key] = $tools[$key];
            else $this->warn("Tool '$key' not found in config/hero_tools.php");
        }
        return $selected;
    }

    protected function applyEnv(array $pairs, bool $unset = false, bool $dry = false): void
    {
        if (empty($pairs)) return;
        if ($dry) {
            if ($unset) {
                $rows = array_map(fn($k) => [$k], array_keys($pairs));
                $this->table(['Remove key'], $rows);
            } else {
                $rows = [];
                foreach ($pairs as $k => $v) $rows[] = [$k, $v];
                $this->table(['Key', 'Value'], $rows);
            }
            return;
        }
        $editor = new EnvEditor();
        if ($unset) {
            foreach (array_keys($pairs) as $k) $editor->remove($k);
        } else {
            foreach ($pairs as $k => $v) $editor->set($k, (string) $v);
        }
        $editor->save();
    }

    protected function printDockerHints(string $service, bool $up): void
    {
        $cmd = $up ? "docker compose up -d $service" : "docker compose stop $service";
        $this->line("→ Run: $cmd");
    }
}
