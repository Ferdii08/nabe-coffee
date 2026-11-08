@extends('layouts.auth')

@section('title', 'Verifikasi Dua Faktor — Nabe Coffee')

@section('content')
    <div class="w-full">
        <!-- Eyebrow -->
        <span class="eyebrow text-muted mb-2">
            AUTENTIKASI DUA FAKTOR
        </span>

        <!-- Heading -->
        <h2 class="text-ink text-4xl sm:text-5xl lg:text-[56px] font-display font-bold uppercase leading-[0.95] mb-3">
            VERIFIKASI 2FA.
        </h2>

        <!-- Description -->
        <p class="text-muted text-[13px] leading-relaxed mb-8">
            Buka aplikasi <strong>Google Authenticator</strong> di ponsel Anda, lalu masukkan 6 digit kode keamanan yang tampil.
        </p>

        <!-- Error Notification -->
        @if ($errors->any() || session('error'))
            <div class="mb-6 p-4 rounded-[5px] bg-blush border border-red/30 text-blush-ink text-[13px] flex items-start gap-2.5" role="alert">
                <svg class="w-5 h-5 flex-shrink-0 text-red mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <div>
                    <strong class="font-bold block">Kode tidak valid:</strong>
                    <span>{{ session('error') ?: ($errors->first('code') ?: ($errors->first('recovery_code') ?: 'Kode autentikasi salah atau telah kadaluarsa. Silakan coba lagi.')) }}</span>
                </div>
            </div>
        @endif

        <!-- Form 1: TOTP Code Input (Default) -->
        <div id="totp-container">
            <form method="POST" action="{{ url('/two-factor-challenge') }}" class="space-y-6">
                @csrf

                <div>
                    <label for="code" class="block text-ink text-[12px] font-bold uppercase tracking-wider mb-3 text-center">
                        Kode Keamanan 6 Digit
                    </label>
                    <div class="max-w-[280px] mx-auto">
                        <input
                            type="text"
                            name="code"
                            id="code"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            maxlength="6"
                            placeholder="000000"
                            autocomplete="one-time-code"
                            autofocus
                            required
                            class="w-full bg-white text-ink font-mono font-bold text-center text-3xl tracking-[0.35em] py-3.5 px-4 rounded-[5px] border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-150"
                        />
                    </div>
                    <p class="text-[12px] text-muted text-center mt-2.5">
                        Kode diperbarui setiap 30 detik di Google Authenticator.
                    </p>
                </div>

                <div class="pt-2">
                    <x-button
                        type="submit"
                        variant="primary"
                        class="w-full justify-center text-[13px] py-3.5 tracking-wider uppercase"
                    >
                        Verifikasi Kode <span>↗</span>
                    </x-button>
                </div>
            </form>

            <!-- Toggle to Recovery Code -->
            <div class="mt-6 text-center">
                <button
                    type="button"
                    id="toggle-recovery-btn"
                    class="text-[12px] font-semibold text-primary hover:underline cursor-pointer"
                >
                    Ponsel tidak tersedia? Gunakan kode cadangan darurat &rarr;
                </button>
            </div>
        </div>

        <!-- Form 2: Emergency Recovery Code (Hidden by default) -->
        <div id="recovery-container" class="hidden">
            <form method="POST" action="{{ url('/two-factor-challenge') }}" class="space-y-6">
                @csrf

                <div>
                    <label for="recovery_code" class="block text-ink text-[12px] font-bold uppercase tracking-wider mb-2 text-center">
                        Kode Cadangan Darurat (Recovery Code)
                    </label>
                    <div class="max-w-[320px] mx-auto">
                        <input
                            type="text"
                            name="recovery_code"
                            id="recovery_code"
                            placeholder="XXXX-XXXX"
                            autocomplete="off"
                            class="w-full bg-white text-ink font-mono font-bold text-center text-xl tracking-widest uppercase py-3 px-4 rounded-[5px] border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-150"
                        />
                    </div>
                    <p class="text-[12px] text-muted text-center mt-2.5">
                        Masukkan salah satu dari 8 kode cadangan yang Anda simpan saat aktivasi 2FA.
                    </p>
                </div>

                <div class="pt-2">
                    <x-button
                        type="submit"
                        variant="primary"
                        class="w-full justify-center text-[13px] py-3.5 tracking-wider uppercase"
                    >
                        Masuk dengan Kode Cadangan <span>↗</span>
                    </x-button>
                </div>
            </form>

            <!-- Toggle back to TOTP Code -->
            <div class="mt-6 text-center">
                <button
                    type="button"
                    id="toggle-totp-btn"
                    class="text-[12px] font-semibold text-primary hover:underline cursor-pointer"
                >
                    &larr; Kembali ke input kode Google Authenticator
                </button>
            </div>
        </div>

        <!-- Back to login link -->
        <div class="mt-8 pt-6 border-t border-line text-center">
            <a href="{{ route('login') }}" class="text-[12px] text-muted hover:text-ink transition-colors">
                Gunakan akun lain &middot; Batal verifikasi
            </a>
        </div>
    </div>

    <!-- Script to toggle between TOTP and Recovery Code input -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const totpContainer = document.getElementById('totp-container');
            const recoveryContainer = document.getElementById('recovery-container');
            const toggleRecoveryBtn = document.getElementById('toggle-recovery-btn');
            const toggleTotpBtn = document.getElementById('toggle-totp-btn');
            const codeInput = document.getElementById('code');
            const recoveryInput = document.getElementById('recovery_code');

            if (toggleRecoveryBtn && toggleTotpBtn) {
                toggleRecoveryBtn.addEventListener('click', function () {
                    totpContainer.classList.add('hidden');
                    recoveryContainer.classList.remove('hidden');
                    if (recoveryInput) recoveryInput.focus();
                });

                toggleTotpBtn.addEventListener('click', function () {
                    recoveryContainer.classList.add('hidden');
                    totpContainer.classList.remove('hidden');
                    if (codeInput) codeInput.focus();
                });
            }
        });
    </script>
@endsection

