<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Model;

#[ApiResource]
class Genre extends Model
{
    protected $visible = ['id', 'name', 'tmdb_id'];

    protected $fillable = ['id', 'name'];

    public $timestamps = false;

    public function movies()
    {
        return $this->belongsToMany(Movie::class);
    }
}
