<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add the `on delete cascade` to delete association when a movie is deleted but not a genre
        Schema::table('genre_movie', function (Blueprint $table) {
            $table->dropForeign(['movie_id']);
            $table->foreign('movie_id')
                ->references('id')
                ->on('movies')
                ->onDelete('cascade')
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('genre_movie', function (Blueprint $table) {
            $table->dropForeign(['movie_id']);
            $table->foreign('movie_id')
                ->references('id')
                ->on('movies')
                ->change();
        });
    }
};
