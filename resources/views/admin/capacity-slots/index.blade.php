@extends('layouts.admin')

@section('title', 'Daftar Kuota')

@section('content')
    <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Daftar Kuota</h1>
        <a href="{{ route('admin.capacity-slots.create') }}" class="bg-stone-900 text-white px-4 py-2 rounded">Tambah Kuota</a>
    </div>
    @if ($slots->isEmpty())
        <p>Belum ada kuota. Silakan tambah kuota baru.</p>
    @else
        <table class="w-full bg-white border rounded">
            <thead>
                <tr class="text-left border-b">
                    <th class="px-4 py-2">Cabang</th>
                    <th class="px-4 py-2">Tanggal</th>
                    <th class="px-4 py-2">Jam</th>
                    <th class="px-4 py-2">Kapasitas Maksimal</th>
                    <th class="px-4 py-2">Estimasi Walk-in</th>
                    <th class="px-4 py-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($slots as $slot)
                    <tr class="border-b">
                        <td class="px-4 py-2">{{ $slot->branch->name }}</td>
                        <td class="px-4 py-2">{{ $slot->date->format('d-m-Y') }}</td>
                        <td class="px-4 py-2">{{ $slot->start_time }} - {{ $slot->end_time }}</td>
                        <td class="px-4 py-2">{{ $slot->max_quota }}</td>
                        <td class="px-4 py-2">{{ $slot->estimated_walk_in }}</td>
                        <td class="px-4 py-2">
                            <a href="{{ route('admin.capacity-slots.show', $slot) }}" class="underline">Lihat</a>
                            <a href="{{ route('admin.capacity-slots.edit', $slot) }}" class="underline ml-2">Ubah</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-4">{{ $slots->links() }}</div>
    @endif
@endsection
