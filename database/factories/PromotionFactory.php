<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Promotion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Promotion>
 */
class PromotionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement([
                'Diskon 20% Semua Menu Kopi',
                'Beli 2 Gratis 1',
                'Happy Hour 15.00–17.00',
                'Promo Akhir Pekan',
            ]),
            'description' => fake()->sentence(),
            'starts_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'ends_at' => fake()->dateTimeBetween('now', '+1 month'),
            'terms' => fake()->sentence(),
            'banner' => null,
            'branch_id' => fake()->boolean(50) ? null : Branch::factory(),
        ];
    }
}
