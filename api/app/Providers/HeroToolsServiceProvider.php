<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Console\Commands\HeroToolsInstall;
use App\Console\Commands\HeroToolsUninstall;
use App\Console\Commands\HeroToolsList;
use App\Console\Commands\HeroToolsCompose;

class HeroToolsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(base_path('config/hero_tools.php'), 'hero_tools');
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                HeroToolsInstall::class,
                HeroToolsUninstall::class,
                HeroToolsList::class,
                HeroToolsCompose::class,
            ]);

            $this->publishes([
                base_path('config/hero_tools.php') => config_path('hero_tools.php')
            ], 'hero-tools-config');
        }

        $routesPath = base_path('routes/tools.php');
        if (file_exists($routesPath)) {
            $this->loadRoutesFrom($routesPath);
        }
    }
}
