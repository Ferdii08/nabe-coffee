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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('name');                    // nama
            $table->enum('category', ['coffee', 'non_coffee', 'heavy_meal', 'snack']);
            $table->unsignedInteger('price');          // harga (rupiah, tanpa sen)
            $table->string('photo')->nullable();       // foto (path di storage)
            $table->json('tags')->nullable();          // tags
            $table->boolean('is_best_seller')->default(false);
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
