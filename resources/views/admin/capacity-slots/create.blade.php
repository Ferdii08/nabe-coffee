@extends('layouts.admin')

@section('title', 'Tambah Kuota')

@section('content')
    <h1 class="text-2xl font-bold mb-4">Tambah Kuota</h1>
    <form action="{{ route('admin.capacity-slots.store') }}" method="POST" class="bg-white p-4 rounded border space-y-4">
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
            <label for="date" class="block font-semibold">Tanggal</label>
            <input type="date" id="date" name="date" value="{{ old('date') }}" required class="border rounded px-3 py-2">
        </div>
        <div class="flex gap-4">
            <div>
                <label for="start_time" class="block font-semibold">Jam Mulai</label>
                <input type="time" id="start_time" name="start_time" value="{{ old('start_time') }}" required class="border rounded px-3 py-2">
            </div>
            <div>
                <label for="end_time" class="block font-semibold">Jam Selesai</label>
                <input type="time" id="end_time" name="end_time" value="{{ old('end_time') }}" required class="border rounded px-3 py-2">
            </div>
        </div>
        <div>
            <label for="max_quota" class="block font-semibold">Kapasitas Maksimal</label>
            <input type="number" id="max_quota" name="max_quota" value="{{ old('max_quota') }}" min="1" required class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="estimated_walk_in" class="block font-semibold">Estimasi Walk-in</label>
            <input type="number" id="estimated_walk_in" name="estimated_walk_in" value="{{ old('estimated_walk_in', 0) }}" min="0" class="w-full border rounded px-3 py-2">
        </div>
        <div class="flex gap-2">
            <button type="submit" class="bg-stone-900 text-white px-4 py-2 rounded">Simpan</button>
            <a href="{{ route('admin.capacity-slots.index') }}" class="px-4 py-2 rounded border">Batal</a>
        </div>
    </form>
@endsection
