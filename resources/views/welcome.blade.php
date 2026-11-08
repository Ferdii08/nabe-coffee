@extends('layouts.app')

@section('title', 'Nabe Coffee — Good Coffee. Good Company.')

@section('content')
    <!-- Hero Section -->
    <section class="relative bg-primary-dark text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
        <!-- Subtle Background Grid Overlay -->
        <div class="absolute inset-0 grid-pattern opacity-15"></div>

        <div class="relative max-w-[1600px] mx-auto px-6 lg:px-[7.1%] py-16 lg:py-24 w-full">
            <div class="max-w-[780px]">
                <span class="eyebrow text-lime mb-4">
                    COFFEE &middot; SPACE &middot; CONNECTION
                </span>
                <h1 class="text-white text-5xl sm:text-7xl lg:text-[96px] font-display font-bold uppercase leading-[0.93] tracking-tight mb-6">
                    GOOD COFFEE.<br />
                    <span>GOOD COMPANY.</span>
                </h1>
                <p class="text-white/85 text-[15px] sm:text-[16px] leading-relaxed max-w-[560px] mb-8 font-sans">
                    Empat sudut Jogja, satu tempat buat kita. Nikmati sajian kopi pilihan, ruang kerja nyaman, dan pengalaman reservasi tanpa ribet di seluruh cabang Nabe Coffee.
                </p>
                <div class="flex flex-wrap items-center gap-4">
                    <x-button variant="lime" href="#reservation" class="text-[13px] py-4 px-8 uppercase tracking-wider">
                        Reservasi Sekarang <span>↗</span>
                    </x-button>
                    <x-button variant="glass" href="#menu" class="text-[13px] py-4 px-8 uppercase tracking-wider">
                        Lihat Menu <span>↗</span>
                    </x-button>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Info Strip -->
    <section class="border-b border-line bg-cream py-6 px-6 lg:px-[7.1%]">
        <div class="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-6 text-[12px] text-muted">
            <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></span>
                <span><strong class="text-ink font-bold">4 Cabang Aktif:</strong> Kusumanegara, Demangan, Soragan, Batikan</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-lime flex-shrink-0"></span>
                <span><strong class="text-ink font-bold">Buka Setiap Hari:</strong> 07.00 &ndash; 00.00 WIB</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-gold flex-shrink-0"></span>
                <span><strong class="text-ink font-bold">Layanan:</strong> Reservasi Meja &middot; Pre-Order &middot; Dine-in</span>
            </div>
        </div>
    </section>
@endsection
