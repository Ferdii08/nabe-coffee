@props([
    'variant' => 'primary',
    'type' => 'button',
    'href' => null,
])

@php
    $baseClasses = 'inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[5px] font-sans font-bold text-[13px] leading-[1.2] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-red cursor-pointer';

    $variants = [
        'primary' => 'bg-primary text-white shadow-sm',
        'outline' => 'bg-transparent border border-primary text-primary hover:bg-primary/5',
        'lime' => 'bg-lime text-primary-dark hover:brightness-95',
        'glass' => 'bg-white/10 border border-white/40 text-white hover:bg-white/20',
        'light' => 'bg-cream text-primary border border-line hover:bg-white',
    ];

    $classes = $baseClasses . ' ' . ($variants[$variant] ?? $variants['primary']);
@endphp

@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>
        {{ $slot }}
    </a>
@else
    <button type="{{ $type }}" {{ $attributes->merge(['class' => $classes]) }}>
        {{ $slot }}
    </button>
@endif

