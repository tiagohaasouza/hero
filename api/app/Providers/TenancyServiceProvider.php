<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class TenancyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Configure integrações específicas via eventos do pacote conforme necessidade.
        // Mantemos minimalista para compatibilidade com v3.
    }
}
