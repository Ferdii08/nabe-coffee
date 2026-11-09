@extends('layouts.admin')

@section('title', 'Detail Menu')

@section('content')
    <h1 class="text-2xl font-bold mb-4">{{ $menu->name }}</h1>
    @if ($menu->photo)
        <img src="{{ asset('storage/' . $menu->photo) }}" alt="Foto {{ $menu->name }}" class="max-w-xs rounded border mb-4">
    @endif
    <dl class="bg-white p-4 rounded border space-y-2">
        <div><dt class="font-semibold">Cabang</dt><dd>{{ $menu->branch->name }}</dd></div>
        <div><dt class="font-semibold">Kategori</dt><dd>{{ \App\Models\Menu::CATEGORY_LABELS[$menu->category] ?? $menu->category }}</dd></div>
        <div><dt class="font-semibold">Harga</dt><dd>Rp{{ number_format($menu->price, 0, ',', '.') }}</dd></div>
        <div><dt class="font-semibold">Tag</dt><dd>{{ is_array($menu->tags) ? implode(', ', $menu->tags) : ($menu->tags ?? '-') }}</dd></div>
        <div><dt class="font-semibold">Terlaris</dt><dd>{{ $menu->is_best_seller ? 'Ya' : 'Tidak' }}</dd></div>
        <div><dt class="font-semibold">Tersedia</dt><dd>{{ $menu->is_available ? 'Ya' : 'Tidak' }}</dd></div>
    </dl>
    <div class="flex gap-2 mt-4">
        <a href="{{ route('admin.menus.edit', $menu) }}" class="bg-stone-900 text-white px-4 py-2 rounded">Ubah</a>
        <form action="{{ route('admin.menus.destroy', $menu) }}" method="POST" onsubmit="return confirm('Hapus menu ini?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="bg-red-700 text-white px-4 py-2 rounded">Hapus</button>
        </form>
        <a href="{{ route('admin.menus.index') }}" class="px-4 py-2 rounded border">Kembali ke Daftar</a>
    </div>
@endsection
