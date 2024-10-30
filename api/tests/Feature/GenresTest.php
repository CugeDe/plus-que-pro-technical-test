<?php

namespace Tests\Feature;

use Tests\TestCase;

class GenresTest extends TestCase
{
    /**
     * Ensure the API returns the genres.
     */
    public function test_the_api_returns_the_genres(): void
    {
        $response = $this->get('/api/genres', [
            'Accept' => 'application/ld+json',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'hydra:member' => [
                '*' => [
                    'id',
                    '@id',
                    'name',
                ],
            ],
        ]);
    }
}
