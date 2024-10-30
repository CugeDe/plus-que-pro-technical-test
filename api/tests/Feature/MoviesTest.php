<?php

namespace Tests\Feature;

use Tests\TestCase;

class MoviesTest extends TestCase
{
    /**
     * Ensure the API returns the movies.
     */
    public function test_the_api_returns_the_movies(): void
    {
        $response = $this->get('/api/movies', [
            'Accept' => 'application/ld+json',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'hydra:member' => [
                '*' => [
                    'id',
                    '@id',
                    'title',
                    'originalTitle',
                    'overview',
                    'posterPath',
                    'mediaType',
                    'adult',
                    'originalLanguage',
                    'popularity',
                    'voteAverage',
                    'voteCount', 
                    'releaseDate',
                    'genres',
                ],
            ],
        ]);
    }
}
