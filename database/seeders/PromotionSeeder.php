<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Promotion;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    public function run(): void
    {
        // 1 promo global (semua cabang)
        Promotion::factory()->create([
            'title' => 'Diskon 20% Semua Menu Kopi',
            'branch_id' => null,
        ]);

        // 1 promo per cabang
        foreach (Branch::all() as $branch) {
            Promotion::factory()->create([
                'branch_id' => $branch->id,
            ]);
        }
    }
}
