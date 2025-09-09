<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
        Passport::tokensExpireIn(now()->addMinutes((int) config('auth.tokens_expire_in', 60)));
        Passport::refreshTokensExpireIn(now()->addDays((int) config('auth.refresh_tokens_expire_in', 15)));
        Passport::tokensCan([
            'admin' => 'Admin access',
            'users.read' => 'Read users',
            'users.write' => 'Write users',
        ]);
    }
}
