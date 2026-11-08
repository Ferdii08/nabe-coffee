@props([
    'variant' => 'pending',
])

@php
    $variants = [
        'pending' => 'bg-gold text-gold-ink',
        'gold' => 'bg-gold text-gold-ink',
        'terlaris' => 'bg-gold text-gold-ink',
        'confirmed' => 'bg-sage text-sage-ink',
        'sage' => 'bg-sage text-sage-ink',
        'terkirim' => 'bg-sage text-sage-ink',
        'rescheduled' => 'bg-sky text-primary-dark',
        'sky' => 'bg-sky text-primary-dark',
        'canceled' => 'bg-grey text-grey-ink',
        'grey' => 'bg-grey text-grey-ink',
        'completed' => 'bg-charcoal text-white',
        'charcoal' => 'bg-charcoal text-white',
        'promo' => 'bg-blush text-blush-ink',
        'blush' => 'bg-blush text-blush-ink',
        'gagal' => 'bg-blush text-blush-ink',
        'primary' => 'bg-primary text-white',
        'lime' => 'bg-lime text-primary-dark',
    ];

    $classes = 'inline-flex items-center px-2.5 py-1 rounded-[4px] font-sans font-bold text-[10px] uppercase tracking-wider leading-none ' . ($variants[strtolower($variant)] ?? $variants['pending']);
@endphp

<span {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</span>

