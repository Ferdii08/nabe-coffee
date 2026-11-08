<?php

namespace Database\Factories;

use App\Models\Branch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Branch>
 */
class BranchFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Nabe Coffee Kusumanegara',
                'Nabe Coffee Demangan',
                'Nabe Coffee Soragan',
                'Nabe Coffee Batikan',
            ]),
            'address' => fake()->address(),
            'opens_at' => '07:00:00',
            'closes_at' => '23:00:00',
            'admin_whatsapp' => fake()->phoneNumber(),
            'telegram_chat_id' => fake()->numerify('-##########'),
            'pic_email' => fake()->unique()->safeEmail(),
            'maps_url' => fake()->url(),
        ];
    }
}
