# Panduan Kontribusi Tim Nabe Coffee

Panduan singkat untuk anggota tim. Aturan lengkap, termasuk untuk agent AI, ada di [AGENTS.md](AGENTS.md).

## Aturan utama

1. **Jangan pernah push langsung ke `main`.** Semua perubahan lewat Pull Request.
2. **Satu branch = satu tugas** dari sprint backlog.
3. **Kerjakan hanya tugasmu sendiri** dan folder sesuai area tugasnya ([AGENTS.md §6](AGENTS.md#6-scope-folder-per-area)).
4. **Yang me-merge ke `main` hanya PM (Hasbi).** Walaupun tombol Merge bisa diklik, jangan diklik.
5. **Jangan commit `.env`** atau token, password, dan API key apa pun.

## Langkah kerja sehari-hari

```bash
# 1. Ambil kode terbaru
git checkout main
git pull origin main

# 2. Buat branch untuk tugasmu
git checkout -b feat/3.3-ui-katalog-menu

# 3. Kerjakan, lalu cek
./vendor/bin/pint
php artisan test
npm run build

# 4. Commit dan push branch-mu
git add .
git commit -m "feat(3.3): tampilkan katalog menu per kategori"
git push -u origin feat/3.3-ui-katalog-menu
```

Langkah selanjutnya:

5. Buka Pull Request ke `main` di GitHub (atau `gh pr create --base main`) dan isi templatenya.
6. Kabari di grup bahwa PR sudah siap direview.
7. Kalau ada permintaan revisi, perbaiki di branch yang sama, push lagi, lalu **balas review dan minta pengecekan ulang** sesuai panduan di bawah. Push saja belum cukup untuk memberi tahu reviewer apa yang sudah diperbaiki.
8. Setelah PR di-merge, hapus branch lokal dan mulai lagi dari langkah 1 untuk tugas berikutnya.

## Nama branch

`<tipe>/<id-tugas>-<deskripsi>`. Contoh: `feat/1.2-ui-login`, `fix/4.1-sisa-kuota-negatif`, `docs/readme-setup`.

Tipe yang dipakai: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`.

## Pesan commit

`<tipe>(<id-tugas>): <ringkasan>`. Contoh: `feat(2.2): tambah CRUD menu`.

## Kalau branch-mu ketinggalan dari `main`

```bash
git checkout main && git pull origin main
git checkout <branch-mu>
git merge main
# selesaikan konflik kalau ada, lalu:
git push
```

Jangan pakai `git push --force` kecuali kamu yakin hanya kamu yang memakai branch itu.

## Checklist sebelum minta review

- [ ] Branch dibuat dari `main` terbaru
- [ ] Hanya mengubah file sesuai scope tugas, atau perubahan di luar scope sudah dijelaskan di PR
- [ ] `./vendor/bin/pint --test` lolos
- [ ] `php artisan test` lolos
- [ ] Ada screenshot kalau mengubah tampilan
- [ ] Entri baru ditambahkan di `CHANGELOG.md` bagian `[Unreleased]`

## Membalas review setelah revisi

**Setelah mengerjakan revisi, penulis PR wajib membalas review di GitHub.** Jangan hanya push commit lalu diam, atau hanya mengabari lewat grup. Reviewer perlu tahu poin mana yang sudah selesai, bagaimana cara mengeceknya, dan apa yang masih tertunda. Aturan ini berlaku juga untuk review dari bot atau revisi yang dikerjakan dengan bantuan agent AI.

1. **Baca semua poin review.** Tanggapi bagian Wajib maupun Sebaiknya. Kalau sarannya belum jelas atau tidak bisa diterapkan, jelaskan alasannya di komentar terkait dan diskusikan dengan reviewer.
2. **Perbaiki di branch PR yang sama.** Jalankan pengecekan yang sesuai, commit, lalu push. Jangan membuat PR baru untuk revisi tugas yang sama. Untuk perubahan tampilan, perbarui screenshot desktop dan mobile.
3. **Balas setiap poin di tempat asalnya.** Untuk komentar pada baris kode, klik **Reply** pada percakapan tersebut di tab **Files changed**. Untuk review berupa daftar poin di tab **Conversation**, kirim balasan dengan nomor yang mengikuti daftar reviewer. Jangan hanya menulis "done" atau "sudah"; sebutkan perubahan, lokasi kode, dan commit terkait.
4. **Kirim ringkasan revisi dan minta review ulang.** Tambahkan komentar di tab **Conversation** dengan daftar perbaikan, commit terbaru, hasil pengecekan, dan hal yang masih belum selesai. Sebut reviewer yang dituju. Gunakan **Re-request review** di bagian **Reviewers** jika tersedia. Pastikan balasan sudah terkirim, bukan masih berupa draft/pending.
5. **Tunggu konfirmasi reviewer.** Jangan menganggap push baru otomatis membatalkan status *Changes requested*. Biarkan reviewer memastikan temuannya sudah selesai sebelum percakapan ditandai **Resolve conversation**, kecuali reviewer meminta penulis untuk menandainya. Merge tetap dilakukan PM.

### Contoh balasan pada satu poin

Contoh berikut perlu disesuaikan dengan perubahan dan commit yang benar-benar dibuat:

> Sudah aku perbaiki di commit `<SHA-commit>`, bagian `resources/views/components/branch-card.blade.php`.
>
> Atribut class sekarang memakai attribute bag untuk mode satu cabang maupun daftar cabang. Jadi kelas grid tidak lagi terbaca sebagai atribut HTML terpisah.
>
> Aku cek ulang di lebar 390px dan 1440px; kartu sudah tampil satu kolom di HP dan dua kolom di desktop. Screenshot terbaru ada di deskripsi PR. Tolong dicek lagi.

Kalau belum selesai, sampaikan statusnya dengan jelas, misalnya:

> Poin nomor kontak belum bisa aku selesaikan karena nomor resmi admin belum tersedia. Sementara tombol WhatsApp aku nonaktifkan agar tidak mengarah ke nomor contoh. Apakah penanganan sementara ini sudah sesuai?

Kalau tidak mengikuti saran, jelaskan alasan dan alternatifnya; jangan melewati poin tersebut tanpa balasan.

### Contoh komentar ringkasan revisi

Salin format berikut, lalu ganti isinya sesuai hasil pekerjaan:

```markdown
@<username-reviewer> revisi untuk review sebelumnya sudah aku push. Tolong dicek ulang.

1. Poin layout kartu: <apa yang diperbaiki dan lokasi filenya>.
2. Poin kontak WhatsApp: <apa yang diperbaiki, atau kendala yang masih ada>.
3. Poin lainnya: <status dan penjelasannya>.

Commit revisi: <SHA atau tautan commit>.

Pengecekan setelah revisi:
- <perintah/pemeriksaan>: <hasil yang benar-benar diperoleh>.
- Screenshot desktop/mobile: <tautan, jika ada perubahan tampilan>.

Masih tertunda: <rincian dan alasannya, atau "tidak ada">.
```

Cantumkan hanya pengecekan yang benar-benar dijalankan pada revisi terbaru. Kalau ada yang gagal atau belum diuji, tuliskan apa adanya. Untuk tugas yang memerlukannya, sertakan hasil `./vendor/bin/pint --test`, `php artisan test`, dan `npm run build`, serta pemeriksaan perilaku yang sebelumnya bermasalah. Jangan menyalin klaim "semua lulus" dari hasil sebelum revisi.

## Alur review (untuk PM)

1. Cek bahwa PR sesuai ID tugas dan scope.
2. Cek bahwa tes lolos dan tampilan sesuai mockup.
3. Approve, lalu **Squash and merge**.
4. Hapus branch setelah merge.
5. Di akhir sprint, pindahkan isi `[Unreleased]` di CHANGELOG ke versi sprint, lalu buat tag `v0.<sprint>.0`.
