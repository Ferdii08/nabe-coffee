@extends('layouts.admin')

@section('title', 'Tambah Menu')

@section('content')
    <h1 class="text-2xl font-bold mb-4">Tambah Menu</h1>
    <form action="{{ route('admin.menus.store') }}" method="POST" enctype="multipart/form-data" class="bg-white p-4 rounded border space-y-4">
        @csrf
        <div>
            <label for="branch_id" class="block font-semibold">Cabang</label>
            <select id="branch_id" name="branch_id" required class="w-full border rounded px-3 py-2">
                <option value="">-- Pilih Cabang --</option>
                @foreach ($branches as $branch)
                    <option value="{{ $branch->id }}" @selected(old('branch_id') == $branch->id)>{{ $branch->name }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label for="name" class="block font-semibold">Nama Menu</label>
            <input type="text" id="name" name="name" value="{{ old('name') }}" required class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="category" class="block font-semibold">Kategori</label>
            <select id="category" name="category" required class="w-full border rounded px-3 py-2">
                <option value="">-- Pilih Kategori --</option>
                @foreach (\App\Models\Menu::CATEGORIES as $category)
                    <option value="{{ $category }}" @selected(old('category') === $category)>{{ \App\Models\Menu::CATEGORY_LABELS[$category] }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label for="price" class="block font-semibold">Harga (Rp)</label>
            <input type="number" id="price" name="price" value="{{ old('price') }}" min="0" required class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="photo" class="block font-semibold">Foto Menu (maksimal 2 MB)</label>
            <input type="file" id="photo" name="photo" accept="image/*" class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="tags" class="block font-semibold">Tag (opsional, pisahkan dengan koma)</label>
            <input type="text" id="tags" name="tags" value="{{ old('tags') }}" class="w-full border rounded px-3 py-2">
        </div>
        <div class="flex gap-4">
            <label class="flex items-center gap-2"><input type="checkbox" name="is_best_seller" value="1" @checked(old('is_best_seller'))> Terlaris</label>
            <label class="flex items-center gap-2"><input type="checkbox" name="is_available" value="1" @checked(old('is_available', true))> Tersedia</label>
        </div>
        <div class="flex gap-2">
            <button type="submit" class="bg-stone-900 text-white px-4 py-2 rounded">Simpan</button>
            <a href="{{ route('admin.menus.index') }}" class="px-4 py-2 rounded border">Batal</a>
        </div>
    </form>
@endsection
