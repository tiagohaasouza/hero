<?php

namespace App\Hero\Tools;

class HeroToolsBase
{
    protected function applyEnv(array $pairs, bool $unset = false, bool $dry = false): array
    {
        $editor = new EnvEditor();
        $changes = [];

        foreach ($pairs as $key => $value) {
            $key = trim((string)$key);
            if ($key === '') continue;

            if ($unset) {
                $old = $editor->get($key);
                if ($old !== null) {
                    $editor->remove($key);
                    $changes[] = ['key' => $key, 'old' => $old, 'new' => null, 'action' => 'unset'];
                }
                continue;
            }

            $old = $editor->get($key);
            $val = is_scalar($value) || $value === null ? $value : json_encode($value);
            if ($old !== $val) {
                $editor->set($key, $val);
                $changes[] = ['key' => $key, 'old' => $old, 'new' => $val, 'action' => $old === null ? 'add' : 'update'];
            }
        }

        if (!$dry && !empty($changes)) {
            $editor->save();
        }

        return $changes;
    }
}
