@extends('layouts.auth')

@section('title', 'Aktivasi Two-Factor Authentication — Nabe Coffee')

@section('content')
    <div class="w-full">
        <!-- Eyebrow -->
        <span class="eyebrow text-muted mb-2">
            PENGATURAN KEAMANAN
        </span>

        <!-- Heading -->
        <h2 class="text-ink text-4xl sm:text-5xl lg:text-[56px] font-display font-bold uppercase leading-[0.95] mb-3">
            AKTIVASI 2FA.
        </h2>

        <!-- Description -->
        <p class="text-muted text-[13px] leading-relaxed mb-6">
            Tingkatkan keamanan akun Anda dengan <strong>Google Authenticator (TOTP)</strong>. Ikuti langkah di bawah ini untuk mengaktifkan:
        </p>

        <!-- Error Notification -->
        @if ($errors->any() || session('error'))
            <div class="mb-6 p-4 rounded-[5px] bg-blush border border-red/30 text-blush-ink text-[13px] flex items-start gap-2.5" role="alert">
                <svg class="w-5 h-5 flex-shrink-0 text-red mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <div>
                    <strong class="font-bold block">Aktivasi belum berhasil:</strong>
                    <span>{{ session('error') ?: ($errors->first('code') ?: 'Kode konfirmasi salah. Pastikan waktu di perangkat Anda akurat.') }}</span>
                </div>
            </div>
        @endif

        <div class="space-y-6">
            <!-- Langkah 1: Scan QR Code -->
            <div class="p-5 bg-white border border-line rounded-[5px]">
                <div class="flex items-center gap-2 mb-3">
                    <span class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">1</span>
                    <h3 class="text-ink font-bold text-[14px]">Pindai QR Code di Google Authenticator</h3>
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-5 my-4">
                    <!-- QR Code Frame -->
                    <div class="w-36 h-36 bg-cream border border-line rounded-[5px] flex items-center justify-center p-2 flex-shrink-0 shadow-inner">
                        @if(isset($qrCodeSvg))
                            {!! $qrCodeSvg !!}
                        @elseif(isset($qrCodeUrl))
                            <img src="{{ $qrCodeUrl }}" alt="QR Code 2FA" class="w-full h-full object-contain" />
                        @else
                            <!-- Representasi visual QR Code placeholder -->
                            <div class="w-full h-full bg-ink/5 border border-dashed border-ink/20 rounded-[3px] flex flex-col items-center justify-center p-2 text-center">
                                <svg class="w-12 h-12 text-primary mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                <span class="text-[9px] font-mono text-muted uppercase tracking-wider font-semibold">QR Code Demo</span>
                            </div>
                        @endif
                    </div>

                    <!-- Setup Key Manual -->
                    <div class="text-left w-full text-[12px]">
                        <p class="text-muted leading-relaxed mb-2">
                            Buka aplikasi Google Authenticator, pilih <strong>+</strong> lalu <strong>Pindai kode QR</strong>.
                        </p>
                        <p class="text-muted text-[11px] mb-1">Atau masukkan kunci manual berikut:</p>
                        <div class="flex items-center gap-2">
                            <code id="secret-key-display" class="font-mono bg-soft text-primary font-bold px-2.5 py-1.5 rounded-[4px] border border-line text-[12px] tracking-wider select-all">
                                {{ $secretKey ?? 'JBSWY3DPEHPK3PXP' }}
                            </code>
                            <button
                                type="button"
                                id="copy-secret-btn"
                                class="text-primary hover:text-primary-dark text-[11px] font-bold underline cursor-pointer"
                            >
                                Salin
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Langkah 2: Kode Cadangan Darurat (Recovery Codes) -->
            <div class="p-5 bg-white border border-line rounded-[5px]">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">2</span>
                        <h3 class="text-ink font-bold text-[14px]">Simpan 8 Kode Cadangan Darurat</h3>
                    </div>
                    <button
                        type="button"
                        id="copy-codes-btn"
                        class="text-[11px] text-primary font-bold hover:underline cursor-pointer"
                    >
                        Salin Semua Kode
                    </button>
                </div>

                <p class="text-[12px] text-muted leading-relaxed mb-3">
                    Kode ini dapat digunakan jika ponsel Anda hilang atau tidak dapat diakses. <strong>Masing-masing kode hanya dapat dipakai 1 kali.</strong>
                </p>

                @php
                    $backupCodes = $recoveryCodes ?? [
                        'A1B2-C3D4', 'E5F6-G7H8',
                        'J9K0-L1M2', 'N3P4-Q5R6',
                        'S7T8-U9V0', 'W1X2-Y3Z4',
                        'B5C6-D7E8', 'F9G0-H1J2'
                    ];
                @endphp

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-cream p-3 rounded-[4px] border border-line font-mono text-[11px] font-bold text-ink text-center tracking-wider select-all">
                    @foreach($backupCodes as $bCode)
                        <div class="py-1 px-1.5 bg-white border border-line/60 rounded-[3px]">
                            {{ $bCode }}
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Langkah 3: Konfirmasi Kode & Aktivasi -->
            <div class="p-5 bg-white border border-line rounded-[5px]">
                <div class="flex items-center gap-2 mb-3">
                    <span class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">3</span>
                    <h3 class="text-ink font-bold text-[14px]">Konfirmasi Kode untuk Mengaktifkan</h3>
                </div>

                <form method="POST" action="{{ url('/two-factor-setup') }}" class="space-y-4">
                    @csrf

                    <div>
                        <label for="code" class="block text-ink text-[12px] font-bold uppercase tracking-wider mb-2">
                            Masukkan 6 Digit Kode dari Aplikasi
                        </label>
                        <div class="max-w-[240px]">
                            <input
                                type="text"
                                name="code"
                                id="code"
                                inputmode="numeric"
                                pattern="[0-9]*"
                                maxlength="6"
                                placeholder="123456"
                                required
                                class="w-full bg-cream text-ink font-mono font-bold text-center text-2xl tracking-[0.3em] py-2.5 px-3 rounded-[5px] border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <p class="text-[11px] text-muted mt-1.5">
                            Ketikkan kode yang sedang tampil di Google Authenticator Anda saat ini.
                        </p>
                    </div>

                    <div class="pt-2">
                        <x-button
                            type="submit"
                            variant="primary"
                            class="w-full justify-center text-[13px] py-3.5 tracking-wider uppercase"
                        >
                            Konfirmasi &amp; Aktifkan 2FA <span>↗</span>
                        </x-button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Help Notice -->
        <div class="mt-6 text-center">
            <span class="text-[11px] text-muted">
                Mengalami kendala aktivasi? Hubungi Product Owner / Administrator Nabe Coffee.
            </span>
        </div>
    </div>

    <!-- Script for copy buttons -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const copySecretBtn = document.getElementById('copy-secret-btn');
            const secretKeyDisplay = document.getElementById('secret-key-display');
            if (copySecretBtn && secretKeyDisplay) {
                copySecretBtn.addEventListener('click', function () {
                    navigator.clipboard.writeText(secretKeyDisplay.innerText.trim()).then(function () {
                        copySecretBtn.innerText = 'Tersalin!';
                        setTimeout(() => copySecretBtn.innerText = 'Salin', 2000);
                    });
                });
            }

            const copyCodesBtn = document.getElementById('copy-codes-btn');
            if (copyCodesBtn) {
                copyCodesBtn.addEventListener('click', function () {
                    const codes = @json($backupCodes);
                    navigator.clipboard.writeText(codes.join('\n')).then(function () {
                        copyCodesBtn.innerText = 'Semua Tersalin!';
                        setTimeout(() => copyCodesBtn.innerText = 'Salin Semua Kode', 2000);
                    });
                });
            }
        });
    </script>
@endsection

