<?php

namespace App\Console\Commands;

use App\Providers\TMDBProvider;
use App\Services\TMDBDataProvider;
use App\Services\TMDBDataSynchroniser;
use Illuminate\Console\Command;

class SyncMoviesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:tmdb:sync-movies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync movies from the TMDB API.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('[.] Syncing movies from the TMDB API... (it may take a while depending on the amount of data)');

        try {
            /** @var TMDBDataSynchroniser $synchroniser */
            $synchroniser = app()->make('tmdb_data_sync');

            $synchroniser->syncPopularMovies(TMDBDataProvider::TIME_WINDOW_DAY);
        } catch (\Exception $e) {
            $this->error(sprintf('[KO] Failed to sync. movies: %s', $e->getMessage()));

            return;
        }

        $this->info('[OK] Movies synced successfully.');
    }
}
