<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Menu>
 */
class MenuFactory extends Factory
{
    public function definition(): array
    {
        return [
            'branch_id' => Branch::factory(),
            'name' => fake()->randomElement([
                'Es Kopi Nabe', 'V60 Arabika', 'Matcha Latte',
                'Kentang Goreng', 'Nasi Goreng Nabe', 'Roti Bakar Coklat',
            ]),
            'category' => fake()->randomElement(['coffee', 'non_coffee', 'heavy_meal', 'snack']),
            'price' => fake()->numberBetween(10000, 45000),
            'photo' => null,
            'tags' => fake()->randomElements(['manis', 'panas', 'dingin', 'pedas'], 2),
            'is_best_seller' => fake()->boolean(20),
            'is_available' => true,
        ];
    }
}
