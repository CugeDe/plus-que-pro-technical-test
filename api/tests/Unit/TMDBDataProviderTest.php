<?php

namespace Tests\Unit;

use App\Providers\TMDBProvider;
use Tests\TestCase;

class TMDBDataProviderTest extends TestCase
{
    /**
     * Test that \App\Services\TMDBDataProvider::getPopularMovies() returns an array.
     */
    public function test_fetch_popular_movies(): void
    {
        $tmdbDataProvider = $this->app->make('tmdb');
        $popularMovies = $tmdbDataProvider->getPopularMovies(
            $tmdbDataProvider::TIME_WINDOW_DAY,
        );

        $this->assertIsArray($popularMovies);
    }
}
