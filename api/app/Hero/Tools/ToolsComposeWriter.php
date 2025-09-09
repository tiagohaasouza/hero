<?php

namespace App\Hero\Tools;

use Symfony\Component\Yaml\Yaml;

class ToolsComposeWriter
{
    public static function buildComposeArray(array $blocks): array
    {
        $out = [
            'version' => '3.9',
        ];
        foreach (['services','volumes','networks'] as $k) {
            if (!empty($blocks[$k]) && is_array($blocks[$k])) {
                $out[$k] = $blocks[$k];
            }
        }
        return $out;
    }

    public static function toYaml(array $blocks): string
    {
        $arr = self::buildComposeArray($blocks);
        return Yaml::dump($arr, 8, 2, Yaml::DUMP_MULTI_LINE_LITERAL_BLOCK);
    }
}
