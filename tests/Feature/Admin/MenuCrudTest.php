<?php

namespace Tests\Feature\Admin;

use App\Models\Branch;
use App\Models\Menu;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MenuCrudTest extends TestCase
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
            'name' => 'Es Kopi Nabe',
            'category' => 'coffee',
            'price' => 25000,
            'tags' => 'kopi, es',
            'is_best_seller' => false,
            'is_available' => true,
        ];
    }

    public function test_owner_dapat_membuat_menu_dengan_upload_foto(): void
    {
        Storage::fake('public');
        $branch = Branch::factory()->create();

        $response = $this->actingAs($this->owner())
            ->post(route('admin.menus.store'), array_merge($this->validData($branch->id), [
                'photo' => UploadedFile::fake()->image('es-kopi.jpg'),
            ]));

        $response->assertRedirect();
        $menu = Menu::first();
        $this->assertNotNull($menu);
        $this->assertSame('Es Kopi Nabe', $menu->name);
        $this->assertSame('coffee', $menu->category);
        // Tag dikirim sebagai teks dipisah koma, disimpan sebagai JSON (array).
        $this->assertSame(['kopi', 'es'], $menu->tags);
        $this->assertNotNull($menu->photo);
        Storage::disk('public')->assertExists($menu->photo);
    }

    public function test_owner_dapat_melihat_daftar_dan_detail_menu(): void
    {
        $menu = Menu::factory()->create(['name' => 'Kopi Susu Gula Aren']);

        $this->actingAs($this->owner())->get(route('admin.menus.index'))
            ->assertOk()->assertSee('Kopi Susu Gula Aren');

        $this->actingAs($this->owner())->get(route('admin.menus.show', $menu))
            ->assertOk()->assertSee('Kopi Susu Gula Aren');
    }

    public function test_owner_dapat_mengubah_menu_dan_foto_lama_dihapus(): void
    {
        Storage::fake('public');
        $menu = Menu::factory()->create([
            'photo' => UploadedFile::fake()->image('lama.jpg')->store('menus', 'public'),
        ]);

        $oldPhoto = $menu->photo;

        $response = $this->actingAs($this->owner())
            ->put(route('admin.menus.update', $menu), array_merge($this->validData($menu->branch_id), [
                'name' => 'Es Kopi Nabe Baru',
                'photo' => UploadedFile::fake()->image('baru.jpg'),
            ]));

        $response->assertRedirect();
        $this->assertDatabaseHas('menus', ['id' => $menu->id, 'name' => 'Es Kopi Nabe Baru']);
        Storage::disk('public')->assertMissing($oldPhoto);
        Storage::disk('public')->assertExists($menu->fresh()->photo);
    }

    public function test_owner_dapat_menghapus_menu_dan_fotonya(): void
    {
        Storage::fake('public');
        $menu = Menu::factory()->create([
            'photo' => UploadedFile::fake()->image('hapus.jpg')->store('menus', 'public'),
        ]);
        $photo = $menu->photo;

        $response = $this->actingAs($this->owner())
            ->delete(route('admin.menus.destroy', $menu));

        $response->assertRedirect(route('admin.menus.index'));
        $this->assertDatabaseMissing('menus', ['id' => $menu->id]);
        Storage::disk('public')->assertMissing($photo);
    }

    public function test_admin_cabang_ditolak_dengan_403(): void
    {
        $branch = Branch::factory()->create();

        $this->actingAs($this->branchAdmin())
            ->get(route('admin.menus.index'))
            ->assertForbidden();

        $this->actingAs($this->branchAdmin())
            ->post(route('admin.menus.store'), $this->validData($branch->id))
            ->assertForbidden();
    }

    public function test_guest_ditolak_dengan_403(): void
    {
        $branch = Branch::factory()->create();

        $this->get(route('admin.menus.index'))->assertForbidden();
        $this->post(route('admin.menus.store'), $this->validData($branch->id))->assertForbidden();
    }

    public function test_validasi_gagal_menampilkan_pesan_bahasa_indonesia(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->actingAs($this->owner())
            ->post(route('admin.menus.store'), [
                'branch_id' => $branch->id,
                'name' => '',
                'category' => 'jus',
                'price' => -1000,
            ]);

        $response->assertSessionHasErrors(['name', 'category', 'price']);

        $errors = session('errors')->getBag('default');
        $this->assertStringContainsString('wajib diisi', $errors->first('name'));
        $this->assertStringContainsString('tidak boleh kurang dari 0', $errors->first('price'));
    }
}
