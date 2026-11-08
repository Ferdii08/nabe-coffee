<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        // Data asli dari docs/PRD.md §3 (sesuai laporan)
        $branches = [
            [
                'name' => 'Nabe Coffee Kusumanegara',
                'address' => 'Jl. Kusumanegara No.11, Semaki, Umbulharjo, Kota Yogyakarta 55166',
                'opens_at' => '07:00:00',
                'closes_at' => '23:59:59',
                'admin_whatsapp' => null,
                'telegram_chat_id' => null,
                'pic_email' => null,
                'maps_url' => null,
            ],
            [
                'name' => 'Nabe Coffee Demangan',
                'address' => 'Jl. Demangan Baru, Mrican, Caturtunggal, Depok, Sleman 55281',
                'opens_at' => '07:00:00',
                'closes_at' => '23:59:59',
                'admin_whatsapp' => null,
                'telegram_chat_id' => null,
                'pic_email' => null,
                'maps_url' => null,
            ],
            [
                'name' => 'Nabe Coffee Soragan',
                'address' => 'Jl. Soragan No.29, Ngestiharjo, Kasihan, Bantul 55184',
                'opens_at' => '07:00:00',
                'closes_at' => '23:59:59',
                'admin_whatsapp' => null,
                'telegram_chat_id' => null,
                'pic_email' => null,
                'maps_url' => null,
            ],
            [
                'name' => 'Nabe Coffee Batikan',
                'address' => 'Jl. Batikan No.9, Umbulharjo, Kota Yogyakarta 55161',
                'opens_at' => '09:00:00',
                'closes_at' => '22:00:00',
                'admin_whatsapp' => null,
                'telegram_chat_id' => null,
                'pic_email' => null,
                'maps_url' => null,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::create($branch);
        }
    }
}
