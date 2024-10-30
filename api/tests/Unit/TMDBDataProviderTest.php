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
        $tmdbDataProvider = $this->app->make('tmdb_data_provider');
        $popularMoviesP1 = $tmdbDataProvider->getPopularMovies(
            $tmdbDataProvider::TIME_WINDOW_DAY,
            1,
        );
        $this->assertIsArray($popularMoviesP1);

        // Sleep for 1 second to avoid rate limiting
        sleep(1);

        $popularMoviesP2 = $tmdbDataProvider->getPopularMovies(
            $tmdbDataProvider::TIME_WINDOW_DAY,
            2,
        );
        $this->assertIsArray($popularMoviesP2);

        $this->assertNotEquals($popularMoviesP1, $popularMoviesP2);
    }

    /**
     * Test that \App\Services\TMDBDataProvider::getMovie() returns an array.
     */
    public function test_fetch_movie(): void
    {
        $tmdbDataProvider = $this->app->make('tmdb_data_provider');
        $movie = $tmdbDataProvider->getMovie(1);

        $this->assertIsArray($movie);
    }

    /**
     * Test that \App\Services\TMDBDataProvider::getGenres() returns an array.
     */
    public function test_fetch_genres(): void
    {
        $tmdbDataProvider = $this->app->make('tmdb_data_provider');
        $genres = $tmdbDataProvider->getGenres();

        $this->assertIsArray($genres);
    }
}
