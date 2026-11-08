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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');                    // nama cabang
            $table->text('address')->nullable();       // alamat
            $table->time('opens_at');                  // jam buka
            $table->time('closes_at');                 // jam tutup
            $table->string('admin_whatsapp')->nullable(); // no WA admin
            $table->string('telegram_chat_id')->nullable();
            $table->string('pic_email')->nullable();   // email PJ
            $table->string('maps_url')->nullable();    // link Google Maps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
