<?php

namespace App\Providers;

use App\Services\TMDBDataProvider;
use App\Services\TMDBDataSynchroniser;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class TMDBProvider extends ServiceProvider
{
    public const CLIENT_ALIAS = 'tmdb';

    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('tmdb_data_provider', function () {
            return new TMDBDataProvider(self::CLIENT_ALIAS);
        });

        $this->app->bind('tmdb_data_sync', function () {
            return new TMDBDataSynchroniser($this->app->make('tmdb_data_provider'));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Http::macro(self::CLIENT_ALIAS, function () {
            return Http::withHeaders([
                'Authorization' => sprintf('Bearer %s', config('services.tmdb.api_key')),
            ])->baseUrl(config('services.tmdb.base_uri'));
        });
    }
}
