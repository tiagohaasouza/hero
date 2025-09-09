<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('tenant.{tenantId}.notifications', function ($user, $tenantId) {
    return (string) $user->tenant_id === (string) $tenantId;
});

Broadcast::channel('presence-editing.{type}.{id}', function ($user, $type, $id) {
    return ['id' => $user->id, 'name' => $user->name];
});
