<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapacitySlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id', 'date', 'start_time', 'end_time',
        'max_quota', 'estimated_walk_in',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}
