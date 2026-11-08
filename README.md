# Nabe Coffee — Sistem Informasi Company Profile & Reservasi Multi-Cabang

Sistem informasi company profile dan reservasi multi-cabang untuk **Nabe Coffee** (Yogyakarta). Sistem ini dilengkapi forecasting menu terbaik, chatbot rekomendasi, skor risiko no-show, dan notifikasi real-time per cabang.

Capstone Project Kelompok 3, Program Studi Sistem Informasi, Fakultas Teknologi Informasi, Universitas Mercu Buana Yogyakarta, 2026.

> Spesifikasi produk: [docs/PRD.md](docs/PRD.md) · Aturan kerja tim: [CONTRIBUTING.md](CONTRIBUTING.md) · Aturan agent AI: [AGENTS.md](AGENTS.md) · Riwayat: [CHANGELOG.md](CHANGELOG.md)

---

## Fitur utama

**Sisi pelanggan (web publik)**
- Company profile: landing page, galeri, visi-misi, info 4 cabang + Google Maps
- Katalog menu dengan kategori, filter harga, label *Terlaris*, dan penanda promo
- Reservasi multi-cabang dengan cek sisa kuota real-time dan 3 alternatif otomatis saat penuh
- Pre-order menu dengan pembayaran lunas / DP, atau order langsung di outlet
- Chatbot 24/7 untuk rekomendasi menu, promo, jam, lokasi, dan status reservasi

**Sisi manajemen (admin panel)**
- Login Owner dan Admin Cabang, dengan data terisolasi per cabang
- Data master cabang, menu, dan kuota, serta CMS konten dan promosi
- Kelola status reservasi (Confirmed, Canceled, Rescheduled, Completed)
- Dashboard analitik, heatmap jam sibuk, ranking menu, dan daftar risiko no-show
- Notifikasi ke grup Telegram dan email per cabang, dengan perintah bot `/hariini`, `/konfirmasi`, `/batal`

## Stack

Laravel 12 (PHP 8.2+) · MySQL · Blade + Tailwind CSS 4 + Vite · Python (modul AI) · Telegram Bot API

## Menjalankan secara lokal

### Prasyarat
- PHP 8.2+ dan Composer
- Node.js 20+ dan npm
- MySQL 8 (atau MariaDB 10.6+)
- Git

### Langkah

```bash
git clone https://github.com/Hasbi1605/nabe-coffee.git
cd nabe-coffee
```

1. Buat database kosong bernama `nabe_coffee_db` di MySQL.
2. Salin konfigurasi lalu sesuaikan `DB_USERNAME` dan `DB_PASSWORD`:
   ```bash
   cp .env.example .env
   ```
3. Install dan siapkan semuanya:
   ```bash
   composer setup
   ```
   Perintah ini menjalankan `composer install`, `key:generate`, `migrate`, `npm install`, dan `npm run build`.
4. Jalankan server pengembangan (web server, queue, log, dan Vite sekaligus):
   ```bash
   composer dev
   ```
5. Buka http://localhost:8000

### Perintah lain

| Perintah | Fungsi |
|---|---|
| `php artisan test` | Menjalankan semua tes |
| `./vendor/bin/pint` | Merapikan format kode PHP |
| `php artisan migrate:fresh --seed` | Reset database dan isi data contoh |

## Struktur folder penting

```
app/            Kode Laravel (Models, Http, Services, Notifications, ...)
ai/             Service Python untuk modul AI (chatbot, forecasting, no-show)
database/       Migration, seeder, factory
docs/           Dokumen proyek (PRD)
resources/      View Blade, CSS, JS
routes/         Definisi route
tests/          Feature & Unit test
```

## Tim

| Nama | Peran | GitHub |
|---|---|---|
| Muhammad Hasbi Ash Shiddiqi | Product Owner | [Hasbi1605](https://github.com/Hasbi1605) |
| Darrel Radhitya Aryastya Rianto | Scrum Master | [DarrelRadhitya](https://github.com/DarrelRadhitya) |
| Rian Deo Arbi Sembiring | Development Team (Frontend / QA) | [riandeoarbi-a11y](https://github.com/riandeoarbi-a11y) |
| Ferdi | Development Team (Backend) | [Ferdii08](https://github.com/Ferdii08) |
| M Galih Novan Pratama | Development Team (Database / Backend) | [GalihNovanP](https://github.com/GalihNovanP) |
| Ariq Fairuza Kusman | Development Team (Frontend) | [ariqfairuza23](https://github.com/ariqfairuza23) |
| Setiawan Yudawira | Development Team (AI & Integrasi) | [yudawiraa](https://github.com/yudawiraa) |

## Cara berkontribusi

1. Ambil tugas sesuai ID di sprint backlog.
2. Buat branch dari `main`, misalnya `feat/3.3-ui-katalog-menu`.
3. Commit, push, lalu buka Pull Request ke `main`.
4. Tunggu review. **Merge ke `main` hanya dilakukan oleh Product Owner.**

Detail lengkap ada di [CONTRIBUTING.md](CONTRIBUTING.md).
