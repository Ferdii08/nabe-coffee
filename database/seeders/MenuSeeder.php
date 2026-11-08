<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // 8 menu contoh per cabang (data dummy, boleh diganti menu asli)
        foreach (Branch::all() as $branch) {
            Menu::factory()->count(8)->create([
                'branch_id' => $branch->id,
            ]);
        }
    }
}
