# Changelog

Semua perubahan penting pada proyek ini dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/). Setiap rilis sprint diberi versi `0.<nomor-sprint>.0`, misalnya `0.1.0` untuk Sprint 1.

## Cara menambah entri

Setiap PR **wajib** menambahkan satu baris di bagian `[Unreleased]`, di bawah kategori yang sesuai:

- **Added**: fitur baru
- **Changed**: perubahan pada fitur yang sudah ada
- **Fixed**: perbaikan bug
- **Removed**: fitur atau file yang dihapus
- **Security**: perbaikan terkait keamanan

Format baris: `- <deskripsi singkat> (<ID tugas>, #<nomor PR>)`

Contoh: `- Halaman login admin (1.2, #4)`

Di akhir setiap sprint, PM memindahkan isi `[Unreleased]` ke versi baru dengan tanggal.

---

## [Unreleased]

### Added
- Dokumen proyek: `AGENTS.md`, `CONTRIBUTING.md`, `docs/PRD.md`, dan `README.md` khusus Nabe Coffee
- Template Pull Request, template issue tugas, dan `CODEOWNERS`
- Tugas 1.5 Two-Factor Authentication (Google Authenticator) di sprint backlog, PRD, dan AGENTS.md
- Keputusan hosting AWS EC2 Free Tier, dan diagram layer sistem untuk UTS (`docs/diagram-layer-sistem.png`)
- `DESIGN.md` dari Figma Nabe Coffe, dan token warna & font di `resources/css/app.css`
- Prototipe desain (React, acuan saja) di `docs/prototype/`, logo resmi Nabe di `docs/brand/` dan `public/images/brand/`

### Changed
- Warna `primary` diganti ke `#006d8b` mengikuti warna logo resmi Nabe

## [0.0.0] - 2026-10-21

### Added
- Inisialisasi proyek Laravel 12 dengan konfigurasi MySQL dan locale Indonesia (Darrel)
