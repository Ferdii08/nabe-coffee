@extends('layouts.admin')

@section('title', 'Detail Kuota')

@section('content')
    <h1 class="text-2xl font-bold mb-4">Detail Kuota</h1>
    <dl class="bg-white p-4 rounded border space-y-2">
        <div><dt class="font-semibold">Cabang</dt><dd>{{ $slot->branch->name }}</dd></div>
        <div><dt class="font-semibold">Tanggal</dt><dd>{{ $slot->date->format('d-m-Y') }}</dd></div>
        <div><dt class="font-semibold">Jam</dt><dd>{{ $slot->start_time }} - {{ $slot->end_time }}</dd></div>
        <div><dt class="font-semibold">Kapasitas Maksimal</dt><dd>{{ $slot->max_quota }}</dd></div>
        <div><dt class="font-semibold">Estimasi Walk-in</dt><dd>{{ $slot->estimated_walk_in }}</dd></div>
    </dl>
    <div class="flex gap-2 mt-4">
        <a href="{{ route('admin.capacity-slots.edit', $slot) }}" class="bg-stone-900 text-white px-4 py-2 rounded">Ubah</a>
        <form action="{{ route('admin.capacity-slots.destroy', $slot) }}" method="POST" onsubmit="return confirm('Hapus kuota ini?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="bg-red-700 text-white px-4 py-2 rounded">Hapus</button>
        </form>
        <a href="{{ route('admin.capacity-slots.index') }}" class="px-4 py-2 rounded border">Kembali ke Daftar</a>
    </div>
@endsection
