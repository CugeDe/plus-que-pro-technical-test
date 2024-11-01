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
}