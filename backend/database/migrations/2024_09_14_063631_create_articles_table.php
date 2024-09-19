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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->text('description')->nullable();
            $table->text('url');
            $table->text('image_url')->nullable();
            $table->timestamp('published_at')->index();
            $table->string('source')->index();
            $table->string('category')->index()->nullable();
            $table->string('author')->index()->nullable();
            $table->timestamps();
        });

        DB::statement('CREATE INDEX articles_description_index ON articles (description(500))');
        DB::statement('CREATE INDEX articles_url_index ON articles (url(255))');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
