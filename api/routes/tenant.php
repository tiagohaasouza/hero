<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['tenant', 'auth:api'])->group(function () {
    Route::get('/tenant/ping', fn() => response()->json(['ok' => true, 'tenant' => tenant('id')]));
});
