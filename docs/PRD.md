# Product Requirements Document (PRD)
## Sistem Informasi Company Profile & Reservasi Multi-Cabang Nabe Coffee

| | |
|---|---|
| **Judul lengkap** | Rancang Bangun Sistem Informasi Company Profile dan Reservasi Multi-Cabang dengan Forecasting Menu Terbaik, Chatbot Rekomendasi, dan Notifikasi Real-Time pada Nabe Coffee |
| **Mitra** | Nabe Coffee (@nabecoffee.id), satu grup dengan Majja Decospace, Jogja Padel, dan MEandPartners |
| **Tim** | Kelompok 3, Sistem Informasi, Universitas Mercu Buana Yogyakarta |
| **Pemilik dokumen** | Product Owner (Muhammad Hasbi Ash Shiddiqi) |
| **Sumber** | Form Usulan Judul Capstone, Laporan Capstone (Bab I–III), Sprint Backlog, Pedoman Wawancara |
| **Status** | Draft v1, 7 Nov 2026 |

Kalau dokumen ini berbeda dengan laporan, **laporan resmi yang menjadi acuan**. Perbedaan dicatat di §10.

---

## 1. Latar belakang dan masalah

Nabe Coffee punya 4 cabang aktif di Yogyakarta, tapi belum punya website resmi dan sistem booking terpusat. Reservasi masih manual lewat WhatsApp di tiap cabang. Akibatnya:

1. **Tidak ada kanal informasi resmi.** Info menu, promo, lokasi, dan jam operasional tersebar di kanal tidak resmi.
2. **Reservasi manual dan tidak terpusat.** Ada risiko chat terlewat, double-booking, dan bentrok jadwal.
3. **Penempatan fleksibel tanpa standar kuota.** Kafe tidak memakai meja tetap; tempat disiapkan sesuai jumlah tamu. Rombongan besar dan acara yang butuh fasilitas (charger, sound, mic) perlu penanda khusus.
4. **Pelanggan tidak bisa layanan mandiri.** Sisa kuota, kepadatan, dan status reservasi hanya bisa ditanyakan lewat chat admin.
5. **Rekap manual tanpa analitik prediktif.** Menu terlaris dan jam sibuk direkap manual, belum ada prediksi menu dan peringatan no-show.
6. **Skema pembayaran belum baku.** Belum ada aturan pasti antara lunas dan DP pengunci slot.

## 2. Tujuan

| # | Tujuan | Indikator keberhasilan |
|---|---|---|
| G1 | Kanal informasi resmi dan terpusat | Profil, menu, promo, lokasi, dan jam 4 cabang tampil di satu website dan bisa diubah lewat CMS |
| G2 | Reservasi multi-cabang yang tertib kuota | Tidak ada slot yang terisi melebihi kuota. Saat penuh, muncul 3 alternatif |
| G3 | Layanan mandiri pelanggan | Pelanggan bisa melihat sisa kuota, status reservasi, dan bertanya ke chatbot tanpa menghubungi admin |
| G4 | Analitik prediktif untuk keputusan stok dan shift | Dashboard menampilkan ranking menu, heatmap jam sibuk, dan daftar risiko no-show per cabang |
| G5 | Setiap event reservasi tersampaikan ke cabang yang tepat | Notifikasi masuk ke grup Telegram dan email cabang sesuai `branch_id`, tercatat di log |

## 3. Cabang (lingkup)

| Cabang | Alamat | Jam operasional* |
|---|---|---|
| Kusumanegara | Jl. Kusumanegara No.11, Semaki, Umbulharjo, Kota Yogyakarta 55166 | 07.00–00.00 |
| Demangan | Jl. Demangan Baru, Mrican, Caturtunggal, Depok, Sleman 55281 | 07.00–00.00 |
| Soragan | Jl. Soragan No.29, Ngestiharjo, Kasihan, Bantul 55184 | 07.00–00.00 |
| Batikan (THE PADEL) | Jl. Batikan No.9, Umbulharjo, Kota Yogyakarta 55161 | 09.00–22.00 |

\*Sesuai laporan. Form usulan mencatat Soragan 10.00–24.00, jadi perlu dikonfirmasi ulang ke mitra (§10). Kisaran harga Rp25.000–Rp50.000 per orang.

## 4. Aktor dan hak akses

| Aktor | Login? | Hak akses |
|---|---|---|
| **Pelanggan** | Tidak | Melihat company profile dan katalog, membuat reservasi, pre-order dan bayar, cek/ubah/batal reservasi, chatbot |
| **Admin Cabang** (`branch_admin`) | Ya | Hanya data cabangnya sendiri: kelola status reservasi, merespons notifikasi Telegram/email |
| **Owner** (`owner`) | Ya | Semua cabang: CMS, data master dan kuota, dashboard analitik dan heatmap |
| **Sistem** (chatbot, dispatcher) | — | Aktor otomatis: menjawab chatbot, mengirim notifikasi, pengingat H-1, eskalasi |

## 5. Kebutuhan fungsional (use case)

Penomoran mengikuti tabel use case description di laporan Bab 3.3.

### UC-1 Melihat Company Profile dan Katalog (Pelanggan)
- Landing page berisi galeri suasana kafe, visi-misi, dan cerita brand.
- Katalog menu dengan kategori **kopi, non-kopi, makanan berat, camilan**, filter harga, label **Terlaris** dari hasil forecasting, dan penanda promo.
- Info per cabang: alamat, Google Maps, jam operasional, dan tombol WhatsApp admin.
- Detail menu menampilkan harga dan ketersediaan.

### UC-2 Melakukan Reservasi (Pelanggan) — *base use case*
1. Pilih cabang, tanggal, dan jam.
2. Sistem menampilkan **sisa kuota** dan **estimasi kepadatan**.
3. Isi jumlah tamu, deskripsi acara, dan kebutuhan fasilitas.
4. Pilih jalur: **Pre-Order Menu** (UC-3) atau **Order Langsung di Outlet** (UC-4).
5. Reservasi tersimpan dengan status `pending` dan notifikasi dikirim ke cabang.
- **Kuota penuh:** tampilkan pesan "Kuota penuh" dan 3 alternatif terurut:
  1. jam terdekat di cabang yang sama;
  2. cabang terdekat yang masih tersedia;
  3. jam sepi.
- Reservasi ≥ 10 orang, event, atau meeting room otomatis ditandai **rombongan besar / prioritas tinggi**.

### UC-3 Melakukan Pre-Order Menu (Pelanggan) — *extend UC-2*
1. Pilih menu pre-order. Sistem menampilkan tagihan dan total.
2. Pilih jenis pembayaran: **Lunas** atau **DP** (pengunci slot).
3. Bayar atau unggah bukti pembayaran, lalu sistem memverifikasi.
4. Kalau berhasil, reservasi tersimpan sebagai `pending` beserta item dan data pembayaran.
- Kalau verifikasi gagal atau waktu habis: tampilkan "Pembayaran Gagal" dan reservasi tidak disimpan.
- Wajib atau tidaknya DP dan besar DP **bisa dikonfigurasi**. Payment gateway opsional; versi awal memakai unggah bukti transfer dan verifikasi manual oleh admin.

### UC-4 Melakukan Order Menu Langsung di Outlet (Pelanggan) — *extend UC-2*
- Reservasi langsung disimpan sebagai `pending` tanpa pembayaran online. Pemesanan dan pembayaran dilakukan di outlet.

### UC-5 Konsultasi Chatbot (Pelanggan)
- Widget chatbot 24/7 berbahasa Indonesia.
- **Intent:** `rekomendasi_menu`, `tanya_promo`, `reservasi_baru`, `cek_reservasi` / `ubah_reservasi` / `batal_reservasi`, `tanya_jam`, `tanya_lokasi`, `tanya_menu`.
- **Entity:** cabang, tanggal, jam, jumlah orang.
- Rekomendasi **3 menu terbaik** per cabang diambil real-time dari hasil forecasting dan promo aktif.
- Kalau intent tidak dikenali, chatbot memberi pesan fallback dan meminta pelanggan mengulang pertanyaan.

### UC-6 Login (Owner, Admin Cabang)
- Login dengan email dan kata sandi. Setelah login, pengguna diarahkan ke dashboard sesuai peran.
- Kalau gagal, tampilkan "Email atau kata sandi salah".
- **Two-Factor Authentication (tugas 1.5):** setelah email dan kata sandi benar, Owner dan Admin Cabang memasukkan kode 6 digit dari aplikasi **Google Authenticator** (TOTP, RFC 6238).
  - **Aktivasi pertama:** sistem menampilkan QR code, pengguna memindainya di Google Authenticator, lalu mengonfirmasi dengan satu kode.
  - **Kode cadangan:** sistem memberi 8 kode cadangan sekali pakai untuk keadaan darurat, misalnya HP hilang.
  - **Kode salah:** tampilkan "Kode autentikasi salah". Setelah 5 kali salah, login dikunci sementara selama 1 menit.
  - **Wajib** untuk semua akun Owner dan Admin Cabang. Owner bisa me-reset 2FA milik Admin Cabang yang kehilangan akses.

### UC-7 Mengelola Konten / CMS (Owner)
- Unggah atau ubah banner promosi dan teks informasi outlet, lalu terbitkan ke halaman publik.
- Promo memuat judul, periode, syarat, dan cabang.
- Kalau data tidak lengkap, tampilkan "Data tidak valid".

### UC-8 Melihat Dashboard Analytics & Heatmap (Owner)
- Filter per cabang atau semua cabang (pusat).
- Statistik reservasi harian, mingguan, dan bulanan.
- Heatmap jam sibuk, ranking 5 menu teratas dengan saran stok, dan daftar reservasi berisiko no-show tinggi.
- Kalau tidak ada data, tampilkan "Data tidak ditemukan".

### UC-9 Mengelola Data Master & Kuota (Owner)
- CRUD cabang, menu (harga, stok, foto, tags), dan kuota `CapacitySlot` per cabang per tanggal + jam.
- Kontak per cabang: nomor WhatsApp admin, Telegram chat ID grup, dan email penanggung jawab.

### UC-10 Merespons Notifikasi Email / Telegram (Admin Cabang)
- Saat ada reservasi baru, sistem mengirim notifikasi ke grup Telegram dan email **cabang terkait saja**.
- Perintah bot:
  - `/hariini` menampilkan daftar reservasi hari ini;
  - `/konfirmasi <ID>` mengubah status ke `confirmed`;
  - `/batal <ID>` mengubah status ke `canceled`.
- Kalau dikonfirmasi, e-tiket terbit ke pelanggan.
- Kalau 15 menit belum dikonfirmasi, sistem melakukan **eskalasi** ke penanggung jawab cabang.
- Perintah tidak valid dijawab "Perintah tidak dikenali".

### UC-11 Mengelola Status Reservasi Outlet (Admin Cabang, web)
- Daftar reservasi harian outlet. Aksi yang tersedia:
  - **Accept** → `confirmed`
  - **Reject** → `canceled`
  - **Reschedule** → `rescheduled`
  - **Check-in** → `completed`

### Kebutuhan tambahan dari laporan (belum punya UC sendiri)
- **Cek/ubah/batal reservasi oleh pelanggan** (misalnya lewat kode reservasi + nomor HP).
- **Ulasan/saran pelanggan** (entitas `Review`).
- **Pengingat H-1** ke pelanggan, dan prioritas konfirmasi H-1 untuk reservasi berisiko no-show.

## 6. Modul AI

| Modul | Metode | Input | Output | Tugas |
|---|---|---|---|---|
| **Forecasting menu terbaik** | Moving average dan exponential smoothing per menu per cabang. Naik ke model time-series setelah > 100 transaksi. | Histori order per menu per cabang | Skor, ranking 5 teratas, label *Terlaris*, saran stok | 6.3 |
| **Chatbot rekomendasi** | Intent classification + entity extraction dengan TF-IDF + Logistic Regression, plus fallback | Teks pelanggan | Intent, entity, jawaban | 6.1, 6.2 |
| **Skor risiko no-show** | Klasifikasi Logistic Regression | Riwayat pelanggan, jumlah tamu, DP/tidak, jarak waktu booking, dll. | Skor 0–1 dan label risiko | 6.3 |
| **Dispatcher notifikasi** | Rule-based routing per `branch_id` + prioritas | Event reservasi | Pesan Telegram/email, log, retry, eskalasi | 7.1, 7.2 |

**Cold start:** sebelum ada data transaksi, label *Terlaris* diambil dari daftar best-seller yang diinput admin.

## 7. Aturan bisnis

| Kode | Aturan |
|---|---|
| BR-1 | Status reservasi: `pending`, `confirmed`, `rescheduled`, `canceled`, `completed` |
| BR-2 | Sisa kuota = kuota admin − tamu terbooked (`pending` + `confirmed`) − estimasi walk-in. Tidak boleh negatif. |
| BR-3 | Estimasi walk-in berasal dari persentase historis atau input admin per slot |
| BR-4 | Rombongan ≥ 10 orang, event, atau meeting room ditandai prioritas tinggi |
| BR-5 | Admin Cabang hanya mengakses data cabangnya (`branch_id`). Owner mengakses semua cabang. |
| BR-6 | Skema DP (wajib/opsional, nominal/persen) bisa dikonfigurasi Owner |
| BR-7 | Notifikasi internal lewat Telegram + email cabang. Tiket dan pengingat ke pelanggan lewat WhatsApp atau email. |
| BR-8 | Notifikasi yang gagal dikirim ulang (retry) dan setiap pengiriman dicatat di `notification_logs` |
| BR-9 | Reservasi prioritas tinggi yang 15 menit belum dikonfirmasi dieskalasi |

## 8. Kebutuhan non-fungsional

- **Responsif:** semua halaman publik nyaman dibuka di HP. Mayoritas pelanggan datang dari Google Maps lewat HP.
- **Bahasa:** antarmuka bahasa Indonesia.
- **Keamanan:**
  - password di-hash;
  - 2FA Google Authenticator (TOTP) untuk Owner dan Admin Cabang, secret TOTP disimpan terenkripsi;
  - proteksi CSRF bawaan Laravel;
  - isolasi data per cabang di level Policy;
  - rahasia (token bot, SMTP) hanya di `.env`;
  - bukti pembayaran disimpan di storage privat.
- **Kinerja:** cek sisa kuota terasa instan, kurang dari 1 detik di jaringan normal.
- **Keandalan notifikasi:** pengiriman lewat queue dengan retry.
- **Privasi:** data transaksi dari mitra untuk forecasting dipakai dalam bentuk anonim.

## 9. Arsitektur dan layer sistem

Diagram layer sistem untuk UTS (dari bawah ke atas, mengikuti format dosen):

| Layer | Isi |
|---|---|
| Integrated Information System Application | Sistem Informasi Company Profile & Reservasi Multi-Cabang Nabe Coffee |
| Web | Web responsif (desktop & HP). Tidak ada aplikasi desktop atau mobile native. Bot Telegram sebagai kanal notifikasi admin. |
| Two Factor Authentication | Login email + kata sandi, lalu kode Google Authenticator (TOTP) untuk Owner & Admin Cabang |
| OLTP / OLAP | **OLTP:** reservasi, kuota, pre-order, pembayaran, status, CMS, data master. **OLAP:** dashboard, heatmap, forecasting, skor no-show. |
| Database & Web Server | Nginx + PHP-FPM (Laravel 12) + MySQL 8, service Python untuk modul AI |
| Virtual Machine / LXC Container | AWS EC2 instance (Ubuntu Server), aplikasi dijalankan dalam Docker container |
| Hardware Virtualization | AWS Nitro Hypervisor (berbasis KVM) |
| IT Hardware Infrastructure | Server fisik di data center AWS, ditambah laptop tim untuk pengembangan |

**Hosting:** AWS EC2 Free Tier (instance kelas `t3.micro`/`t2.micro`, 1 GiB RAM). Karena RAM kecil, aktifkan swap 1–2 GB. Service Python juga cukup memuat model yang ringan (TF-IDF + Logistic Regression). Pilih region terdekat, misalnya Jakarta (`ap-southeast-3`) atau Singapura (`ap-southeast-1`), sesuai yang tersedia di Free Tier akun.

**Pola aplikasi:** MVC 3 lapis (Boundary → Control → Entity).
- **Boundary:** halaman Blade (LoginPage, KatalogPage, BookingForm, PaymentPage, DaftarReservasiPage, DashboardAnalyticsPage, CMSForm, ChatbotWidget) dan bot Telegram.
- **Control:** AuthController, BookingController, PaymentController, ForecastingController, ChatbotController, NotificationDispatcher.
- **Entity:** model pada [AGENTS.md §7](../AGENTS.md#7-konvensi-kode-dan-domain).

## 10. Keputusan terbuka dan inkonsistensi

| # | Hal | Status |
|---|---|---|
| D1 | Skema DP final (wajib/opsional, nominal) | Menunggu kesepakatan mitra |
| D2 | Payment gateway atau hanya unggah bukti transfer | Default: unggah bukti. Gateway opsional. |
| D3 | Two-Factor Authentication untuk admin | **Diputuskan (8 Nov 2026):** Google Authenticator (TOTP), wajib untuk Owner & Admin Cabang. Masuk backlog sebagai tugas 1.5 (Hasbi). |
| D8 | Hosting | **Diputuskan (8 Nov 2026):** AWS EC2 Free Tier |
| D4 | E-tiket di UC-10 tertulis "Telegram/Email pelanggan", sedangkan Batasan Masalah menyebut WhatsApp/email | Ikuti Batasan Masalah: **WhatsApp/email** |
| D5 | Jam operasional Soragan (laporan 07.00–00.00, form 10.00–24.00) | Konfirmasi ke mitra |
| D6 | Kanal WhatsApp: API resmi, gateway pihak ketiga, atau tautan `wa.me` | Belum diputuskan (tugas 7.3) |
| D7 | Framework service Python (FastAPI/Flask) | Diputuskan oleh PIC AI di tugas 6.1 |

## 11. Di luar lingkup

- Aplikasi mobile native dan aplikasi desktop
- Sistem kasir/POS dan manajemen stok bahan
- Pemilihan meja spesifik. Kapasitas dihitung per slot, bukan per meja.
- Program loyalti dan membership pelanggan

## 12. Jadwal

7 sprint dalam 10 minggu (19 Okt – 23 Des 2026). UTS setelah Week 5. Rincian tugas dan PIC ada di [AGENTS.md §5](../AGENTS.md#5-sprint-backlog-dan-pemilik-tugas).

| Sprint | Minggu | Fokus |
|---|---|---|
| 1 | W1 | Autentikasi & pengguna |
| 2 | W1–2 | Data master cabang, menu & kuota |
| 3 | W3–4 | Company profile, katalog & CMS |
| 4 | W5–6 | Reservasi inti |
| 5 | W7–8 | Pre-order, pembayaran & status reservasi admin |
| 6 | W8–9 | Chatbot & forecasting |
| 7 | W9–10 | Notifikasi, integrasi akhir & UAT |
