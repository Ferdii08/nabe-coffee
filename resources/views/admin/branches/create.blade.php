@extends('layouts.admin')

@section('title', 'Tambah Cabang')

@section('content')
    <h1 class="text-2xl font-bold mb-4">Tambah Cabang</h1>
    <form action="{{ route('admin.branches.store') }}" method="POST" class="bg-white p-4 rounded border space-y-4">
        @csrf
        <div>
            <label for="name" class="block font-semibold">Nama Cabang</label>
            <input type="text" id="name" name="name" value="{{ old('name') }}" required class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="address" class="block font-semibold">Alamat</label>
            <textarea id="address" name="address" required class="w-full border rounded px-3 py-2">{{ old('address') }}</textarea>
        </div>
        <div class="flex gap-4">
            <div>
                <label for="opens_at" class="block font-semibold">Jam Buka</label>
                <input type="time" id="opens_at" name="opens_at" value="{{ old('opens_at') }}" required class="border rounded px-3 py-2">
            </div>
            <div>
                <label for="closes_at" class="block font-semibold">Jam Tutup</label>
                <input type="time" id="closes_at" name="closes_at" value="{{ old('closes_at') }}" required class="border rounded px-3 py-2">
            </div>
        </div>
        <div>
            <label for="admin_whatsapp" class="block font-semibold">Nomor WhatsApp Admin</label>
            <input type="text" id="admin_whatsapp" name="admin_whatsapp" value="{{ old('admin_whatsapp') }}" required class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="telegram_chat_id" class="block font-semibold">ID Chat Telegram (opsional)</label>
            <input type="text" id="telegram_chat_id" name="telegram_chat_id" value="{{ old('telegram_chat_id') }}" class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="pic_email" class="block font-semibold">Email Penanggung Jawab (opsional)</label>
            <input type="email" id="pic_email" name="pic_email" value="{{ old('pic_email') }}" class="w-full border rounded px-3 py-2">
        </div>
        <div>
            <label for="maps_url" class="block font-semibold">Tautan Google Maps (opsional)</label>
            <input type="url" id="maps_url" name="maps_url" value="{{ old('maps_url') }}" class="w-full border rounded px-3 py-2">
        </div>
        <div class="flex gap-2">
            <button type="submit" class="bg-stone-900 text-white px-4 py-2 rounded">Simpan</button>
            <a href="{{ route('admin.branches.index') }}" class="px-4 py-2 rounded border">Batal</a>
        </div>
    </form>
@endsection
