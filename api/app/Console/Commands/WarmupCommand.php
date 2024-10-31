<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SyncMoviesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:warmup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Warmup the API.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('[.] Warming up the API...');

        $this->info('[.] Cleaning up the database...');

        DB::table('genre_movie')->delete();
        DB::table('genres')->delete();
        DB::table('movies')->delete();

        $this->info('[OK] Database cleaned up successfully.');

        Artisan::call('app:tmdb:sync-genres');
        Artisan::call('app:tmdb:sync-movies');

        $this->info('[OK] API is now warmed up.');
    }
}
