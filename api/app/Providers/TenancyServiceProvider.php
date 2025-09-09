<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Stancl\Tenancy\Tenancy;
use Stancl\Tenancy\Database\Models\Tenant;

class TenancyServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        Tenancy::setTenantConfig(function (Tenant $tenant) {
            $config = [];
            if ($tenant->getAttribute('passport_public_key')) {
                $config['passport.public_key'] = $tenant->getAttribute('passport_public_key');
            }
            if ($tenant->getAttribute('passport_private_key')) {
                $config['passport.private_key'] = $tenant->getAttribute('passport_private_key');
            }
            return $config;
        });

        $this->app['router']->middlewareGroup('tenant', [
            InitializeTenancyByDomain::class,
            PreventAccessFromCentralDomains::class,
        ]);
    }
}
