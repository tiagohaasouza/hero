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
        $svc['env_file'] = ["./api/.env"];
        $svc['environment'] = [
            'MYSQL_DATABASE'      => '$${DB_DATABASE}',
            'MYSQL_USER'          => '$${DB_USERNAME}',
            'MYSQL_PASSWORD'      => '$${DB_PASSWORD}',
            'MYSQL_ROOT_PASSWORD' => '$${DB_ROOT_PASSWORD:-root}',
        ];
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
