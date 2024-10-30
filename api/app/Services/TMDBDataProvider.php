<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;

class TMDBDataProvider
{
    public const TIME_WINDOW_DAY = 'day';
    public const TIME_WINDOW_WEEK = 'week';

    public function __construct(private string $clientAlias) {}

    /**
     * Fetches popular movies from the TMDB API.
     * 
     * @param string  $timeWindow The time window to fetch popular movies for.
     * @param int     $page       The page number to fetch.
     * @param ?string $lang       The language to fetch the movies in.
     * 
     */
    public function getPopularMovies(
        string $timeWindow,
        int $page = 1,
        ?string $lang = null,
    ): array
    {
        if ($page < 1) {
            throw new \InvalidArgumentException('The page number must be greater than 0.');
        }

        $response = $this->getJsonClient()->get(
            sprintf('/trending/movie/%s', $timeWindow),
            [
                'language' => $lang ?? App::getLocale(),
                'page' => $page,
            ],
        );

        return $response->json();
    }

    /**
     * Fetches a movie from the TMDB API.
     * 
     * @param int     $movieId The ID of the movie to fetch.
     * @param ?string $lang    The language to fetch the movie in.
     */
    public function getMovie(int $movieId, ?string $lang = null): array
    {
        $response = $this->getJsonClient()->get(
            sprintf('/movie/%d', $movieId),
            ['language' => $lang ?? App::getLocale()],
        );

        return $response->json();
    }

    /**
     * Fetches genres from the TMDB API.
     * 
     * Genres are fetched for both movies and TV shows and then merged.
     * 
     * @param ?string $lang The language to fetch the genres in.
     */
    public function getGenres(?string $lang = null): array
    {
        $movieGenres = $this->getJsonClient()->get(
            '/genre/movie/list',
            ['language' => $lang ?? App::getLocale()],
        )->json() ?? [];

        $tvGenres = $this->getJsonClient()->get(
            '/genre/tv/list',
            ['language' => $lang ?? App::getLocale()],
        )->json() ?? [];

        $genres = array_merge($tvGenres['genres'], $movieGenres['genres']);
        $uniqueGenres = array_map(
            "unserialize",
            array_unique(array_map("serialize", $genres)),
        );

        return $uniqueGenres;
    }

    /**
     * Shorthand method to get the client with JSON headers.
     */
    private function getJsonClient(): PendingRequest
    {
        return Http::{$this->clientAlias}()->asJson();
    }
}