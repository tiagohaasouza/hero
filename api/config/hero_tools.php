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
                'REDIS_COMMANDER_PASSWORD' => ''
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
            'env' => [],
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
                'MEILISEARCH_KEY' => ''
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
                'AWS_ENDPOINT' => 'http://hero-minio:9000'
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
            'laravel' => [
                'composer' => ['laravel/horizon:^5.0']
            ]
        ]
    ]
];
