<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * {
 *   "backdrop_path": "/uGmYqxh8flqkudioyFtD7IJSHxK.jpg",
 *   "id": 889737,
 *   "title": "Joker: Folie à Deux",
 *   "original_title": "Joker: Folie à Deux",
 *   "overview": "While struggling with his dual identity, Arthur Fleck not only stumbles upon true love, but also finds the music that's always been inside him.",
 *   "poster_path": "/aciP8Km0waTLXEYf5ybFK5CSUxl.jpg",
 *   "media_type": "movie",
 *   "adult": false,
 *   "original_language": "en",
 *   "genre_ids": [
 *     18,
 *     80,
 *     53
 *   ],
 *   "popularity": 1080.437,
 *   "release_date": "2024-10-01",
 *   "video": false,
 *   "vote_average": 5.8,
 *   "vote_count": 1049
 * }
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('overview');
            $table->string('poster_path')->nullable();
            $table->string('backdrop_path')->nullable();
            $table->date('release_date')->nullable();
            $table->float('vote_average');
            $table->integer('vote_count');
            $table->float('popularity');
            $table->boolean('adult');
            $table->string('original_language');
            $table->string('media_type');
            $table->string('original_title');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
