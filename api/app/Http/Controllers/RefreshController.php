<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class RefreshController extends Controller
{
    public function refreshData(Request $request)
    {
        dispatch(function () {
            Artisan::call('app:warmup');
        });

        return response()->json([
            'message' => 'Data refresh started successfully.'
        ], 202);
    }
}