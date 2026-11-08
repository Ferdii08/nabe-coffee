<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'opens_at', 'closes_at',
        'admin_whatsapp', 'telegram_chat_id', 'pic_email', 'maps_url',
    ];

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function capacitySlots()
    {
        return $this->hasMany(CapacitySlot::class);
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
