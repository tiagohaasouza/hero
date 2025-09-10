<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

class Kernel extends HttpKernel
{
    /**
     * The application's route middleware aliases.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        // Laravel padrão ... (mantenha os seus existentes)
        'initializeTenancyByDomain' => InitializeTenancyByDomain::class,
        'preventAccessFromCentralDomains' => PreventAccessFromCentralDomains::class,
    ];
}
