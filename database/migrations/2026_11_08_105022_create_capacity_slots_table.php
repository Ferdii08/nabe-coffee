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
        Schema::create('capacity_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->date('date');                      // tanggal
            $table->time('start_time');                // jam mulai
            $table->time('end_time');                  // jam selesai
            $table->unsignedInteger('max_quota');      // kuota maks
            $table->unsignedInteger('estimated_walk_in')->default(0); // estimasi walk-in
            $table->timestamps();

            $table->unique(['branch_id', 'date', 'start_time', 'end_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capacity_slots');
    }
};
