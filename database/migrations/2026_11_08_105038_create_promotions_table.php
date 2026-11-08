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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('title');                   // judul
            $table->text('description')->nullable();   // deskripsi
            $table->dateTime('starts_at');             // periode mulai
            $table->dateTime('ends_at');               // periode selesai
            $table->text('terms')->nullable();         // syarat
            $table->string('banner')->nullable();      // banner (path di storage)
            $table->foreignId('branch_id')->nullable()->constrained()->cascadeOnDelete(); // null = semua cabang
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
