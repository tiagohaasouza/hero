<?php

return [
    'tools' => [
        'reverb' => [
            'title' => 'Laravel Reverb (WebSockets)',
            'env' => [
                'BROADCAST_CONNECTION' => 'reverb',
                'REVERB_APP_ID'       => 'hero-app',
                'REVERB_APP_KEY'      => 'local-key',
                'REVERB_APP_SECRET'   => 'local-secret',
                'REVERB_SERVER_HOST'  => '0.0.0.0',
                'REVERB_SERVER_PORT'  => '8080',
                'REVERB_HOST'         => 'localhost',
                'REVERB_PORT'         => '8080',
                'REVERB_SCHEME'       => 'http',
                'VITE_REVERB_APP_KEY' => '${REVERB_APP_KEY}',
                'VITE_REVERB_HOST'    => '${REVERB_HOST}',
                'VITE_REVERB_PORT'    => '${REVERB_PORT}',
                'VITE_REVERB_SCHEME'  => '${REVERB_SCHEME}',
            ],
            'urls' => [
                'ws' => [
                    'scheme' => 'ws',
                    'host' => null,
                    'port' => 8080,
                    'env_port' => 'REVERB_SERVER_PORT',
                    'path' => '/',
                ],
            ],
            'compose' => [
                'services' => [
                    'hero-reverb' => [
                        'image' => 'php:8.3-fpm',
                        'container_name' => 'hero-reverb',
                        'restart' => 'unless-stopped',
                        'working_dir' => '/var/www/html/api',
                        'env_file' => ['./api/.env'],
                        'volumes' => ['./api:/var/www/html/api','./docker/entrypoints:/docker/entrypoints:ro'],
                        'depends_on' => ['hero-api'],
                        'entrypoint' => ['/bin/sh','/docker/entrypoints/reverb-entrypoint.sh'],
                        'networks' => ['hero_net'],
                        'ports' => ['8080:8080'],
                    ],
                ],
            ],
            'composer' => [
                'laravel/reverb:^1.0'
            ],
        ],
    ],
];
