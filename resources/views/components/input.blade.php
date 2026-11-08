@props([
    'name',
    'label' => null,
    'type' => 'text',
    'value' => null,
    'hint' => null,
    'required' => false,
    'id' => null,
])

@php
    $inputErrors = $errors->get($name);
    $hasError = !empty($inputErrors);
    $inputId = $id ?? $name;
    $computedValue = old($name, $value);
@endphp

<div class="w-full">
    @if ($label)
        <label for="{{ $inputId }}" class="block text-ink text-[12px] font-bold uppercase tracking-wider mb-2">
            {{ $label }}
            @if ($required)
                <span class="text-red font-bold">*</span>
            @endif
        </label>
    @endif

    <div class="relative">
        <input
            type="{{ $type }}"
            name="{{ $name }}"
            id="{{ $inputId }}"
            value="{{ $computedValue }}"
            @if ($required) required @endif
            {{ $attributes->merge([
                'class' => 'w-full bg-white text-ink text-[14px] rounded-[5px] px-4 py-3 border transition-colors duration-150 placeholder:text-muted/60 focus:outline-none focus:ring-1 ' .
                ($hasError ? 'border-red focus:border-red focus:ring-red' : 'border-line focus:border-primary focus:ring-primary')
            ]) }}
        />
    </div>

    @if ($hint && !$hasError)
        <p class="text-muted text-[12px] mt-1.5">{{ $hint }}</p>
    @endif

    @error($name)
        <p class="text-red text-[12px] font-medium mt-1.5 flex items-center gap-1.5" role="alert">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ $message }}</span>
        </p>
    @enderror
</div>

