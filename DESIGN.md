# DESIGN.md

Acuan tampilan untuk semua tugas UI. Sumbernya file Figma **Nabe Coffe** (frame `/style — Panduan desain`) dan prototipe di repo `Hasbi1605/NabeCoffeeWebsiteDesign` (`src/index.css`). Kalau ada yang tidak tercantum di sini, buka Figma dan ikuti layarnya. Jangan bikin gaya baru sendiri.

Figma: https://www.figma.com/design/S58xD2VbByVWqj2DdpRO2e/Nabe-Coffe (minta akses ke Hasbi)

---

## 1. Warna

Token sudah dipasang di `resources/css/app.css`, jadi cukup pakai kelas Tailwind seperti `bg-primary`, `text-ink`, atau `border-line`. **Jangan menulis kode hex langsung di Blade.**

| Token | Hex | Dipakai untuk |
|---|---|---|
| `primary` | `#086676` | Tombol utama, link, topbar, logo |
| `primary-dark` | `#064b58` | Teks tombol outline, hover tombol utama |
| `ink` | `#153e43` | Warna teks utama, judul |
| `muted` | `#5c6f6f` | Teks sekunder, keterangan, footer |
| `cream` | `#f8f7f2` | Latar halaman |
| `line` | `#d9dfd8` | Garis, border kartu & input |
| `soft` | `#e9eee5` | Latar badge netral, latar baris tabel selang-seling |
| `lime` | `#d7ed8d` | Aksen, badge confirmed, teks "See you at Nabe" di topbar |
| `gold` | `#efcb79` | Badge Terlaris & pending |
| `blush` | `#f8dad2` | Badge promo |
| `red` | `#cc4639` | Error, tombol hapus, outline fokus |
| `orange` | `#edac6b` | Aksen ilustrasi saja (jarang) |

Latar halaman selalu `cream`, bukan putih. Putih (`#ffffff`) hanya untuk kartu, input, dan teks di atas `primary`.

## 2. Tipografi

| Peran | Font | Ukuran | Catatan |
|---|---|---|---|
| Judul halaman (h1) | Barlow Condensed Bold | `clamp(60px, 6vw, 86px)` | Huruf besar semua, line-height 0.97 |
| Judul hero beranda | Barlow Condensed Bold | `clamp(75px, 7.5vw, 108px)` | Hanya di hero beranda |
| Judul section (h2) | Barlow Condensed Bold | `clamp(36px, 3.7vw, 56px)` | Huruf besar semua |
| Subjudul (h3) | DM Sans Bold | 20px | line-height 1.2 |
| Isi | DM Sans Regular | 16px | line-height 1.7 |
| Keterangan | DM Sans Regular | 13px | Warna `muted` |
| Label navigasi / eyebrow | DM Sans Bold | 10–12px | Huruf besar, `tracking-wider` |
| Tombol | DM Sans SemiBold | 13px | |

Kelas Tailwind: `font-display` untuk Barlow Condensed, `font-sans` (default) untuk DM Sans.

Font dimuat di `<head>` layout lewat Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Bahasa:** judul besar boleh bahasa Inggris pendek bergaya santai (contoh dari Figma: "GOOD DAYS, TOGETHER.", "THE GOOD VIBES GUIDE."). Selain judul, semua teks bahasa Indonesia: isi, tombol, label form, pesan error.

## 3. Layout & jarak

| | Nilai |
|---|---|
| Desain dasar | Mobile 390px, desktop 1440px (mobile-first) |
| Breakpoint | `≤760px` HP, `≤1100px` tablet, `≥1600px` layar lebar |
| Lebar maksimal konten | 1600px, rata tengah |
| Padding section | Desktop `75px 7.1%`, HP `50px 22px` |
| Teks panjang | Maksimal ±850px per baris |

Di Tailwind 4, breakpoint bawaan (`md` 768, `lg` 1024) sudah cukup dekat, jadi tidak perlu dibuat ulang.

**Layout publik** (dibuat Darrel di #3), urutan dari atas:
1. Topline `primary` setinggi 30px, berisi "GOOD COFFEE. GOOD COMPANY." (putih) + "See you at Nabe" (`lime`), 10px huruf besar.
2. Navbar latar `cream` dengan garis bawah, logo di tengah, menu di kiri-kanan, tombol "Reservasi Sekarang" di kanan.
3. Konten.
4. Footer: logo + tagline, alamat & jam, daftar link, baris hak cipta 8px warna `muted`.
5. Tombol chatbot "Hai, Nabe di sini!" mengambang di kanan bawah (bentuk pil, `primary`). Fungsinya dikerjakan di tugas 6.2.

**Layout admin** (dibuat Rian di #6): ikuti frame `/admin — Dashboard` di Figma, dengan sidebar kiri, topbar, dan konten di latar `cream`.

## 4. Komponen

Komponen Blade disimpan di `resources/views/components/`. Yang membuat pertama kali adalah PIC yang paling dulu membutuhkannya. Setelah komponen itu masuk ke `main`, anggota lain memakainya, tidak membuat versi sendiri.

| Komponen | File | Gaya | Dibuat di |
|---|---|---|---|
| Tombol utama | `button.blade.php` (`variant="primary"`) | `bg-primary text-white`, tinggi 46px, `rounded-md` (6px), SemiBold 13px | #3 (Darrel) |
| Tombol outline | `button.blade.php` (`variant="outline"`) | Latar `cream`, border 1px `primary`, teks `primary-dark` | #3 |
| Input form | `input.blade.php` | Latar putih, border `line`, `rounded-md`, label di atas, error merah di bawah | #3 |
| Badge | `badge.blade.php` | Tinggi 25px, `rounded-sm` (4px), Bold 10px | #3 |
| Kartu menu | `menu-card.blade.php` | Foto 4:3, nama, harga, badge Terlaris/Promo | #10 (Ariq) |
| Kartu cabang | `branch-card.blade.php` | Nama, alamat, jam, tombol WhatsApp + peta | #9 (Setiawan) |

**Warna badge** (dipakai untuk status reservasi dan label menu):

| Badge | Latar | Teks |
|---|---|---|
| Terlaris | `gold` | `ink` |
| Promo | `blush` | `ink` |
| Pending | `gold` | `ink` |
| Confirmed | `lime` | `ink` |
| Rescheduled | `soft` | `ink` |
| Canceled | `soft` | `ink` |
| Completed | `ink` | putih |

**Interaksi:**
- Hover tombol: sedikit lebih gelap (`hover:brightness-95`).
- Fokus keyboard: outline 3px `red` dengan jarak 4px. Jangan dihapus, ini untuk aksesibilitas.
- Radius: 4px (badge), 5–6px (tombol, input, kartu), 10px (panel besar), bulat penuh (tombol chatbot, avatar).
- Bayangan dipakai seminimal mungkin, hanya untuk modal dan dropdown: `0 10px 50px rgb(0 0 0 / .2)`.

## 5. Gambar & aset

- **Logo resmi belum ada.** Di Figma masih teks "nabe" + label `[LOGO RESMI]`. Untuk sementara pakai teks "nabe" DM Sans Bold warna `primary`. Ganti setelah logo didapat dari mitra.
- Foto masih placeholder Unsplash. Simpan di `public/images/`, nama file huruf kecil pakai tanda hubung (`kopi-susu-aren.jpg`).
- Foto menu rasio **4:3**, foto suasana/galeri bebas, semuanya `object-cover`.
- Ikon pakai SVG inline, satu gaya garis (stroke 1.5–2px). Jangan campur dengan ikon emoji.

## 6. Layar Figma dan tugasnya

| Frame di Figma | Tugas | PIC |
|---|---|---|
| `Component 1 / Property 22` (beranda) | 3.1 | Darrel |
| `/about — Tentang Nabe` | 3.1 | Darrel |
| `/outlet — Empat cabang` | 3.2 | Setiawan |
| `/menu — Katalog lengkap` | 3.3 | Ariq |
| `/reservation — 1 Cabang`, `2 Waktu` | 4.2 (Sprint 4) | Ariq |
| `/status — Pencarian awal` | 4.4 (Sprint 4) | Rian |
| `/admin — Login demo` | 1.2 | Darrel |
| `/admin — Dashboard` | 2.1 | Rian |
| `/admin — Kelola kuota`, `CMS Menu`, `Data resmi` | 2.2 | Ferdi |
| `/admin — CMS Halaman` | 3.4 | Hasbi |
| `/admin — Pembayaran` | 5.2 (Sprint 5) | Hasbi |
| `/admin — Operasional · Reservasi` | 5.3 (Sprint 5) | Ferdi |
| `/admin — Notifikasi` | 7.1 / 7.2 (Sprint 7) | Setiawan / Hasbi |
| Tombol "Hai, Nabe di sini!" | 6.2 (Sprint 6) | Darrel |
| `/* — 404` | Bebas, ikut layout publik | — |

**Halaman 2FA belum ada di Figma.** Darrel membuatnya di #3 dengan gaya yang sama seperti `/admin — Login demo`.

**Ada di Figma tapi tidak ada di sprint backlog. Jangan dikerjakan sebelum diputuskan PM:**
`/career`, `/partnership`, `/proposal`, `/facility`, `/article` (beserta 5 artikelnya), bagian komunitas di `/community`, dan `/admin — Pelanggan`. Menu navbar yang mengarah ke halaman-halaman ini disembunyikan dulu.

## 7. Cek sebelum PR tampilan

- [ ] Sudah dibandingkan dengan frame Figma-nya
- [ ] Hanya memakai token warna dari §1, tidak ada hex di Blade
- [ ] Rapi di lebar 390px dan 1440px (screenshot keduanya di PR)
- [ ] Teks bahasa Indonesia, kecuali judul besar
- [ ] Fokus keyboard terlihat
