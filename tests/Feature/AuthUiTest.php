<?php

namespace Tests\Feature;

use Illuminate\Support\MessageBag;
use Tests\TestCase;

class AuthUiTest extends TestCase
{
    public function test_public_layout_renders_with_indonesian_navigation_and_tab_title(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('<title>Nabe Coffee — Good Coffee. Good Company.</title>', false);
        $response->assertSee('GOOD COFFEE. GOOD COMPANY.', false);
        $response->assertSee('See you at Nabe', false);
        $response->assertSee('Beranda', false);
        $response->assertSee('Tentang Kami', false);
        $response->assertSee('Cabang', false);
        $response->assertSee('Menu', false);
        $response->assertSee('Kontak', false);
        $response->assertSee('Reservasi Sekarang', false);
        $response->assertSee('HUBUNGI KAMI', false);
        $response->assertSee('JELAJAH', false);
        $response->assertSee('Kusumanegara', false);
    }

    public function test_login_page_renders_with_custom_tab_title_and_required_fields(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertSee('<title>Login Admin — Nabe Coffee</title>', false);
        $response->assertSee('WELCOME BACK.', false);
        $response->assertSee('NABE / BEHIND THE COUNTER', false);
        $response->assertSee('GOOD DAYS.', false);
        $response->assertSee('WELL PLANNED.', false);
        $response->assertSee('name="email"', false);
        $response->assertSee('name="password"', false);
        $response->assertSee('name="remember"', false);
        $response->assertSee('Masuk ke Panel', false);
    }

    public function test_login_page_displays_error_alert_when_session_error_or_validation_fails(): void
    {
        $response = $this->withSession([
            'error' => 'Email atau kata sandi salah. Silakan periksa kembali kredensial Anda.',
        ])->get('/login');

        $response->assertStatus(200);
        $response->assertSee('Autentikasi gagal:', false);
        $response->assertSee('Email atau kata sandi salah. Silakan periksa kembali kredensial Anda.', false);
    }

    public function test_two_factor_challenge_page_renders_with_custom_tab_title_and_fields(): void
    {
        $response = $this->get('/two-factor-challenge');

        $response->assertStatus(200);
        $response->assertSee('<title>Verifikasi Dua Faktor — Nabe Coffee</title>', false);
        $response->assertSee('VERIFIKASI 2FA.', false);
        $response->assertSee('name="code"', false);
        $response->assertSee('name="recovery_code"', false);
        $response->assertSee('Google Authenticator', false);
        $response->assertSee('Verifikasi Kode', false);
    }

    public function test_two_factor_challenge_displays_error_for_recovery_code_properly(): void
    {
        $errors = new MessageBag([
            'recovery_code' => ['Kode cadangan sudah dipakai.'],
        ]);

        $response = $this->withSession([
            'errors' => $errors,
        ])->get('/two-factor-challenge');

        $response->assertStatus(200);
        $response->assertSee('Kode tidak valid:', false);
        $response->assertSee('Kode cadangan sudah dipakai.', false);
    }

    public function test_two_factor_setup_page_renders_with_custom_tab_title_qr_and_backup_codes(): void
    {
        $response = $this->get('/two-factor-setup');

        $response->assertStatus(200);
        $response->assertSee('<title>Aktivasi Two-Factor Authentication — Nabe Coffee</title>', false);
        $response->assertSee('AKTIVASI 2FA.', false);
        $response->assertSee('Pindai QR Code di Google Authenticator', false);
        $response->assertSee('Simpan 8 Kode Cadangan Darurat', false);
        $response->assertSee('name="code"', false);
        $response->assertSee('Konfirmasi &amp; Aktifkan 2FA', false);
    }

    public function test_two_factor_setup_displays_error_message_properly(): void
    {
        $errors = new MessageBag([
            'code' => ['Kode konfirmasi salah atau kedaluwarsa.'],
        ]);

        $response = $this->withSession([
            'errors' => $errors,
        ])->get('/two-factor-setup');

        $response->assertStatus(200);
        $response->assertSee('Aktivasi belum berhasil:', false);
        $response->assertSee('Kode konfirmasi salah atau kedaluwarsa.', false);
    }
}
