<?php
return [
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
        'urls' => [
            'ui' => ['port' => 8025, 'env_port' => 'MAILHOG_UI_PORT', 'path' => '/', 'scheme' => 'http'],
        ],
        'compose' => [
            'services' => [
                'hero-mailhog' => [
                    'image' => 'mailhog/mailhog:latest',
                    'container_name' => 'hero-mailhog',
                    'restart' => 'unless-stopped',
                    'ports' => ['8025:8025','1025:1025'],
                    'networks' => ['hero_net']
                ]
            ]
        ]
    ],
    'redis-commander' => [
        'title' => 'Redis Commander (Redis UI)',
        'docker' => ['service' => 'hero-redis-commander'],
        'env' => [
            'REDIS_COMMANDER_USER' => '',
            'REDIS_COMMANDER_PASSWORD' => '',
            'REDIS_COMMANDER_PORT' => '8081'
        ],
        'urls' => [
            'ui' => ['port' => 8081, 'env_port' => 'REDIS_COMMANDER_PORT', 'path' => '/', 'scheme' => 'http'],
        ],
        'compose' => [
            'services' => [
                'hero-redis-commander' => [
                    'image' => 'rediscommander/redis-commander:latest',
                    'container_name' => 'hero-redis-commander',
                    'restart' => 'unless-stopped',
                    'environment' => ['REDIS_HOSTS=local:hero-redis:6379'],
                    'ports' => ['8081:8081'],
                    'networks' => ['hero_net']
                ]
            ]
        ]
    ],
    'adminer' => [
        'title' => 'Adminer (DB UI)',
        'docker' => ['service' => 'hero-adminer'],
        'env' => [
            'ADMINER_PORT' => '8080'
        ],
        'urls' => [
            'ui' => ['port' => 8080, 'env_port' => 'ADMINER_PORT', 'path' => '/', 'scheme' => 'http'],
        ],
        'compose' => [
            'services' => [
                'hero-adminer' => [
                    'image' => 'adminer:latest',
                    'container_name' => 'hero-adminer',
                    'restart' => 'unless-stopped',
                    'environment' => ['ADMINER_DEFAULT_SERVER=hero-db'],
                    'ports' => ['8080:8080'],
                    'depends_on' => ['hero-db'],
                    'networks' => ['hero_net']
                ]
            ]
        ]
    ],
    'meilisearch' => [
        'title' => 'Meilisearch (Scout driver)',
        'docker' => ['service' => 'hero-meili'],
        'env' => [
            'SCOUT_DRIVER' => 'meilisearch',
            'MEILISEARCH_HOST' => 'http://hero-meili:7700',
            'MEILISEARCH_KEY' => '',
            'MEILISEARCH_PORT' => '7700'
        ],
        'urls' => [
            'api' => ['port' => 7700, 'env_port' => 'MEILISEARCH_PORT', 'path' => '/', 'scheme' => 'http'],
        ],
        'laravel' => [
            'composer' => ['meilisearch/meilisearch-php:^1.8', 'laravel/scout:^10.0']
        ],
        'compose' => [
            'services' => [
                'hero-meili' => [
                    'image' => 'getmeili/meilisearch:v1.7',
                    'container_name' => 'hero-meili',
                    'restart' => 'unless-stopped',
                    'environment' => ['MEILI_NO_ANALYTICS=true'],
                    'ports' => ['7700:7700'],
                    'volumes' => ['meili_data:/meili_data'],
                    'networks' => ['hero_net']
                ]
            ],
            'volumes' => ['meili_data' => null]
        ]
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
            'AWS_ENDPOINT' => 'http://hero-minio:9000',
            'MINIO_API_PORT' => '9000',
            'MINIO_CONSOLE_PORT' => '9001'
        ],
        'urls' => [
            'console' => ['port' => 9001, 'env_port' => 'MINIO_CONSOLE_PORT', 'path' => '/', 'scheme' => 'http'],
            'api' => ['port' => 9000, 'env_port' => 'MINIO_API_PORT', 'path' => '/', 'scheme' => 'http'],
        ],
        'compose' => [
            'services' => [
                'hero-minio' => [
                    'image' => 'minio/minio:latest',
                    'container_name' => 'hero-minio',
                    'restart' => 'unless-stopped',
                    'command' => ['server','/data','--console-address',':9001'],
                    'environment' => ['MINIO_ROOT_USER=${MINIO_ROOT_USER:-minioadmin}','MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD:-minioadmin}'],
                    'ports' => ['9000:9000','9001:9001'],
                    'volumes' => ['minio_data:/data'],
                    'networks' => ['hero_net']
                ]
            ],
            'volumes' => ['minio_data' => null]
        ]
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
        'urls' => [
            'ui' => ['path' => '/horizon', 'scheme' => 'http', 'host' => null],
        ],
        'laravel' => [
            'composer' => ['laravel/horizon:^5.0']
        ]
    ],
    'phpmyadmin' => [
        'title' => 'phpMyAdmin (MySQL/MariaDB UI)',
        'docker' => ['service' => 'hero-phpmyadmin'],
        'env' => [
            'PHPMYADMIN_PORT' => '8082'
        ],
        'urls' => [
            'ui' => ['port' => 8082, 'env_port' => 'PHPMYADMIN_PORT', 'path' => '/', 'scheme' => 'http'],
        ],
        'compose' => [
            'services' => [
                'hero-phpmyadmin' => [
                    'image' => 'phpmyadmin:latest',
                    'container_name' => 'hero-phpmyadmin',
                    'restart' => 'unless-stopped',
                    'environment' => ['PMA_HOST=hero-db','PMA_PORT=3306'],
                    'ports' => ['8082:80'],
                    'depends_on' => ['hero-db'],
                    'networks' => ['hero_net']
                ]
            ]
        ]
    ],
];
