# Prototipe desain Nabe Coffee (acuan saja)

Ini kode prototipe hasil Figma Make (React). **Folder ini hanya acuan tampilan, bukan bagian aplikasi.** Aplikasi tetap dibangun pakai Laravel + Blade, sedikit demi sedikit sesuai tugas di sprint backlog.

## Aturan pakai

- Jangan menyalin seluruh halaman sekaligus. Ambil hanya bagian yang sesuai tugasmu (lihat issue masing-masing).
- Yang boleh diambil: susunan HTML, nama class, dan aturan CSS dari `src/index.css`. Ubah JSX ke Blade: `className` jadi `class`, `.map()` jadi `@foreach`, data demo diganti data dari controller.
- Jangan ikut menyalin logika React, `DemoData.tsx`, atau `recharts`.
- Halaman yang tidak ada di sprint backlog (career, partnership, proposal, facility, article, news) jangan dikerjakan. Lihat `DESIGN.md` §6.
- Jangan mengubah isi folder ini. Kalau desainnya perlu diubah, kabari PM.

## Peta file

| File | Isi |
|---|---|
| `src/App.tsx` | Layout publik (topline, header, footer), beranda, form reservasi, widget chatbot |
| `src/components/StageThreePublic.tsx` | About, menu, outlet, status reservasi, `StatusBadge` |
| `src/components/StageTwo.tsx` | Facility, career, partnership, proposal, article (**di luar backlog**) |
| `src/components/AdminDemo.tsx` | Semua halaman admin: login, dashboard, kuota, CMS, reservasi, pembayaran, notifikasi |
| `src/components/NabeUI.tsx` | Data 4 cabang, komponen `Logo` |
| `src/index.css` | **Semua gaya.** Sumber utama untuk dipindah ke Laravel |
| `src/styles/fonts.css` + `public/assets/fonts/` | Font DM Sans & Barlow Condensed (lisensi OFL) |
| `public/assets/placeholders/` | Foto placeholder Unsplash, lisensi di `ASSET-LICENSES.md` |

## Menjalankan prototipe

```bash
cd docs/prototype
npm install
npm run dev
```

Buka alamat yang muncul di terminal. Versi online: https://visa-width-30826922.figma.site/
