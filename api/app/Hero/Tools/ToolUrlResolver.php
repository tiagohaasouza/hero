<?php

namespace App\Hero\Tools;

class ToolUrlResolver
{
    public static function baseHost(): string
    {
        $appUrl = config('app.url') ?: env('APP_URL', 'http://localhost');
        $parts = parse_url($appUrl);
        $scheme = $parts['scheme'] ?? 'http';
        $host = $parts['host'] ?? 'localhost';
        return $scheme . '://' . $host;
    }

    public static function url(string $key, array $def): array
    {
        $built = [];
        foreach ($def['urls'] ?? [] as $name => $u) {
            $scheme = $u['scheme'] ?? 'http';

            $port = null;
            if (!empty($u['env_port']) && is_string($u['env_port'])) {
                $port = env($u['env_port'], $u['port'] ?? null);
            } else {
                $port = $u['port'] ?? null;
            }

            $host = $u['host'] ?? self::baseHost();
            $hostNoScheme = preg_replace('#^https?://#', '', rtrim((string)$host, '/'));

            $url = $scheme . '://' . $hostNoScheme;

            $existingPort = parse_url($url, PHP_URL_PORT);
            if ($port && !$existingPort) $url .= ':' . $port;

            $path = $u['path'] ?? '/';
            $url = rtrim($url, '/') . '/' . ltrim((string)$path, '/');
            $built[$name] = $url;
        }
        return $built;
    }

    public static function all(): array
    {
        $tools = config('hero_tools.tools', []);
        $out = [];
        foreach ($tools as $key => $def) {
            $out[$key] = [
                'title' => $def['title'] ?? $key,
                'urls' => self::url($key, $def),
            ];
        }
        return $out;
    }
}
