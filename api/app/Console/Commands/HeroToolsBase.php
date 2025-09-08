<?php
namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Hero\Tools\EnvEditor;


abstract class HeroToolsBase extends Command
{
    protected function toolsConfig()
    {
        return config('hero_tools.tools', []);
    }


    protected function resolveTools(array $include, bool $all)
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


    protected function applyEnv(array $pairs, bool $unset = false, bool $dry = false)
    {
        if (empty($pairs)) return;
        if ($dry) {
            if ($unset) $this->table(['Remove key'], collect(array_keys($pairs))->map(fn($k)=>[$k])->all());
            else $this->table(['Key','Value'], collect($pairs)->map(fn($v,$k)=>[$k,$v])->all());
            return;
        }
        $editor = new EnvEditor();
        if ($unset) {
            foreach (array_keys($pairs) as $k) $editor->remove($k);
        } else {
            foreach ($pairs as $k=>$v) $editor->set($k, $v);
        }
        $editor->save();
    }


    protected function printDockerHints(string $service, bool $up)
    {
        $cmd = $up ? "docker compose up -d $service" : "docker compose stop $service";
        $this->line("→ Run: $cmd");
    }
}
