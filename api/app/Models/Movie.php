<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[ApiResource(
    normalizationContext: [
        'skip_null_values' => false,
    ],
)]
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
