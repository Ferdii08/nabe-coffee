<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\CapacitySlot;
use Illuminate\Database\Seeder;

class CapacitySlotSeeder extends Seeder
{
    public function run(): void
    {
        // 1 slot per cabang per hari, 7 hari ke depan (jam 09.00–12.00)
        foreach (Branch::all() as $branch) {
            for ($day = 1; $day <= 7; $day++) {
                CapacitySlot::factory()->create([
                    'branch_id' => $branch->id,
                    'date' => now()->addDays($day)->format('Y-m-d'),
                    'start_time' => '09:00:00',
                    'end_time' => '12:00:00',
                ]);
            }
        }
    }
}
