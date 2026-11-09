<?php

namespace Tests\Feature\Admin;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BranchCrudTest extends TestCase
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
    private function validData(): array
    {
        return [
            'name' => 'Kusumanegara',
            'address' => 'Jl. Kusumanegara No.11, Yogyakarta',
            'opens_at' => '07:00',
            'closes_at' => '22:00',
            'admin_whatsapp' => '6281234567890',
            'telegram_chat_id' => '-1001234567890',
            'pic_email' => 'pj@nabecoffee.id',
            'maps_url' => 'https://maps.google.com/?q=nabe+coffee',
        ];
    }

    public function test_owner_dapat_membuat_cabang(): void
    {
        $response = $this->actingAs($this->owner())
            ->post(route('admin.branches.store'), $this->validData());

        $response->assertRedirect();
        $this->assertDatabaseHas('branches', ['name' => 'Kusumanegara']);
    }

    public function test_owner_dapat_melihat_daftar_dan_detail_cabang(): void
    {
        $branch = Branch::factory()->create(['name' => 'Demangan']);

        $this->actingAs($this->owner())->get(route('admin.branches.index'))
            ->assertOk()->assertSee('Demangan');

        $this->actingAs($this->owner())->get(route('admin.branches.show', $branch))
            ->assertOk()->assertSee('Demangan');
    }

    public function test_owner_dapat_mengubah_cabang(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->actingAs($this->owner())
            ->put(route('admin.branches.update', $branch), array_merge($this->validData(), [
                'name' => 'Soragan',
            ]));

        $response->assertRedirect();
        $this->assertDatabaseHas('branches', ['id' => $branch->id, 'name' => 'Soragan']);
    }

    public function test_owner_dapat_menghapus_cabang(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->actingAs($this->owner())
            ->delete(route('admin.branches.destroy', $branch));

        $response->assertRedirect(route('admin.branches.index'));
        $this->assertDatabaseMissing('branches', ['id' => $branch->id]);
    }

    public function test_admin_cabang_ditolak_dengan_403(): void
    {
        $this->actingAs($this->branchAdmin())
            ->get(route('admin.branches.index'))
            ->assertForbidden();

        $this->actingAs($this->branchAdmin())
            ->post(route('admin.branches.store'), $this->validData())
            ->assertForbidden();
    }

    public function test_guest_ditolak_dengan_403(): void
    {
        $this->get(route('admin.branches.index'))->assertForbidden();
        $this->post(route('admin.branches.store'), $this->validData())->assertForbidden();
    }

    public function test_validasi_gagal_menampilkan_pesan_bahasa_indonesia(): void
    {
        $response = $this->actingAs($this->owner())
            ->post(route('admin.branches.store'), [
                'name' => '',
                'address' => '',
                'opens_at' => '22:00',
                'closes_at' => '07:00',
                'admin_whatsapp' => '',
                'maps_url' => 'bukan-url',
            ]);

        // Alamat dan nomor WhatsApp admin nullable di skema resmi (1.1),
        // jadi keduanya tidak lagi memicu error validasi saat kosong.
        $response->assertSessionHasErrors(['name', 'maps_url', 'closes_at']);

        $errors = session('errors')->getBag('default');
        $this->assertStringContainsString('wajib diisi', $errors->first('name'));
        $this->assertStringContainsString('harus setelah jam buka', $errors->first('closes_at'));
    }

    public function test_jam_tutup_tengah_malam_diterima(): void
    {
        // Cabang PRD buka 07.00 dan tutup 00.00 (tengah malam).
        $response = $this->actingAs($this->owner())
            ->post(route('admin.branches.store'), array_merge($this->validData(), [
                'closes_at' => '00:00',
            ]));

        $response->assertRedirect();
        $this->assertDatabaseHas('branches', ['name' => 'Kusumanegara']);
    }
}
