<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin') - Nabe Coffee</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-stone-100 text-stone-900 min-h-screen">
    <header class="bg-stone-900 text-white">
        <div class="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
            <a href="{{ route('admin.branches.index') }}" class="font-bold text-lg">Nabe Coffee — Admin</a>
            <nav class="flex gap-4 text-sm">
                <a href="{{ route('admin.branches.index') }}" class="underline">Cabang</a>
                <a href="{{ route('admin.menus.index') }}" class="underline">Menu</a>
                <a href="{{ route('admin.capacity-slots.index') }}" class="underline">Kuota</a>
            </nav>
        </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 py-6">
        @if (session('success'))
            <p class="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">{{ session('success') }}</p>
        @endif
        @if ($errors->any())
            <div class="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded mb-4">
                <p class="font-semibold">Terjadi kesalahan validasi:</p>
                <ul class="list-disc list-inside">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @yield('content')
    </main>
</body>
</html>
