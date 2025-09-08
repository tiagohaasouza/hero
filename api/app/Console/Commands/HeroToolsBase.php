<?php
namespace App\Console\Commands;


use Illuminate\Console\Command;


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


    protected function updateEnv(array $pairs, bool $unset = false)
    {
        $envPath = base_path('.env');
        if (!file_exists($envPath)) return false;
        $contents = file_get_contents($envPath);
        foreach ($pairs as $k => $v) {
            $pattern = "/^".preg_quote($k,'/')."=.*/m";
            if ($unset) {
                $contents = preg_replace($pattern, '', $contents);
            } else {
                $line = $k.'='.($v === '' ? '' : $v);
                if (preg_match($pattern, $contents)) $contents = preg_replace($pattern, $line, $contents);
                else $contents .= "\n".$line;
            }
        }
        $contents = preg_replace("/\n{3,}/","\n\n",$contents);
        file_put_contents($envPath, trim($contents)."\n");
        return true;
    }


    protected function printDockerHints(string $service, bool $up)
    {
        $cmd = $up ? "docker compose up -d $service" : "docker compose stop $service";
        $this->line("→ Run: $cmd");
    }
}
