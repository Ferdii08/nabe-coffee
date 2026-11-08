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
7. Kalau ada permintaan revisi, perbaiki di branch yang sama lalu push lagi. PR otomatis ter-update.
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

## Alur review (untuk PM)

1. Cek bahwa PR sesuai ID tugas dan scope.
2. Cek bahwa tes lolos dan tampilan sesuai mockup.
3. Approve, lalu **Squash and merge**.
4. Hapus branch setelah merge.
5. Di akhir sprint, pindahkan isi `[Unreleased]` di CHANGELOG ke versi sprint, lalu buat tag `v0.<sprint>.0`.
