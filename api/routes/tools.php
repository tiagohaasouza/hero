<?php

use Illuminate\Support\Facades\Route;
use App\Hero\Tools\ToolUrlResolver;

Route::prefix('tools')->group(function () {
    Route::get('/', function () {
        if (request()->wantsJson()) {
            return response()->json(ToolUrlResolver::all());
        }
        return view('tools.index', ['tools' => ToolUrlResolver::all()]);
    });

    Route::get('/json', function () {
        return response()->json(ToolUrlResolver::all());
    });

    Route::get('/{key}', function (string $key) {
        $tools = config('hero_tools.tools', []);
        abort_unless(isset($tools[$key]), 404);
        $urls = ToolUrlResolver::url($key, $tools[$key]);
        if (request()->wantsJson()) {
            return response()->json([ 'key' => $key, 'title' => $tools[$key]['title'] ?? $key, 'urls' => $urls ]);
        }
        return view('tools.show', ['key'=>$key, 'title'=>$tools[$key]['title'] ?? $key, 'urls'=>$urls ]);
    });
});
