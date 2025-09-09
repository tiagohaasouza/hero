<?php

namespace App\Http\Controllers\Hero;

use App\Http\Controllers\Controller;
use App\Hero\Tools\ToolUrlResolver;
use App\Hero\Tools\ToolStatus;

class ToolsController extends Controller
{
    public function index()
    {
        $tools = config('hero_tools.tools');
        $items = [];

        foreach ($tools as $key => $def) {
            $urls = ToolUrlResolver::url($key, $def);
            $item = [
                'key' => $key,
                'title' => $def['title'] ?? $key,
                'urls' => $urls,
                'badges' => array_keys($urls),
                'status' => 'unknown',
            ];

            if ($key === 'horizon') {
                $item['status'] = ToolStatus::horizonStatus();
            } else {
                $item['status'] = 'probe';
            }

            $items[] = $item;
        }

        return view('hero.tools', ['items' => $items]);
    }
}
