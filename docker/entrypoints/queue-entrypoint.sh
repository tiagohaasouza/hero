#!/bin/sh
cd /var/www/html/api
exec php artisan queue:work --sleep=1 --tries=1 --verbose
