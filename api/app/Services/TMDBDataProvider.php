<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TMDBDataProvider
{
    public const TIME_WINDOW_DAY = 'day';
    public const TIME_WINDOW_WEEK = 'week';

    public function __construct(private string $clientAlias){
    }

    public function getPopularMovies(string $timeWindow): array
    {
        $response = Http::{$this->clientAlias}()
            ->asJson()
            ->get(sprintf('/trending/all/%s', $timeWindow));

        return $response->json();
    }
}