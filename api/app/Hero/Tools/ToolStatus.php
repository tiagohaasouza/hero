<?php

namespace App\Hero\Tools;

class ToolStatus
{
    public static function horizonStatus(): string
    {
        $status = 'idle';
        try {
            if (class_exists(\Laravel\Horizon\Horizon::class)) {
                if (method_exists(\Laravel\Horizon\Horizon::class, 'status')) {
                    $st = \Laravel\Horizon\Horizon::status();
                    if ($st === 'running') return 'online';
                    if ($st === 'paused') return 'paused';
                }
                $status = 'idle';
            } else {
                $status = 'offline';
            }
        } catch (\Throwable $e) {
            $status = 'idle';
        }
        return $status;
    }
}
