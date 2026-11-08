<!DOCTYPE html>
<html lang="id" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', $title ?? 'Autentikasi Admin — Nabe Coffee')</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('images/brand/favicon-64.png') }}">

    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-cream text-ink font-sans antialiased min-h-screen selection:bg-lime selection:text-primary-dark">
    <main class="min-h-screen grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] relative">
        <!-- Back Link to Public Website -->
        <a
            href="{{ url('/') }}"
            class="absolute top-6 left-6 lg:top-8 lg:left-10 z-20 text-white/90 hover:text-white text-[12px] font-bold tracking-wider uppercase inline-flex items-center gap-2 transition-colors duration-150 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-lime rounded-[3px] px-2 py-1"
        >
            <span>&larr;</span>
            <span>Kembali ke Website</span>
        </a>

        <!-- Left Side: Brand Story with Grid Pattern -->
        <div class="grid-pattern text-white px-8 py-16 lg:px-[10%] lg:py-[100px] flex flex-col justify-between min-h-[380px] lg:min-h-screen relative overflow-hidden">
            <div>
                <!-- Logo -->
                <div class="mb-12 lg:mb-16 pt-8 lg:pt-0">
                    <a href="{{ url('/') }}" class="inline-flex items-center px-4 py-2.5 rounded-[5px] bg-cream border border-line shadow-sm transition-transform hover:scale-105">
                        <img src="{{ asset('images/brand/logo-nabe-480.png') }}" alt="Nabe Coffee" class="h-9 lg:h-11 w-auto object-contain" />
                    </a>
                </div>

                <!-- Eyebrow -->
                <span class="eyebrow text-lime mb-4">
                    NABE / BEHIND THE COUNTER
                </span>

                <!-- Title Heading -->
                <h1 class="text-white text-5xl sm:text-6xl lg:text-[85px] font-display font-bold uppercase leading-[0.93] tracking-tight mb-6">
                    GOOD DAYS.<br />
                    WELL PLANNED.
                </h1>

                <!-- Description -->
                <p class="text-white/80 text-[13px] sm:text-[14px] leading-relaxed max-w-[380px]">
                    Empat cabang, satu ruang terpusat untuk mengelola reservasi kuota, menu, dan operasional harian kafe.
                </p>
            </div>

            <!-- Footer Note / Warning -->
            <div class="mt-12 pt-6 border-t border-white/15">
                <span class="text-[10px] sm:text-[11px] text-white/70 tracking-wider uppercase block">
                    Area resmi manajemen &middot; Akses terbatas untuk Owner &amp; Admin Cabang
                </span>
            </div>
        </div>

        <!-- Right Side: Form Container -->
        <div class="flex items-center justify-center bg-cream px-6 py-12 lg:px-[15%] lg:py-[70px]">
            <div class="w-full max-w-[460px]">
                @isset($slot)
                    {{ $slot }}
                @else
                    @yield('content')
                @endisset
            </div>
        </div>
    </main>
</body>
</html>

