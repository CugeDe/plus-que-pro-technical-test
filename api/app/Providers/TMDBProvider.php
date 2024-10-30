<?php

namespace App\Providers;

use App\Services\TMDBDataProvider;
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
        $this->app->bind('tmdb', function () {
            return new TMDBDataProvider(self::CLIENT_ALIAS);
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
