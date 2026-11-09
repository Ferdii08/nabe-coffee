<?php

namespace Tests\Feature\Admin;

use App\Models\Branch;
use App\Models\CapacitySlot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CapacitySlotCrudTest extends TestCase
{
    use RefreshDatabase;

    private function owner(): User
    {
        return User::factory()->owner()->create();
    }

    private function branchAdmin(): User
    {
        return User::factory()->branchAdmin()->create();
    }

    /** @return array<string, mixed> */
    private function validData(int $branchId): array
    {
        return [
            'branch_id' => $branchId,
            'date' => now()->addDay()->format('Y-m-d'),
            'start_time' => '09:00',
            'end_time' => '12:00',
            'max_quota' => 30,
            'estimated_walk_in' => 5,
        ];
    }

    public function test_owner_dapat_membuat_kuota(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->actingAs($this->owner())
            ->post(route('admin.capacity-slots.store'), $this->validData($branch->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('capacity_slots', [
            'branch_id' => $branch->id,
            'max_quota' => 30,
        ]);
    }

    public function test_owner_dapat_melihat_daftar_dan_detail_kuota(): void
    {
        $slot = CapacitySlot::factory()->create();

        $this->actingAs($this->owner())->get(route('admin.capacity-slots.index'))
            ->assertOk()->assertSee($slot->branch->name);

        $this->actingAs($this->owner())->get(route('admin.capacity-slots.show', $slot))
            ->assertOk()->assertSee((string) $slot->max_quota);
    }

    public function test_owner_dapat_mengubah_kuota(): void
    {
        $slot = CapacitySlot::factory()->create();

        $response = $this->actingAs($this->owner())
            ->put(route('admin.capacity-slots.update', $slot), array_merge($this->validData($slot->branch_id), [
                'max_quota' => 50,
            ]));

        $response->assertRedirect();
        $this->assertDatabaseHas('capacity_slots', ['id' => $slot->id, 'max_quota' => 50]);
    }

    public function test_owner_dapat_menghapus_kuota(): void
    {
        $slot = CapacitySlot::factory()->create();

        $response = $this->actingAs($this->owner())
            ->delete(route('admin.capacity-slots.destroy', $slot));

        $response->assertRedirect(route('admin.capacity-slots.index'));
        $this->assertDatabaseMissing('capacity_slots', ['id' => $slot->id]);
    }

    public function test_admin_cabang_ditolak_dengan_403(): void
    {
        $branch = Branch::factory()->create();

        $this->actingAs($this->branchAdmin())
            ->get(route('admin.capacity-slots.index'))
            ->assertForbidden();

        $this->actingAs($this->branchAdmin())
            ->post(route('admin.capacity-slots.store'), $this->validData($branch->id))
            ->assertForbidden();
    }

    public function test_guest_ditolak_dengan_403(): void
    {
        $branch = Branch::factory()->create();

        $this->get(route('admin.capacity-slots.index'))->assertForbidden();
        $this->post(route('admin.capacity-slots.store'), $this->validData($branch->id))->assertForbidden();
    }

    public function test_validasi_jam_menolak_jam_selesai_sebelum_jam_mulai(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->actingAs($this->owner())
            ->post(route('admin.capacity-slots.store'), array_merge($this->validData($branch->id), [
                'start_time' => '12:00',
                'end_time' => '09:00',
                'max_quota' => 0,
            ]));

        $response->assertSessionHasErrors(['start_time', 'end_time', 'max_quota']);

        $errors = session('errors')->getBag('default');
        $this->assertStringContainsString('harus setelah jam mulai', $errors->first('end_time'));
        $this->assertStringContainsString('minimal 1', $errors->first('max_quota'));
    }

    public function test_kuota_duplikat_ditolak(): void
    {
        $branch = Branch::factory()->create();
        $data = $this->validData($branch->id);

        $this->actingAs($this->owner())
            ->post(route('admin.capacity-slots.store'), $data)
            ->assertRedirect();

        $response = $this->actingAs($this->owner())
            ->post(route('admin.capacity-slots.store'), $data);

        $response->assertSessionHasErrors(['branch_id']);
        $this->assertStringContainsString(
            'sudah ada',
            session('errors')->getBag('default')->first('branch_id')
        );
    }
}
