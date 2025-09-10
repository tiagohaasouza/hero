<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->registerPolicies();

        if (class_exists(Passport::class)) {
            $access = (int) (config('auth.tokens_expire_in', 60));
            $refresh = (int) (config('auth.refresh_tokens_expire_in', 15));
            if ($access > 0) Passport::tokensExpireIn(now()->addMinutes($access));
            if ($refresh > 0) Passport::refreshTokensExpireIn(now()->addDays($refresh));
            // Passport::hashClientSecrets(); // opcional
        }
    }
}
