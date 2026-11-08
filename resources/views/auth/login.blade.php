@extends('layouts.auth')

@section('title', 'Login Admin — Nabe Coffee')

@section('content')
    <div class="w-full">
        <!-- Eyebrow -->
        <span class="eyebrow text-muted mb-2">
            ADMIN WORKSPACE
        </span>

        <!-- Heading -->
        <h2 class="text-ink text-4xl sm:text-5xl lg:text-[56px] font-display font-bold uppercase leading-[0.95] mb-3">
            WELCOME BACK.
        </h2>

        <!-- Description -->
        <p class="text-muted text-[13px] leading-relaxed mb-8">
            Masuk dengan akun terdaftar untuk mengelola reservasi cabang, katalog menu, dan pengaturan kuota.
        </p>

        <!-- Status Notification (e.g. Session Message) -->
        @if (session('status'))
            <div class="mb-6 p-4 rounded-[5px] bg-sage border border-sage-ink/20 text-sage-ink text-[13px] flex items-start gap-2.5" role="status">
                <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ session('status') }}</span>
            </div>
        @endif

        <!-- Global Error Notification -->
        @if (session('error') || ($errors->any() && !$errors->has('email') && !$errors->has('password')))
            <div class="mb-6 p-4 rounded-[5px] bg-blush border border-red/30 text-blush-ink text-[13px] flex items-start gap-2.5" role="alert">
                <svg class="w-5 h-5 flex-shrink-0 text-red mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <div>
                    <strong class="font-bold block">Autentikasi gagal:</strong>
                    <span>{{ session('error') ?? 'Email atau kata sandi salah. Silakan periksa kembali kredensial Anda.' }}</span>
                </div>
            </div>
        @endif

        <!-- Login Form -->
        <form method="POST" action="{{ url('/login') }}" class="space-y-5">
            @csrf

            <!-- Email Field -->
            <x-input
                name="email"
                type="email"
                label="Email Akun"
                placeholder="nama@nabecoffee.id"
                required
                autofocus
                autocomplete="email"
            />

            <!-- Password Field -->
            <x-input
                name="password"
                type="password"
                label="Kata Sandi"
                placeholder="••••••••"
                required
                autocomplete="current-password"
            />

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between pt-1 text-[12px]">
                <label class="inline-flex items-center gap-2 text-ink cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        class="w-4 h-4 rounded-[3px] border-line text-primary focus:ring-primary focus:ring-offset-cream"
                        {{ old('remember') ? 'checked' : '' }}
                    />
                    <span>Ingat saya di perangkat ini</span>
                </label>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
                <x-button
                    type="submit"
                    variant="primary"
                    class="w-full justify-center text-[13px] py-3.5 tracking-wider uppercase"
                >
                    Masuk ke Panel <span>↗</span>
                </x-button>
            </div>
        </form>

        <!-- Two-Factor Security Fineprint -->
        <div class="mt-8 pt-6 border-t border-line text-center">
            <p class="text-[12px] text-muted leading-relaxed">
                <span class="inline-block font-semibold text-ink">Keamanan Dua Langkah:</span><br>
                Setelah memasukkan email &amp; sandi, sistem akan meminta 6 digit kode dari <strong>Google Authenticator</strong>.
            </p>
        </div>
    </div>
@endsection

