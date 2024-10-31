<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'passwordConfirmation' => 'required|same:password',
            'terms' => 'required'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        $response = [
            'success' => true,
            'message' => "Registration successful."
        ];
        return response()->json($response, 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
            ], Response::HTTP_OK);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials.',
        ], Response::HTTP_UNAUTHORIZED);
    }
}