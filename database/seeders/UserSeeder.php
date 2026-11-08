<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1 akun owner (password dummy, jangan password asli)
        User::create([
            'name' => 'Owner Nabe Coffee',
            'email' => 'owner@nabe.coffee',
            'password' => Hash::make('password'),
            'role' => 'owner',
            'branch_id' => null,
        ]);

        // 1 admin per cabang
        foreach (Branch::all() as $branch) {
            // Nama cabang lengkap ("Nabe Coffee Kusumanegara") — email pakai nama pendeknya
            $slug = Str::slug(str_replace('Nabe Coffee ', '', $branch->name));

            User::create([
                'name' => 'Admin '.$branch->name,
                'email' => 'admin-'.$slug.'@nabe.coffee',
                'password' => Hash::make('password'),
                'role' => 'branch_admin',
                'branch_id' => $branch->id,
            ]);
        }
    }
}
