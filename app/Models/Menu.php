<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    /** Nilai kategori sesuai enum di migration resmi (1.1). */
    public const CATEGORIES = ['coffee', 'non_coffee', 'heavy_meal', 'snack'];

    public const CATEGORY_LABELS = [
        'coffee' => 'Kopi',
        'non_coffee' => 'Non-Kopi',
        'heavy_meal' => 'Makanan Berat',
        'snack' => 'Camilan',
    ];

    protected $fillable = [
        'branch_id', 'name', 'category', 'price',
        'photo', 'tags', 'is_best_seller', 'is_available',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_best_seller' => 'boolean',
        'is_available' => 'boolean',
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}
