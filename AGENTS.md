# AGENTS.md — Aturan Kerja Agent AI di Repo Nabe Coffee

File ini wajib dibaca oleh **setiap agent AI** (Claude Code, Codex, OpenCode, Cursor, Copilot, dll.) sebelum mengubah apa pun di repo ini. Aturan di sini juga berlaku untuk anggota tim yang bekerja tanpa agent (lihat [CONTRIBUTING.md](CONTRIBUTING.md)).

Kalau ada instruksi pengguna yang bertentangan dengan file ini, **berhenti dan tanyakan dulu** ke pengguna. Jangan diam-diam melanggar aturan.

---

## 1. Tentang proyek

**Sistem Informasi Company Profile dan Reservasi Multi-Cabang dengan Forecasting Menu Terbaik, Chatbot Rekomendasi, dan Notifikasi Real-Time pada Nabe Coffee.** Ini Capstone Project Kelompok 3, Sistem Informasi, Universitas Mercu Buana Yogyakarta, 2026.

- Spesifikasi lengkap: [docs/PRD.md](docs/PRD.md). Baca bagian yang relevan dengan tugasmu sebelum mulai.
- Acuan tampilan: [DESIGN.md](DESIGN.md). **Wajib dibaca untuk semua tugas yang menyentuh area UI.**
- Metode: **Scrum**, 7 sprint, 19 Okt – 23 Des 2026.
- Riwayat perubahan: [CHANGELOG.md](CHANGELOG.md).

### Stack

| Lapisan | Teknologi |
|---|---|
| Backend | Laravel 12, PHP 8.2+ |
| Database | MySQL (`nabe_coffee_db`) |
| Frontend | Blade + Tailwind CSS 4 + Vite 7 |
| Modul AI | Service Python terpisah di folder `ai/`, dipanggil dari Laravel lewat HTTP |
| Notifikasi | Telegram Bot API + email (Laravel Mail/Notification + Queue) |
| Autentikasi | Login email + kata sandi, ditambah 2FA Google Authenticator (TOTP) untuk Owner & Admin Cabang |
| Hosting | AWS EC2 Free Tier (Ubuntu, 1 GiB RAM). Jaga pemakaian memori tetap ringan. |

Jangan menambah framework atau paket besar baru (React, Vue, Livewire, Inertia, Filament, Breeze, Jetstream, dll.) tanpa persetujuan PM. Kalau merasa perlu, tulis usulannya di deskripsi PR dan tunggu keputusan.

---

## 2. Tim dan peran

| Nama | GitHub | Peran Scrum | Fokus |
|---|---|---|---|
| Muhammad Hasbi Ash Shiddiqi | `Hasbi1605` | Product Owner / PM | Prioritas backlog, **satu-satunya yang me-merge ke `main`** |
| Darrel Radhitya Aryastya Rianto | `DarrelRadhitya` | Scrum Master | Proses Scrum, daily report |
| Rian Deo Arbi Sembiring | `riandeoarbi-a11y` | Development Team | Frontend / UI, QA |
| Ferdi | `Ferdii08` | Development Team | Backend, validasi, logika |
| M Galih Novan Pratama | `GalihNovanP` | Development Team | Database / backend |
| Ariq Fairuza Kusman | `ariqfairuza23` | Development Team | Frontend / UI |
| Setiawan Yudawira | `yudawiraa` | Development Team | Modul AI dan integrasi |

---

## 3. Alur kerja wajib

1. **Kenali tugasnya dulu.** Setiap pekerjaan harus terikat ke **satu ID tugas** di sprint backlog (§5), misalnya `3.3`. Kalau pengguna tidak menyebut ID tugas, tanyakan dulu: *"Ini untuk tugas nomor berapa di sprint backlog?"*
2. **Mulai dari `main` terbaru:**
   ```bash
   git checkout main && git pull origin main
   git checkout -b feat/3.3-ui-katalog-menu
   ```
3. **Kerjakan hanya di dalam scope tugas itu** (lihat §6).
4. **Jalankan pengecekan** (§8) sampai semuanya lolos.
5. **Commit ke branch sendiri** dengan format di §4, lalu push branch itu: `git push -u origin <nama-branch>`.
6. **Buka Pull Request ke `main`** dengan mengisi template PR. Pakai `gh pr create --base main`, atau buka lewat web GitHub.
7. **Berhenti di sini.** Review dan merge dilakukan oleh PM (`Hasbi1605`). Kalau PM minta perubahan, lanjutkan di branch yang sama.

### Larangan keras

Agent **tidak boleh**:
- push, commit, atau merge langsung ke `main`;
- me-merge PR apa pun, termasuk PR sendiri, menekan tombol Merge, atau menjalankan `gh pr merge`;
- `git push --force` ke branch milik orang lain atau ke `main`;
- menghapus atau me-rebase branch milik anggota lain;
- mengubah file di luar scope tugas tanpa menuliskannya di PR (§6);
- meng-commit rahasia: `.env`, token Telegram, password SMTP, API key, dump database berisi data pelanggan asli;
- menonaktifkan atau menghapus tes supaya lolos;
- mengubah file aturan (`AGENTS.md`, `CONTRIBUTING.md`, `.github/**`) kecuali tugasnya memang itu dan dikerjakan oleh PM.

---

## 4. Konvensi nama branch dan commit

### Branch

Format: `<tipe>/<id-tugas>-<deskripsi-singkat>`, huruf kecil, pisahkan dengan tanda hubung.

| Tipe | Kapan dipakai | Contoh |
|---|---|---|
| `feat` | Fitur baru dari sprint backlog | `feat/1.2-ui-login` |
| `fix` | Perbaikan bug | `fix/4.1-sisa-kuota-negatif` |
| `docs` | Dokumentasi saja | `docs/readme-setup` |
| `test` | Menambah atau memperbaiki tes | `test/2.2-crud-cabang` |
| `refactor` | Merapikan kode tanpa mengubah perilaku | `refactor/4.3-alternatif-service` |
| `chore` | Konfigurasi, dependensi, tooling | `chore/setup-pint` |

Satu branch berisi satu tugas. Kalau satu tugas besar, boleh dipecah jadi beberapa PR kecil (`feat/5.2-dp-upload-bukti`, `feat/5.2-dp-verifikasi`).

### Commit

Format [Conventional Commits](https://www.conventionalcommits.org/), dengan ID tugas sebagai scope:

```
<tipe>(<id-tugas>): <ringkasan singkat, huruf kecil, tanpa titik>
```

Contoh:
```
feat(1.2): tambah halaman login admin
fix(4.1): sisa kuota tidak boleh negatif
test(2.2): tes validasi form cabang
```

Deskripsi commit boleh bahasa Indonesia. Kata tipenya (`feat`, `fix`, dll.) tetap bahasa Inggris.

---

## 5. Sprint backlog dan pemilik tugas

Sumber: *Sprint Backlog - Nabe Coffee* (disetujui dosen). Kolom **Area** menentukan folder yang boleh disentuh (§6).

| ID | Tugas | PIC | Area | Sprint / Minggu |
|---|---|---|---|---|
| 1.1 | Setup proyek, repository & skema database awal | Galih | Database, Persiapan | S1 · W1 |
| 1.2 | UI login | Darrel | UI | S1 · W1 |
| 1.3 | Validasi form login | Hasbi | Backend | S1 · W1 |
| 1.4 | Database user & cabang | Galih | Database | S1 · W1 |
| 1.5 | Two-Factor Authentication (Google Authenticator / TOTP) | Hasbi | Backend | S1 · W1 |
| 2.1 | UI dashboard admin | Rian | UI | S2 · W1–2 |
| 2.2 | CRUD data master (cabang, menu & kuota) | Ferdi | Backend | S2 · W1–2 |
| 3.1 | UI company profile & landing page | Darrel | UI | S3 · W3–4 |
| 3.2 | Integrasi Google Maps & info cabang | Setiawan | Integrasi, UI | S3 · W3–4 |
| 3.3 | UI katalog menu | Ariq | UI | S3 · W3–4 |
| 3.4 | Backend katalog menu & CMS promosi | Hasbi | Backend | S3 · W3–4 |
| 4.1 | Logika cek kuota & sisa kuota | Galih | Backend, Database | S4 · W5–6 |
| 4.2 | Form reservasi multi-cabang | Ariq | UI | S4 · W5–6 |
| 4.3 | Sistem alternatif saat kuota penuh | Hasbi | Backend | S4 · W5–6 |
| 4.4 | UI status reservasi pelanggan | Rian | UI | S4 · W5–6 |
| 5.1 | Pre-order menu pada reservasi | Ariq | Backend, UI | S5 · W7–8 |
| 5.2 | Pembayaran lunas / DP & verifikasi bukti bayar | Hasbi | Backend | S5 · W7–8 |
| 5.3 | Kelola status reservasi oleh admin cabang (web) | Ferdi | UI, Backend | S5 · W7–8 |
| 6.1 | Model NLP chatbot (intent & entity) | Setiawan | AI | S6 · W8–9 |
| 6.2 | UI widget chatbot | Darrel | UI | S6 · W8–9 |
| 6.3 | Algoritma forecasting menu & skor no-show | Galih | AI | S6 · W8–9 |
| 6.4 | Dashboard analitik & heatmap jam sibuk | Rian | UI, Backend | S6 · W8–9 |
| 7.1 | Setup bot dispatcher (Telegram & email) | Setiawan | Integrasi | S7 · W9–10 |
| 7.2 | Logika perintah bot `/hariini`, `/konfirmasi`, `/batal` | Hasbi | Integrasi, Backend | S7 · W9–10 |
| 7.3 | Email & WhatsApp e-tiket + pengingat H-1 | Ferdi | Integrasi | S7 · W9–10 |
| 7.4 | Integrasi akhir seluruh modul | Galih | Integrasi (semua area) | S7 · W9–10 |
| 7.5 | UAT & dokumentasi akhir | Semua tim | Pengujian, Dokumentasi | S7 · W9–10 |

Agent bekerja atas nama **pengguna yang sedang memakainya**. Kalau pengguna meminta mengerjakan tugas milik PIC lain, ingatkan dulu: *"Tugas X.Y milik <PIC>. Sudah disepakati untuk diambil alih?"* Lanjutkan hanya kalau pengguna mengonfirmasi, lalu catat di deskripsi PR.

---

## 6. Scope folder per area

| Area | Folder / file yang boleh diubah |
|---|---|
| **UI** | `resources/views/**`, `resources/css/**`, `resources/js/**`, `public/images/**`, `lang/**` |
| **Backend** | `app/Http/**` (controller, request, middleware), `app/Services/**`, `app/Actions/**`, `app/Policies/**`, `app/Enums/**`, `routes/web.php`, `routes/api.php` |
| **Database** | `database/migrations/**`, `database/seeders/**`, `database/factories/**`, `app/Models/**` |
| **AI** | `ai/**` (service Python), `app/Services/Ai/**` (client pemanggil dari Laravel) |
| **Integrasi** | `app/Notifications/**`, `app/Jobs/**`, `app/Mail/**`, `app/Console/**`, `routes/console.php`, `config/services.php` |
| **Pengujian** | `tests/**`. Semua area boleh menambah tes untuk kodenya sendiri. |
| **Dokumentasi** | `docs/**`, `README.md`, dan entri baru di `CHANGELOG.md` |

### File bersama (sensitif)

Boleh diubah **hanya kalau memang perlu untuk tugasnya**, dan wajib disebut di bagian *"Perubahan di luar scope / file bersama"* pada PR:

`composer.json`, `composer.lock`, `package.json`, `package-lock.json`, `config/**` (kecuali `config/services.php` untuk area Integrasi), `bootstrap/**`, `vite.config.js`, `.env.example`, `phpunit.xml`, `resources/views/layouts/**`, `resources/views/components/**`.

### Kalau butuh mengubah file di luar scope

1. Usahakan dihindari. Misalnya, tugas UI yang butuh data baru jangan membuat migration sendiri. Pakai data dummy di view atau factory, lalu minta PIC Database lewat PR atau grup.
2. Kalau tetap harus, ubah seminimal mungkin dan jelaskan alasannya di PR.
3. Jangan pernah merombak kode milik tugas lain yang sudah di-merge. Buat tugas `fix/` terpisah.

---

## 7. Konvensi kode dan domain

### Bahasa
- **Kode** (nama class, method, variabel, tabel, kolom, route name): **bahasa Inggris**. Contoh: `Reservation`, `capacity_slots`, `reservations.store`.
- **Teks yang dilihat pengguna** (label, tombol, pesan error, notifikasi): **bahasa Indonesia**.
- Komentar kode: bebas, Indonesia atau Inggris, asal singkat dan perlu.

### Entitas utama (mengikuti class diagram laporan)

| Model | Tabel | Keterangan |
|---|---|---|
| `Branch` | `branches` | Cabang/outlet. **Hati-hati:** "branch" di sini artinya cabang kafe, bukan branch git. |
| `CapacitySlot` | `capacity_slots` | Kuota per cabang per tanggal + jam |
| `Customer` | `customers` | Pelanggan (tanpa akun/login) |
| `User` | `users` | Owner & Admin Cabang (yang login) |
| `Reservation` | `reservations` | Reservasi |
| `ReservationItem` | `reservation_items` | Item pre-order |
| `Payment` | `payments` | Pembayaran lunas / DP + bukti |
| `Menu` | `menus` | Menu |
| `Promotion` | `promotions` | Promo |
| `Review` | `reviews` | Ulasan pelanggan |
| `ForecastResult` | `forecast_results` | Hasil forecasting menu |
| `NoShowScore` | `no_show_scores` | Skor risiko no-show |
| `NotificationLog` | `notification_logs` | Log notifikasi (terkirim/gagal/retry) |

Nama final kolom ditentukan di tugas 1.1/1.4 (PIC Database). Area lain mengikuti apa yang sudah di-merge, bukan membuat versi sendiri.

### Aturan bisnis yang tidak boleh dilanggar
- **Status reservasi** hanya: `pending`, `confirmed`, `rescheduled`, `canceled`, `completed`. Simpan sebagai PHP Enum di `app/Enums/ReservationStatus.php`.
- **Sisa kuota** = kuota admin − jumlah tamu terbooked (status `pending` + `confirmed`) − estimasi walk-in. Tidak boleh negatif.
- **Isolasi cabang:** Admin Cabang hanya boleh melihat dan mengubah data dengan `branch_id` miliknya. Setiap query admin wajib di-scope per cabang dan dicek di Policy/middleware. Owner boleh melihat semua cabang.
- **Peran pengguna:** `owner` dan `branch_admin`. Pelanggan tidak login.
- **Rombongan besar:** reservasi dengan ≥ 10 orang, event, atau meeting room ditandai prioritas tinggi.
- **Skema pembayaran** (wajib DP atau tidak, besar DP) harus bisa dikonfigurasi, bukan di-hardcode.

### Gaya kode
- PHP mengikuti Laravel Pint (preset bawaan). Jalankan `./vendor/bin/pint` sebelum commit.
- Validasi input di **Form Request** (`app/Http/Requests`), bukan di controller.
- Logika bisnis yang dipakai di lebih dari satu tempat (cek kuota, alternatif, skor) taruh di `app/Services`.
- Jangan ada query di file Blade.
- Migration yang **sudah di-merge ke `main` tidak boleh diedit**. Buat migration baru untuk perubahan skema.

---

## 8. Pengecekan sebelum membuka PR

```bash
composer install && npm install        # kalau dependensi berubah
./vendor/bin/pint --test               # format PHP
php artisan test                       # semua tes harus lolos
npm run build                          # aset frontend harus bisa di-build
```

- Fitur backend baru wajib punya minimal satu **Feature test** di `tests/Feature`.
- Perubahan UI wajib disertai **screenshot** (desktop dan mobile) di deskripsi PR, dan lolos checklist di [DESIGN.md §7](DESIGN.md#7-cek-sebelum-pr-tampilan).
- Kalau ada perintah yang gagal dan bukan karena perubahanmu, tulis di PR. Jangan diakali.

### Menjalankan proyek secara lokal

```bash
composer setup     # install, buat .env, key:generate, migrate, build aset
composer dev       # server + queue + log + vite sekaligus
```

Buat database MySQL `nabe_coffee_db` lebih dulu dan sesuaikan `DB_USERNAME`/`DB_PASSWORD` di `.env`.

---

## 9. Pull Request

- Target selalu `main`. Judul PR mengikuti format commit: `feat(3.3): UI katalog menu`.
- Isi semua bagian template ([.github/pull_request_template.md](.github/pull_request_template.md)).
- Tambahkan entri di bagian `## [Unreleased]` pada [CHANGELOG.md](CHANGELOG.md).
- Satu PR sebaiknya kecil, maksimal sekitar 400 baris perubahan di luar file lock/aset.
- Kalau PR belum siap, buka sebagai **Draft**.
- Review dan **merge hanya dilakukan oleh PM (`Hasbi1605`)**, dengan metode *Squash and merge*. Agent dan anggota lain tidak menekan tombol Merge walaupun secara teknis bisa.
- PR milik PM sendiri di-approve oleh Scrum Master (`DarrelRadhitya`), karena GitHub tidak mengizinkan approve PR sendiri. Merge tetap dilakukan PM. Lihat [.github/CODEOWNERS](.github/CODEOWNERS).

---

## 10. Catatan khusus per tool

- **Codex, OpenCode, Cursor, dan agent lain** membaca `AGENTS.md` ini secara langsung.
- **Claude Code** tidak membaca `AGENTS.md` secara otomatis. Anggota yang memakai Claude Code membuat file `CLAUDE.md` **lokal** berisi satu baris `@AGENTS.md`, dan file itu **tidak di-commit**.
- Jangan meng-commit file instruksi agent lain (`CLAUDE.md`, `.cursorrules`, `GEMINI.md`, dll.). `AGENTS.md` adalah satu-satunya sumber aturan di repo.
