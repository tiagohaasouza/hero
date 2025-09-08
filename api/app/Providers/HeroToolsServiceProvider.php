<?php
namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use App\Console\Commands\HeroToolsInstall;
use App\Console\Commands\HeroToolsUninstall;
use App\Console\Commands\HeroToolsList;


class HeroToolsServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../../config/hero_tools.php', 'hero_tools');
    }


    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                HeroToolsInstall::class,
                HeroToolsUninstall::class,
                HeroToolsList::class,
            ]);
            $this->publishes([
                __DIR__.'/../../config/hero_tools.php' => config_path('hero_tools.php')
            ], 'hero-tools-config');
        }
    }
}
