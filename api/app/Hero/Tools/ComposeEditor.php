<?php

namespace App\Hero\Tools;

use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Exception\ParseException;

class ComposeEditor
{
    protected string $path;
    protected array $yaml = [];

    public function __construct(?string $path = null)
    {
        $this->path = $path ?: base_path('docker-compose.yml');
        if (!file_exists($this->path)) {
            throw new \RuntimeException("docker-compose.yml not found at {$this->path}");
        }
        $this->yaml = $this->read();
    }

    public function read(): array
    {
        try {
            $data = Yaml::parseFile($this->path);
            return is_array($data) ? $data : [];
        } catch (ParseException $e) {
            throw new \RuntimeException('Invalid YAML: ' . $e->getMessage());
        }
    }

    public function backup(?string $suffix = null): string
    {
        $suffix = $suffix ?: date('Ymd-His');
        $backup = $this->path . '.bak.' . $suffix;
        if (!@copy($this->path, $backup)) {
            throw new \RuntimeException('Failed to create compose backup.');
        }
        return $backup;
    }

    public function save(): void
    {
        $contents = Yaml::dump($this->yaml, 8, 2, Yaml::DUMP_MULTI_LINE_LITERAL_BLOCK);
        file_put_contents($this->path, $contents);
    }

    protected function ensureKeys(): void
    {
        if (!isset($this->yaml['version'])) $this->yaml['version'] = '3.9';
        foreach (['services', 'volumes', 'networks'] as $k) {
            if (!isset($this->yaml[$k]) || !is_array($this->yaml[$k])) $this->yaml[$k] = [];
        }
    }

    /**
     * @param array $blocks keys: services/volumes/networks
     * @param bool $remove remove instead of add/update
     * @return array summary
     */
    public function apply(array $blocks, bool $remove = false): array
    {
        $this->ensureKeys();
        $summary = [
            'services' => ['added' => [], 'updated' => [], 'removed' => [], 'skipped' => []],
            'volumes'  => ['added' => [], 'removed' => [], 'skipped' => []],
            'networks' => ['added' => [], 'removed' => [], 'skipped' => []],
        ];

        // Services
        if (!empty($blocks['services']) && is_array($blocks['services'])) {
            foreach ($blocks['services'] as $name => $def) {
                if ($remove) {
                    if (array_key_exists($name, $this->yaml['services'])) {
                        unset($this->yaml['services'][$name]);
                        $summary['services']['removed'][] = $name;
                    } else {
                        $summary['services']['skipped'][] = $name;
                    }
                    continue;
                }
                if (!array_key_exists($name, $this->yaml['services'])) {
                    $this->yaml['services'][$name] = $def;
                    $summary['services']['added'][] = $name;
                    continue;
                }
                $this->yaml['services'][$name] = $this->deepMergeService($this->yaml['services'][$name], $def);
                $summary['services']['updated'][] = $name;
            }
        }

        // Volumes
        if (!empty($blocks['volumes']) && is_array($blocks['volumes'])) {
            foreach ($blocks['volumes'] as $v => $vdef) {
                if ($remove) {
                    if (array_key_exists($v, $this->yaml['volumes'])) {
                        unset($this->yaml['volumes'][$v]); 
                        $summary['volumes']['removed'][] = $v;
                    } else {
                        $summary['volumes']['skipped'][] = $v;
                    }
                } else {
                    if (!array_key_exists($v, $this->yaml['volumes'])) {
                        $this->yaml['volumes'][$v] = $vdef;
                        $summary['volumes']['added'][] = $v;
                    } else {
                        $summary['volumes']['skipped'][] = $v;
                    }
                }
            }
        }

        // Networks
        if (!empty($blocks['networks']) && is_array($blocks['networks'])) {
            foreach ($blocks['networks'] as $n => $ndef) {
                if ($remove) {
                    if (array_key_exists($n, $this->yaml['networks'])) {
                        unset($this->yaml['networks'][$n]); 
                        $summary['networks']['removed'][] = $n;
                    } else {
                        $summary['networks']['skipped'][] = $n;
                    }
                } else {
                    if (!array_key_exists($n, $this->yaml['networks'])) {
                        $this->yaml['networks'][$n] = $ndef;
                        $summary['networks']['added'][] = $n;
                    } else {
                        $summary['networks']['skipped'][] = $n;
                    }
                }
            }
        }
        return $summary;
    }

    protected function deepMergeService(array $base, array $add): array
    {
        foreach ($add as $k => $v) {
            if (!array_key_exists($k, $base)) { 
                $base[$k] = $v; 
                continue; 
            }
            if (in_array($k, ['environment', 'env_file'], true)) {
                $base[$k] = $this->mergeEnv($base[$k], $v);
            } elseif (in_array($k, ['volumes', 'ports', 'depends_on', 'networks'], true)) {
                $base[$k] = $this->mergeList($base[$k], $v);
            } elseif (is_array($v) && is_array($base[$k])) {
                $base[$k] = $this->deepMergeService($base[$k], $v);
            } else {
                $base[$k] = $v; // override scalars
            }
        }
        return $base;
    }

    protected function mergeList($a, $b): array
    {
        $a = is_array($a) ? $a : [$a];
        $b = is_array($b) ? $b : [$b];
        $out = $a;
        foreach ($b as $item) {
            if (!in_array($item, $out, true)) $out[] = $item;
        }
        return $out;
    }

    protected function mergeEnv($a, $b)
    {
        $toAssoc = function ($env) {
            $assoc = [];
            if (is_array($env)) {
                foreach ($env as $k => $v) {
                    if (is_int($k)) {
                        if (strpos((string)$v, '=') !== false) { 
                            [$ek, $ev] = explode('=', (string)$v, 2); 
                            $assoc[$ek] = $ev; 
                        } else { 
                            $assoc[(string)$v] = ''; 
                        }
                    } else { 
                        $assoc[(string)$k] = (string)$v; 
                    }
                }
            }
            return $assoc;
        };
        $a1 = $toAssoc($a); 
        $b1 = $toAssoc($b);
        $merged = array_merge($a1, $b1);
        $out = [];
        foreach ($merged as $k => $v) { 
            $out[] = $k . '=' . $v; 
        }
        return $out;
    }
}
