<?php

use Illuminate\Support\Facades\Route;

Route::get('/tenant/ping', function () {
    return response()->json([
        'ok' => true,
        'tenant' => tenant('id'),
        'time' => now()->toDateTimeString(),
    ]);
})->name('tenant.ping');
