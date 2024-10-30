<?php

namespace App\Services;

use App\Models\Genre;
use App\Models\Movie;

const ONE_SEC = 1_000_000; // usec

class TMDBDataSynchroniser
{
    public function __construct(private TMDBDataProvider $dataProvider) {}

    private function syncPopularMovie(array $movie)
    {
        $releaseDate = strlen($movie['release_date'] ?? '') > 0
            ? $movie['release_date']
            : null;

        $genres = $movie['genre_ids'] ?? [];
        unset($movie['genre_ids']); // It is a pivot table field.

        $movie = Movie::updateOrCreate(
            ['id' => $movie['id']],
            [
                ...$movie, // Eloquent will only fill the fields that are fillable.
                'release_date' => $releaseDate,
            ]
        );

        $movie->genres()->sync($genres);
    }

    /**
     * Synchronises popular movies from the TMDB API.
     * 
     * @param string $timeWindow The time window to fetch popular movies for.
     * @param int    $limit      The number of pages to fetch (-1 to fetch all pages).
     * @param ?string $lang      The language to fetch the movies in.
     */
    public function syncPopularMovies(
        string $timeWindow,
        int $limit = -1,
        ?string $lang = null,
    ): void
    {        
        if ($limit === 0) {
            throw new \InvalidArgumentException('The limit must be greater than 0 or -1 (to fetch all pages).');
        }

        $page = 1;
        $response = null;

        do {
            // As said in https://developer.themoviedb.org/docs/rate-limiting,
            // the API has a rate limit of around 50 requests every second.
            // We'll sleep for 1/10 second between each page fetch to stay in
            // the safe zone.
            if ($page > 0) {
                usleep(ONE_SEC / 10);
            }

            $response = $this->dataProvider->getPopularMovies($timeWindow, $page, $lang);
            foreach ($response['results'] as $movie) {
                $this->syncPopularMovie($movie);
            }

            $page += 1;
        }
        while (
            ($limit === -1 || $page < $limit)
            && $page < $response['total_pages']
        );
    }

    /**
     * Synchronises genres from the TMDB API.
     * 
     * @param ?string $lang The language to fetch the genres in.
     */
    public function syncGenres(?string $lang = null): void
    {
        $genres = $this->dataProvider->getGenres($lang);

        foreach ($genres as $genre) {
            Genre::updateOrCreate(
                ['id' => $genre['id']],
                ['name' => $genre['name']],
            );
        }
    }
}