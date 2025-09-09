<?php
return [
    // Optional: override compose path if artisan runs inside a container without access to project root
    'compose_path' => env('HERO_COMPOSE_PATH', null),

    'tools' => include __DIR__ . '/hero_tools.tools.php',
];
