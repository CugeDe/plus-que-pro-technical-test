<?php

namespace App\Models;

use ApiPlatform\Laravel\Eloquent\Filter\OrderFilter;
use ApiPlatform\Laravel\Eloquent\Filter\PartialSearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\QueryParameter;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[ApiResource(
    normalizationContext: [
        'skip_null_values' => false,
    ],
    operations: [
        new GetCollection(),
        new Get(),
        new Patch(middleware: 'auth:authenticated-api'),
        new Delete(middleware: 'auth:authenticated-api'),
    ],
    rules: [
        'title' => 'required|min:3',
    ]
)]
#[QueryParameter(key: 'sort[:property]', filter: OrderFilter::class)]
#[QueryParameter(key: 'filter[title]', filter: PartialSearchFilter::class, property: 'title')]
class Movie extends Model
{
    public $fillable = [
        'id',
        'adult',
        'backdrop_path',
        'media_type',
        'original_language',
        'original_title',
        'overview',
        'popularity',
        'poster_path',
        'release_date',
        'title',
        'vote_average',
        'vote_count',
    ];

    protected $casts = [
        'adult' => 'boolean',
        'popularity' => 'float',
        'vote_average' => 'float',
        'vote_count' => 'integer',
    ];

    protected $hidden = [
        'backdrop_path',
        'poster_path',
        'created_at',
        'updated_at',
    ];

    public $timestamps = true;

    protected function poster(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $_value, array $attributes) => (
                $attributes['poster_path']
                    ? sprintf(
                        '%s/t/p/w500%s',
                        config('services.tmdb.media_uri'),
                        $attributes['poster_path'],
                    )
                    : null
            ),
        );
    }

    protected function backdrop(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $_value, array $attributes) => (
                $attributes['backdrop_path']
                    ? sprintf(
                        '%s/t/p/w500%s',
                        config('services.tmdb.media_uri'),
                        $attributes['backdrop_path'],
                    )
                    : null
            ),
        );
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }
}
