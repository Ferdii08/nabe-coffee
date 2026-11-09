@extends('layouts.admin')

@section('title', 'Detail Cabang')

@section('content')
    <h1 class="text-2xl font-bold mb-4">{{ $branch->name }}</h1>
    <dl class="bg-white p-4 rounded border space-y-2">
        <div><dt class="font-semibold">Alamat</dt><dd>{{ $branch->address }}</dd></div>
        <div><dt class="font-semibold">Jam Operasional</dt><dd>{{ $branch->opens_at }} - {{ $branch->closes_at }}</dd></div>
        <div><dt class="font-semibold">WhatsApp Admin</dt><dd>{{ $branch->admin_whatsapp }}</dd></div>
        <div><dt class="font-semibold">ID Chat Telegram</dt><dd>{{ $branch->telegram_chat_id ?? '-' }}</dd></div>
        <div><dt class="font-semibold">Email Penanggung Jawab</dt><dd>{{ $branch->pic_email ?? '-' }}</dd></div>
        <div><dt class="font-semibold">Google Maps</dt><dd>@if ($branch->maps_url)<a href="{{ $branch->maps_url }}" class="underline" target="_blank" rel="noopener">Lihat di Google Maps</a>@else - @endif</dd></div>
    </dl>
    <div class="flex gap-2 mt-4">
        <a href="{{ route('admin.branches.edit', $branch) }}" class="bg-stone-900 text-white px-4 py-2 rounded">Ubah</a>
        <form action="{{ route('admin.branches.destroy', $branch) }}" method="POST" onsubmit="return confirm('Hapus cabang ini?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="bg-red-700 text-white px-4 py-2 rounded">Hapus</button>
        </form>
        <a href="{{ route('admin.branches.index') }}" class="px-4 py-2 rounded border">Kembali ke Daftar</a>
    </div>
@endsection
