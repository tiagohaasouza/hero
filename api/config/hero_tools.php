<?php
return [
    'tools' => [
        'mailhog' => [
            'title' => 'Mailhog (SMTP dev inbox)',
            'docker' => ['service' => 'hero-mailhog'],
            'env' => [
                'MAIL_MAILER' => 'smtp',
                'MAIL_HOST' => 'hero-mailhog',
                'MAIL_PORT' => '1025',
                'MAIL_USERNAME' => 'null',
                'MAIL_PASSWORD' => 'null',
                'MAIL_ENCRYPTION' => 'null'
            ],
        ],
        'redis-commander' => [
            'title' => 'Redis Commander (Redis UI)',
            'docker' => ['service' => 'hero-redis-commander'],
            'env' => [
                'REDIS_COMMANDER_USER' => '',
                'REDIS_COMMANDER_PASSWORD' => ''
            ],
        ],
        'adminer' => [
            'title' => 'Adminer (DB UI)',
            'docker' => ['service' => 'hero-adminer'],
            'env' => [],
        ],
        'meilisearch' => [
            'title' => 'Meilisearch (Scout driver)',
            'docker' => ['service' => 'hero-meili'],
            'env' => [
                'SCOUT_DRIVER' => 'meilisearch',
                'MEILISEARCH_HOST' => 'http://hero-meili:7700',
                'MEILISEARCH_KEY' => ''
            ],
            'laravel' => [
                'composer' => ['meilisearch/meilisearch-php:^1.8', 'laravel/scout:^10.0']
            ],
        ],
        'minio' => [
            'title' => 'MinIO (S3 local)',
            'docker' => ['service' => 'hero-minio'],
            'env' => [
                'FILESYSTEM_DISK' => 'local',
                'AWS_ACCESS_KEY_ID' => 'minioadmin',
                'AWS_SECRET_ACCESS_KEY' => 'minioadmin',
                'AWS_DEFAULT_REGION' => 'us-east-1',
                'AWS_BUCKET' => 'hero',
                'AWS_USE_PATH_STYLE_ENDPOINT' => 'true',
                'AWS_ENDPOINT' => 'http://hero-minio:9000'
            ],
        ],
        'horizon' => [
            'title' => 'Laravel Horizon (Redis queues UI)',
            'docker' => [],
            'env' => [
                'QUEUE_CONNECTION' => 'redis',
                'CACHE_DRIVER' => 'redis',
                'CACHE_STORE' => 'redis',
                'SESSION_DRIVER' => 'redis'
            ],
            'laravel' => [
                'composer' => ['laravel/horizon:^5.0']
            ],
        ]
    ]
];
