<?php

namespace App\Console\Commands;

use App\Services\TMDBDataSynchroniser;
use Illuminate\Console\Command;

class SyncGenresCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'app:tmdb:sync-genres';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync genres from the TMDB API.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('[.] Syncing genres from the TMDB API...');

        try {
            /** @var TMDBDataSynchroniser $synchroniser */
            $synchroniser = app()->make('tmdb_data_sync');

            $synchroniser->syncGenres();
        } catch (\Exception $e) {
            $this->error(sprintf('[KO] Failed to sync. genres: %s', $e->getMessage()));

            return;
        }

        $this->info('[OK] Genres synced successfully.');
    }
}
