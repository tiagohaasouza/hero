<?php

namespace App\Hero\Tools;

use Symfony\Component\Yaml\Yaml;

class ToolsComposeWriter
{
    protected static function ensureHeroDb(array $blocks): array
    {
        $services = $blocks['services'] ?? [];
        if (!isset($services['hero-db'])) {
            $services['hero-db'] = [];
        }
        $svc = $services['hero-db'];
        // MariaDB lê MYSQL_* no boot; eles virão do env_file (/api/.env) que sincronizaremos no install
        $svc['env_file'] = ["./api/.env"];
        // Removemos o mapeamento environment para evitar valores literais como '${DB_USERNAME}'
        $services['hero-db'] = $svc;
        $blocks['services'] = $services;
        return $blocks;
    }

    public static function buildComposeArray(array $blocks): array
    {
        $out = [];
        foreach (['services','volumes','networks'] as $k) {
            if (!empty($blocks[$k]) && is_array($blocks[$k])) {
                $out[$k] = $blocks[$k];
            }
        }
        $out = self::ensureHeroDb($out);
        return $out;
    }

    public static function toYaml(array $blocks): string
    {
        $arr = self::buildComposeArray($blocks);
        // NÃO inclui 'version' (deprecated)
        return Yaml::dump($arr, 8, 2, Yaml::DUMP_MULTI_LINE_LITERAL_BLOCK);
    }
}
