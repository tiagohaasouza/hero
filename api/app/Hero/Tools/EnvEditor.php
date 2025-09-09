<?php

namespace App\Hero\Tools;

class EnvEditor
{
    protected string $path;
    protected string $contents;

    public function __construct(?string $path = null)
    {
        $this->path = $path ?: base_path('.env');
        if (!file_exists($this->path)) {
            throw new \RuntimeException(".env file not found at {$this->path}");
        }
        $this->contents = (string) file_get_contents($this->path);
    }

    public function get(string $key, $default = null): ?string
    {
        if (preg_match("/^" . preg_quote($key, "/") . "=(.*)$/m", $this->contents, $m)) {
            return trim($m[1], "\"'");
        }
        return $default;
    }

    public function set(string $key, string $value): self
    {
        $pattern = "/^" . preg_quote($key, "/") . "=.*$/m";
        $line = $key . '=' . $value;
        if (preg_match($pattern, $this->contents)) {
            $this->contents = (string) preg_replace($pattern, $line, $this->contents);
        } else {
            $this->contents = rtrim($this->contents) . "\n" . $line . "\n";
        }
        return $this;
    }

    public function remove(string $key): self
    {
        $pattern = "/^" . preg_quote($key, "/") . "=.*$/m";
        $this->contents = (string) preg_replace($pattern, '', $this->contents);
        $this->contents = (string) preg_replace("/\n{3,}/", "\n\n", $this->contents);
        return $this;
    }

    public function all(): array
    {
        $vars = [];
        foreach (preg_split("/\r?\n/", $this->contents) as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) continue;
            [$k, $v] = array_pad(explode('=', $line, 2), 2, null);
            $vars[trim((string)$k)] = $v === null ? null : trim((string)$v, "\"'");
        }
        return $vars;
    }

    public function save(): bool
    {
        return file_put_contents($this->path, trim($this->contents) . "\n") !== false;
    }
}
