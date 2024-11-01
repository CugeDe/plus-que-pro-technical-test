<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RefreshController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:authenticated-api')->group(function () {
    Route::post('/refresh-database', [RefreshController::class, 'refreshData']);
}); 
