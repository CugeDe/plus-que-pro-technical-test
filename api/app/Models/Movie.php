<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Model;

#[ApiResource]
class Movie extends Model
{
    public $fillable = [
        'id',
        'title',
        'original_title',
        'overview',
        'poster_path',
        'media_type',
        'adult',
        'original_language',
        'popularity',
        'vote_average',
        'vote_count',
        'release_date',
    ];

    public $timestamps = true;

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }
}
