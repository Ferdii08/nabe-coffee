<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\CapacitySlot;
use App\Models\Menu;
use App\Models\Promotion;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeder_mengisi_data_awal_sesuai_ketentuan(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->assertEquals(4, Branch::count());
        $this->assertEquals(1, User::where('role', 'owner')->count());

        $admins = User::where('role', 'branch_admin')->get();
        $this->assertCount(4, $admins);
        foreach ($admins as $admin) {
            $this->assertNotNull($admin->branch_id);
        }

        $this->assertEquals(32, Menu::count());
        $this->assertEquals(28, CapacitySlot::count());
        $this->assertEquals(5, Promotion::count());
    }
}
