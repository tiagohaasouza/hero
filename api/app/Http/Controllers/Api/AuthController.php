<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        $clientId = config('services.passport.password_client_id');
        $clientSecret = config('services.passport.password_client_secret');

        $tokenUrl = url('/oauth/token');

        $response = Http::asForm()->post($tokenUrl, [
            'grant_type' => 'password',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*',
        ]);

        if (!$response->ok()) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $data = $response->json();
        $user = Auth::attempt(['email' => $request->email, 'password' => $request->password])
            ? Auth::user()
            : null;

        return response()->json(['token' => $data, 'user' => $user]);
    }

    public function refresh(Request $request)
    {
        $request->validate(['refresh_token' => 'required']);
        $clientId = config('services.passport.password_client_id');
        $clientSecret = config('services.passport.password_client_secret');

        $tokenUrl = url('/oauth/token');

        $response = Http::asForm()->post($tokenUrl, [
            'grant_type' => 'refresh_token',
            'refresh_token' => $request->refresh_token,
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'scope' => '*',
        ]);

        if (!$response->ok()) {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        return response()->json($response->json());
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $token = $request->user()->token();
        if ($token) { $token->revoke(); }
        return response()->json(['ok' => true]);
    }
}
