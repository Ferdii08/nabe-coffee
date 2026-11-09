@extends('layouts.admin')

@section('title', 'Daftar Menu')

@section('content')
    <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Daftar Menu</h1>
        <a href="{{ route('admin.menus.create') }}" class="bg-stone-900 text-white px-4 py-2 rounded">Tambah Menu</a>
    </div>
    @if ($menus->isEmpty())
        <p>Belum ada menu. Silakan tambah menu baru.</p>
    @else
        <table class="w-full bg-white border rounded">
            <thead>
                <tr class="text-left border-b">
                    <th class="px-4 py-2">Nama</th>
                    <th class="px-4 py-2">Cabang</th>
                    <th class="px-4 py-2">Kategori</th>
                    <th class="px-4 py-2">Harga</th>
                    <th class="px-4 py-2">Tersedia</th>
                    <th class="px-4 py-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($menus as $menu)
                    <tr class="border-b">
                        <td class="px-4 py-2">{{ $menu->name }} @if ($menu->is_best_seller)<span class="text-sm text-amber-700">(Terlaris)</span>@endif</td>
                        <td class="px-4 py-2">{{ $menu->branch->name }}</td>
                        <td class="px-4 py-2">{{ \App\Models\Menu::CATEGORY_LABELS[$menu->category] ?? $menu->category }}</td>
                        <td class="px-4 py-2">Rp{{ number_format($menu->price, 0, ',', '.') }}</td>
                        <td class="px-4 py-2">{{ $menu->is_available ? 'Ya' : 'Tidak' }}</td>
                        <td class="px-4 py-2">
                            <a href="{{ route('admin.menus.show', $menu) }}" class="underline">Lihat</a>
                            <a href="{{ route('admin.menus.edit', $menu) }}" class="underline ml-2">Ubah</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-4">{{ $menus->links() }}</div>
    @endif
@endsection
