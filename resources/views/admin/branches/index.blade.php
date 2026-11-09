@extends('layouts.admin')

@section('title', 'Daftar Cabang')

@section('content')
    <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Daftar Cabang</h1>
        <a href="{{ route('admin.branches.create') }}" class="bg-stone-900 text-white px-4 py-2 rounded">Tambah Cabang</a>
    </div>
    @if ($branches->isEmpty())
        <p>Belum ada cabang. Silakan tambah cabang baru.</p>
    @else
        <table class="w-full bg-white border rounded">
            <thead>
                <tr class="text-left border-b">
                    <th class="px-4 py-2">Nama</th>
                    <th class="px-4 py-2">Alamat</th>
                    <th class="px-4 py-2">Jam Operasional</th>
                    <th class="px-4 py-2">WhatsApp Admin</th>
                    <th class="px-4 py-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($branches as $branch)
                    <tr class="border-b">
                        <td class="px-4 py-2">{{ $branch->name }}</td>
                        <td class="px-4 py-2">{{ $branch->address }}</td>
                        <td class="px-4 py-2">{{ $branch->opens_at }} - {{ $branch->closes_at }}</td>
                        <td class="px-4 py-2">{{ $branch->admin_whatsapp }}</td>
                        <td class="px-4 py-2">
                            <a href="{{ route('admin.branches.show', $branch) }}" class="underline">Lihat</a>
                            <a href="{{ route('admin.branches.edit', $branch) }}" class="underline ml-2">Ubah</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-4">{{ $branches->links() }}</div>
    @endif
@endsection
