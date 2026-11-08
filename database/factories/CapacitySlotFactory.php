<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\CapacitySlot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CapacitySlot>
 */
class CapacitySlotFactory extends Factory
{
    public function definition(): array
    {
        $slot = fake()->randomElement([
            ['09:00:00', '12:00:00'],
            ['13:00:00', '16:00:00'],
            ['17:00:00', '20:00:00'],
        ]);

        return [
            'branch_id' => Branch::factory(),
            'date' => fake()->dateTimeBetween('+1 day', '+7 days')->format('Y-m-d'),
            'start_time' => $slot[0],
            'end_time' => $slot[1],
            'max_quota' => fake()->numberBetween(10, 40),
            'estimated_walk_in' => fake()->numberBetween(0, 5),
        ];
    }
}
