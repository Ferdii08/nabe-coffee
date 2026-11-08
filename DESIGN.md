# DESIGN.md

Acuan tampilan untuk semua tugas UI. Kalau ada yang tidak tercantum di sini, buka prototipe dan ikuti tampilannya. Jangan bikin gaya baru sendiri.

| Sumber | Lokasi |
|---|---|
| **Prototipe** (acuan utama) | Kode: [`docs/prototype/`](docs/prototype/README.md) · Online: https://visa-width-30826922.figma.site/ |
| Figma (70 layar + panduan gaya `/style`) | https://www.figma.com/design/S58xD2VbByVWqj2DdpRO2e/Nabe-Coffe (minta akses ke Hasbi) |
| Logo resmi dari Nabe | [`docs/brand/`](docs/brand/) (asli), [`public/images/brand/`](public/images/brand/) (versi web) |

Kalau prototipe dan Figma berbeda, ikuti prototipe.

**Prototipe hanya acuan.** Aplikasi tetap dibangun dengan Blade, bertahap sesuai tugas. Ambil bagian prototipe yang sesuai tugasmu saja, jangan memindahkan seluruh halaman sekaligus. Aturan lengkapnya ada di [docs/prototype/README.md](docs/prototype/README.md).

---

## 1. Warna

Token sudah dipasang di `resources/css/app.css`, jadi cukup pakai kelas Tailwind seperti `bg-primary`, `text-ink`, atau `border-line`. **Jangan menulis kode hex langsung di Blade.**

| Token | Hex | Dipakai untuk |
|---|---|---|
| `primary` | `#006d8b` | Tombol utama, link, topline. Sama dengan warna logo resmi |
| `primary-dark` | `#064b58` | Teks di atas `lime`, hover |
| `ink` | `#153e43` | Warna teks utama, judul |
| `muted` | `#5c6f6f` | Teks sekunder, keterangan, footer |
| `cream` | `#f8f7f2` | Latar halaman |
| `line` | `#d9dfd8` | Garis, border kartu & input |
| `soft` | `#e9eee5` | Latar panel netral, baris tabel selang-seling |
| `lime` | `#d7ed8d` | Aksen, tombol sekunder di atas foto, teks "See you at Nabe" |
| `gold` | `#efcb79` | Badge Terlaris & Pending |
| `red` | `#cc4639` | Error, tombol hapus, outline fokus |
| `orange` | `#edac6b` | Aksen ilustrasi saja (jarang) |

Latar halaman selalu `cream`, bukan putih. Putih hanya untuk kartu, input, panel admin, dan teks di atas `primary`.

**Catatan warna logo:** `primary` disamakan dengan teal logo resmi (`#006d8b`, keputusan PM 8 Nov 2026). Prototipe dan Figma masih memakai warna lama `#086676`, jadi kalau terlihat sedikit berbeda, yang benar adalah token di `app.css`. Logo selalu dipakai dari file resminya, jangan diwarnai ulang.

## 2. Tipografi

| Peran | Font | Ukuran | Catatan |
|---|---|---|---|
| Judul hero beranda | Barlow Condensed Bold | `clamp(75px, 7.5vw, 108px)` | Hanya di hero beranda |
| Judul halaman (h1) | Barlow Condensed Bold | `clamp(60px, 6vw, 86px)` | Huruf besar, line-height 0.97 |
| Judul section (h2) | Barlow Condensed Bold | `clamp(36px, 3.7vw, 56px)` | Huruf besar |
| Subjudul (h3) | DM Sans Bold | 20px | line-height 1.2 |
| Isi | DM Sans Regular | 16px | line-height 1.7 |
| Keterangan | DM Sans Regular | 13px | Warna `muted` |
| Eyebrow / label navigasi | DM Sans Bold | 10–12px | Huruf besar, `tracking-wider` |
| Tombol | DM Sans Bold | 13px | |

Kelas Tailwind: `font-display` untuk Barlow Condensed, `font-sans` (default) untuk DM Sans.

**Font disimpan lokal, bukan dari Google Fonts.** File TTF ada di `docs/prototype/public/assets/fonts/` (lisensi OFL, boleh dipakai). Di tugas #3, salin ke `public/fonts/` dan pindahkan aturan `@font-face` dari `docs/prototype/src/styles/fonts.css` ke `resources/css/app.css`.

**Bahasa:** judul besar boleh bahasa Inggris pendek bergaya santai, contohnya "LIGHT UP YOUR DAY with Nabe." dan "GOOD DAYS, TOGETHER.". Selain judul, semua teks bahasa Indonesia: isi, tombol, label form, dan pesan error.

## 3. Layout & jarak

| | Nilai |
|---|---|
| Desain dasar | Mobile 390px, desktop 1440px |
| Breakpoint | `≤760px` HP, `≤1100px` tablet, `≥1600px` layar lebar |
| Lebar maksimal konten | 1600px, rata tengah |
| Padding section | Desktop `75px 7.1%`, HP `50px 22px` (class `.section` di prototipe) |
| Teks panjang | Maksimal ±850px per baris |

**Layout publik** (dibuat Darrel di #3), urutan dari atas:
1. Topline `primary` setinggi 30px: "GOOD COFFEE. GOOD COMPANY." (putih) + "See you at Nabe" (`lime`), 10px.
2. Header latar `cream`, logo di tengah, menu di kiri-kanan, tombol "Reservasi Sekarang" di kanan.
3. Konten.
4. Footer: logo + tagline, alamat & jam, daftar link, baris hak cipta warna `muted`.
5. Tombol chatbot "Hai, Nabe di sini!" mengambang di kanan bawah, bentuk pil `primary`. Fungsinya dikerjakan di tugas 6.2. Sebelum itu, tombolnya belum perlu dipasang.

**Layout admin** (dibuat Rian di #6): ikuti `AdminDemo.tsx` di prototipe. Sidebar kiri, topbar, konten di latar `cream`, panel putih berborder `line`.

## 4. Komponen

Komponen Blade disimpan di `resources/views/components/`. Yang membuat pertama kali adalah PIC yang paling dulu membutuhkannya. Setelah komponen itu masuk ke `main`, anggota lain memakainya, tidak membuat versi sendiri.

| Komponen | File | Gaya (dari prototipe) | Dibuat di |
|---|---|---|---|
| Tombol | `button.blade.php` | Padding `16px 24px`, radius 5px, Bold 13px. Varian di bawah | #3 (Darrel) |
| Input form | `input.blade.php` | Latar putih, border `line`, radius 5px, label di atas, pesan error `red` di bawah | #3 |
| Badge | `badge.blade.php` | Padding `6px 10px`, radius 4px, Bold 10px | #3 |
| Kartu statistik (admin) | `stat-card.blade.php` | Latar putih, border `line`, padding 22px, radius 5px | #6 (Rian) |
| Kartu menu | `menu-card.blade.php` | Foto 4:3, nama, harga, badge Terlaris/Promo | #10 (Ariq) |
| Kartu cabang | `branch-card.blade.php` | Nama, alamat, jam, tombol WhatsApp + peta | #9 (Setiawan) |

**Varian tombol:**

| Varian | Latar | Teks | Dipakai di |
|---|---|---|---|
| `primary` | `primary` | putih | Aksi utama |
| `outline` | transparan, border 1px `primary` | `primary` | Aksi kedua ("Lihat Menu") |
| `lime` | `lime` | `primary-dark` | Tombol di atas foto hero |
| `glass` | putih 7% + border putih 44% | putih | Tombol kedua di atas foto |
| `light` | `cream` | `primary` | Di atas latar `primary` |

**Warna badge** (dari `StatusBadge` di prototipe; tokennya sudah ada di `app.css`):

| Badge | Kelas Tailwind |
|---|---|
| Pending, Terlaris | `bg-gold text-gold-ink` |
| Confirmed, Terkirim | `bg-sage text-sage-ink` |
| Rescheduled, label umum | `bg-sky text-primary-dark` |
| Canceled | `bg-grey text-grey-ink` |
| Completed | `bg-charcoal text-white` |
| Promo, Gagal | `bg-blush text-blush-ink` |

**Interaksi:**
- Hover tombol: sedikit lebih gelap (`hover:brightness-95`).
- Fokus keyboard: outline 3px `red` dengan jarak 4px. Sudah dipasang global di `app.css`, jangan dihapus.
- Radius: 4px untuk badge, 5px untuk tombol, input, kartu, dan panel, serta bulat penuh untuk tombol chatbot dan avatar.
- Bayangan seminimal mungkin. Tombol chatbot `0 5px 20px` warna gelap 14%; modal `0 10px 50px rgb(0 0 0 / .2)`.
- Hormati `prefers-reduced-motion`. Animasi dimatikan kalau pengguna memintanya.

## 5. Gambar & aset

- **Logo resmi:**
  - `public/images/brand/logo-nabe-480.png`: header dan footer, ditampilkan setinggi ±56px.
  - `logo-nabe-160.png`: tempat kecil, misalnya halaman login.
  - `favicon-64.png`: favicon, bentuk kubah saja.
  - Jangan diwarnai ulang, diregangkan, atau diberi efek. Untuk latar gelap, minta versi putih ke PM.
- Foto masih placeholder Unsplash, ada di `docs/prototype/public/assets/placeholders/` (lisensi di `ASSET-LICENSES.md`). Salin yang dipakai ke `public/images/`, nama file huruf kecil pakai tanda hubung. Foto asli menyusul dari mitra.
- Foto menu rasio 4:3. Semua foto pakai `object-cover`.
- Ikon pakai SVG inline, satu gaya garis (stroke 1.5–2px). Jangan pakai emoji sebagai ikon.

## 6. Halaman prototipe dan tugasnya

Semua path di bawah relatif ke `docs/prototype/src/`.

| Bagian di prototipe | Letak kode | Tugas | PIC |
|---|---|---|---|
| Topline, header, footer | `App.tsx` (class `topline`, `header`, `footer`) | 1.2 (layout publik) | Darrel |
| Login admin | `components/AdminDemo.tsx`, fungsi `Operations` (class `admin-login`) | 1.2 | Darrel |
| Sidebar admin & dashboard | `components/AdminDemo.tsx`, fungsi `Operations` + `Dashboard` | 2.1 | Rian |
| Admin: kuota | `components/AdminDemo.tsx`, fungsi `QuotaOperations` | 2.2 | Ferdi |
| Admin: menu | `components/AdminDemo.tsx`, fungsi `CmsOperations` (bagian menu) | 2.2 | Ferdi |
| Beranda | `App.tsx`, fungsi `NabeSite` (view `home`) | 3.1 | Darrel |
| About | `components/StageThreePublic.tsx`, fungsi `AboutPage` | 3.1 | Darrel |
| Outlet / info cabang | `components/StageThreePublic.tsx`, fungsi `OutletPage` + data `branches` di `components/NabeUI.tsx` | 3.2 | Setiawan |
| Katalog menu | `components/StageThreePublic.tsx`, fungsi `MenuPage` | 3.3 | Ariq |
| Admin: CMS halaman & promo | `components/AdminDemo.tsx`, fungsi `CmsOperations` | 3.4 | Hasbi |
| Reservasi | `App.tsx`, blok `view === "reservation"` | 4.2 (Sprint 4) | Ariq |
| Status reservasi | `components/StageThreePublic.tsx`, fungsi `StatusPage` | 4.4 (Sprint 4) | Rian |
| Admin: pembayaran | `components/AdminDemo.tsx`, fungsi `PaymentOperations` | 5.2 (Sprint 5) | Hasbi |
| Admin: kelola reservasi | `components/AdminDemo.tsx`, fungsi `ReservationOperations` | 5.3 (Sprint 5) | Ferdi |
| Widget chatbot | `App.tsx` (class `chat-widget`) | 6.2 (Sprint 6) | Darrel |
| Admin: grafik tren & heatmap | `components/AdminDemo.tsx`, fungsi `Dashboard` | 6.4 (Sprint 6) | Rian |
| Admin: log notifikasi | `components/AdminDemo.tsx`, fungsi `NotificationOperations` | 7.1 / 7.2 (Sprint 7) | Setiawan / Hasbi |

Halaman admin untuk CRUD cabang belum ada di prototipe. Ferdi membuatnya dengan pola tabel dan form yang sama seperti `QuotaOperations`.

**Halaman 2FA belum ada di prototipe.** Darrel membuatnya di #3 dengan gaya yang sama seperti halaman login admin.

**Ada di prototipe tapi tidak ada di sprint backlog. Jangan dikerjakan sebelum diputuskan PM:**
career, partnership, proposal, facility, article (`components/StageTwo.tsx`), news (`NewsPage`), komunitas, dan admin pelanggan (`CustomerOperations`). Menu header yang mengarah ke halaman-halaman ini disembunyikan dulu.

## 7. Cek sebelum PR tampilan

- [ ] Sudah dibandingkan dengan bagian yang sama di prototipe
- [ ] Hanya bagian yang sesuai tugas, bukan satu halaman penuh sekaligus
- [ ] Hanya memakai token warna dari §1 dan §4, tidak ada hex di Blade
- [ ] Rapi di lebar 390px dan 1440px (screenshot keduanya di PR)
- [ ] Teks bahasa Indonesia, kecuali judul besar
- [ ] Fokus keyboard terlihat
