<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Refresh the movies and genres every day at 2:00 AM
Schedule::call(function () {
    DB::table('genre_movie')->delete();
    DB::table('genres')->delete();
    DB::table('movies')->delete();

    Artisan::call('app:tmdb:sync-genres');
    Artisan::call('app:tmdb:sync-movies');
})->dailyAt('02:00');
