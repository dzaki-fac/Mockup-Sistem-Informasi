# DESIGN.md — Gaya Desain Beranda Universitas Diponegoro (undip.ac.id)

Dokumen ini merangkum sistem desain beranda undip.ac.id supaya agen AI atau developer bisa membuat UI baru yang terasa "satu keluarga" dengan situs aslinya.

**Sumber:** HTML beranda (Elementor 4.2 + Hello Elementor, Prime Slider, JetSearch, The Events Calendar, Polylang), dilihat pada mode mobile, 21 September 2026.

**Tanda kepercayaan nilai:**
- ✅ **Terverifikasi** = tertulis langsung di HTML/CSS inline.
- 🔶 **Perkiraan** = disimpulkan dari struktur; cek ulang di DevTools sebelum dijadikan token final.
- ❓ **Belum diketahui** = ada di stylesheet eksternal Elementor, tidak muncul di HTML.

---

## 1. Visual Theme & Atmosphere

Kesan umum: **institusional, formal, bersih, informatif**. Ini situs universitas negeri, bukan situs produk, jadi prioritasnya keterbacaan berita, kejelasan navigasi, dan kesan kredibel.

- Basis warna: **navy pekat + putih + abu netral**. Aksen hampir tidak ada; warna datang dari foto berita.
- Foto berita adalah "dekorasi" utama. UI di sekelilingnya sengaja tenang.
- Hero berupa slideshow foto besar dengan overlay gelap dan judul berita di atasnya.
- Bahasa: Indonesia (`id-ID`) sebagai default, Inggris (`en-GB`) lewat language switcher dengan bendera.
- Nada teks: baku, kalimat berita ("UNDIP, Brebes (16/9) – ..."), judul memakai Title Case pada menu dan kapitalisasi kalimat pada judul berita.

---

## 2. Color Palette & Roles

| Token | Hex | Peran | Status |
|---|---|---|---|
| `--color-navy` | `#000352` | Latar label bulan pada kartu event, kandidat warna primer brand | ✅ |
| `--color-surface-muted` | `#DFDFDF` | Latar kotak tanggal pada kartu event | ✅ |
| `--color-white` | `#FFFFFF` | Teks di atas navy, latar bersih | ✅ |
| `--color-black` | `#000000` | Teks judul/isi di atas latar terang | ✅ |
| `--color-white-20` | `#FFFFFF33` | Latar tombol "Pendaftaran" di menu (pill transparan) | ✅ |
| `--color-hero-scrim` | gelap semi-transparan | Overlay di atas foto hero (`bdt-overlay-default`) | ❓ |
| `--color-header-bg` | ❓ | Latar header (container background "classic") | ❓ |
| `--color-footer-bg` | ❓ | Latar footer dan bar copyright | ❓ |
| `--color-tile-bg` | ❓ | Latar 8 tile tautan cepat dan 5 kartu ikon | ❓ |

Catatan: header, footer, dan tile memakai background "classic" Elementor. Nilainya ada di file CSS `elementor/css/post-*.css`, bukan di HTML. Ambil dari DevTools → Computed → `background-color`.

Aturan pakai warna:
- Teks putih hanya di atas navy, header/footer gelap, dan overlay hero.
- Teks hitam di atas putih atau `#DFDFDF`.
- Jangan tambah warna aksen baru tanpa alasan. Kategori berita dibedakan lewat badge/tag, bukan lewat warna kartu.

---

## 3. Typography Rules

**Font utama:** `Inter`, fallback `sans-serif` ✅ (terlihat di komponen event). Teks lain mengikuti tipografi global kit Elementor (`elementor-kit-34494`) ❓.

| Peran | Ukuran (desktop → mobile) | Weight | Line-height | Letter-spacing | Status |
|---|---|---|---|---|---|
| Angka tanggal (kartu event) | 45px → 32px | 600 | 24px | 0.5px | ✅ |
| Judul event | 18px | 500 | 22px | 0.5px | ✅ |
| Label bulan/tahun event | 16px → 14px | 500 | 24px → 19px | 0.5px | ✅ |
| Judul hero (H1 di slide) | besar, weight tebal | ❓ | ❓ | ❓ | 🔶 |
| Judul section (H2: "Pengumuman Undip", "Event Undip") | sedang-besar | ❓ | ❓ | ❓ | 🔶 |
| Judul kartu berita (H3) | sedang | ❓ | ❓ | ❓ | 🔶 |
| Excerpt | ±15 kata, teks biasa | ❓ | ❓ | ❓ | ✅ (panjang), ❓ (ukuran) |

Pola khusus:
- **Kata pertama judul hero** dibungkus `<span class="frist-word">` (typo asli di situs) supaya bisa diberi gaya berbeda dari sisa judul. Pertahankan pola ini bila ingin meniru tampilan aslinya.
- Letter-spacing `0.5px` dipakai konsisten di komponen event.
- Judul hero memakai efek parallax vertikal (`y: 80 → 0 → -80`, opacity 1 → 1 → 0).

---

## 4. Component Styling

### 4.1 Header & Navigasi
- Struktur: bar bahasa (khusus mobile/tablet, rata kanan) → bar utama berisi **logo**, **menu**, **ikon cari**.
- Logo: `logo-header-transparant-dies69.webp` (1656×300, transparan). Ada logo alternatif (lambang Undip + wordmark) yang disembunyikan di semua breakpoint.
- Menu horizontal, rata tengah, dropdown "stretch" selebar layar, ikon `caret-down` (Font Awesome solid) pada item dengan submenu.
- Item menu: **Profil** (Sejarah, Visi – Misi, Pimpinan Universitas, Senat Akademik (SA), Majelis Wali Amanat (MWA), Dosen, Video Profil), **Fakultas** (13 unit), **Direktori**, **Riset**, **Layanan**, **Pendaftaran**, **Berita dan Pengumuman**.
- **Pendaftaran** adalah CTA: pill dengan `padding: 5px 10px`, `border-radius: 5px`, `background: #FFFFFF33`.
- Mobile: burger menu (`aria-label="Menu Toggle"`), dropdown lebar 400px.
- Pencarian: ikon kaca pembesar membuka bar cari di bawah header (`JetSearch`), mulai mencari di 2 karakter, 5 hasil di dropdown, maksimal 25 di halaman hasil, ada thumbnail, placeholder "Cari ...".

### 4.2 Hero Slideshow (Prime Slider, skin "zinest")
- 3 slide, transisi **fade**, rasio **16:6**, tinggi minimum **400px**, tanpa autoplay.
- Tiap slide: foto latar penuh (`background-image`) + overlay gelap + blok teks.
- Isi blok teks: **kategori** (tautan tag, mis. "Berita", "Prestasi Mahasiswa", "THE SDGs") di atas, lalu **H1 judul** yang berupa tautan ke artikel.
- Panah prev/next di **kanan bawah**, ikon chevron garis tipis (stroke 1.4).
- Di bawah hero ada banner lebar (Dies Natalis, 1600×324) sebagai gambar responsif.

### 4.3 Kartu Ikon Navigasi Cepat (5 kartu)
- Isi: Riset & Inovasi, Berita Terbaru, Akademisi Berprestasi, Notable Alumni, UNDIP Bermartabat UNDIP Bermanfaat.
- Layout: **CSS grid**, ikon di atas, judul di bawah (`icon-box`, posisi block-start).
- Ikon: Font Awesome solid (`file-alt`, `newspaper`, `graduation-cap`, `user-graduate`, `pencil-alt`).
- Hover: **scale 1.05**.
- Desktop menampilkan 5 kartu; mobile/tablet menampilkan versi 4 kartu terpisah (Riset, profil akademisi, Alumni, UNDIP Bermartabat).

### 4.4 Kartu Berita (`posts.cards`)
- Susunan vertikal: **thumbnail atas → badge kategori ("Berita") → judul H3 → excerpt → tanggal**.
- Grid **2 kolom** desktop dan tablet, **1 kolom** mobile. Jarak antarbaris **35px**.
- Bayangan kartu aktif (`card-shadow-yes`), hover efek **gradient** pada thumbnail.
- Thumbnail rasio landscape (contoh 1200×804, 2048×1152), `loading="lazy"`.
- Tanggal ditulis dengan nama bulan lokal: "September 16, 2026" / "Agustus 28, 2026".
- Paginasi: tombol **"Lebih banyak"** (load more on click) dengan spinner.

### 4.5 Daftar Pengumuman (`posts.classic`)
- Tanpa thumbnail, hanya **judul (H3) + tanggal**.
- Grid 2 kolom (mobile 1), jarak baris 16px.
- Diawali H2 "Pengumuman Undip" + garis pemisah (divider).
- Tombol "Pengumuman Lainnya" dengan ikon `arrow-circle-right`, hover **geser kanan 6px**, rata kiri di mobile.

### 4.6 Kartu Event (loop item)
Komponen yang paling jelas spesifikasinya:

```
┌────────┬──────────────────────────────┐
│ Mei,   │ Judul event (Inter 18/22, 500)│
│ 2026   │                              │
│ (navy) │                              │
├────────┤                              │
│  22    │                              │
│ (abu)  │                              │
└────────┴──────────────────────────────┘
   20%              80%   (mobile: 20% / 75%, gap 10px)
```

- Kolom tanggal: baris atas **navy `#000352`** dengan teks putih (bulan, tahun), padding 5px; di bawahnya kotak **abu `#DFDFDF`** berisi angka tanggal 45px/600 (mobile 32px), padding 20px 5px (mobile 10px 5px).
- Kolom judul: teks hitam, judul menjadi tautan.
- Gap antarkolom 20px (mobile 10px).
- Grid 2 kolom (mobile 1), tombol "Lihat Semua Event".

### 4.7 Grid Tautan Layanan (8 tile)
- Isi: Kepakaran, SDGs, E-Journal, Peringkat, Halo Undip, Login SSO, Kalender Akademik, PPID.
- Tiap tile: **gambar ikon/ilustrasi** di atas + **judul tautan rata tengah**. Semua tautan membuka tab baru (`target="_blank"`).
- Ukuran gambar bervariasi (100×80 sampai 290×110), diproses Elementor thumbs.

### 4.8 Footer
- Tiga kolom informasi + gambar footer lebar:
  1. **Media Sosial UNDIP:** ikon bulat (Facebook, YouTube, X, Instagram, TikTok, LinkedIn), rata kiri.
  2. **Kontak:** ikon `map-marker-alt`, `phone-alt`, `envelope` + alamat (Gedung Widyapuraya), telepon, email humas.
  3. **Jam Layanan:** Senin–Kamis 07.30–16.00 WIB (istirahat 12.00–13.00), Jumat 07.30–16.30 WIB (istirahat 11.30–13.00).
  4. Gambar footer (logo Diksaintek/Kemdiktisaintek), 2048×282, responsif.
- Bar terpisah paling bawah: "Copyright © Universitas Diponegoro | 2026".

### 4.9 Language Switcher
- Daftar horizontal berisi **bendera** (Indonesia, Inggris) tanpa teks, rata kanan, bendera aktif ditandai kelas `--active`.
- Tampil di bar atas pada mobile dan di dalam header pada desktop.

---

## 5. Layout Principles

- **Susunan halaman (atas → bawah):** header → hero slideshow → banner Dies Natalis → kartu ikon navigasi + feed berita → Pengumuman → Event → grid tautan layanan → footer.
- Bagian utama memakai **container Elementor flex/grid** (`e-con`), mayoritas "boxed" (konten dibatasi lebar tertentu) dan sebagian "full".
- Lebar konten: konten boxed mengikuti pengaturan kit Elementor ❓. Tema WordPress mendefinisikan `content-size: 800px` dan `wide-size: 1200px` untuk blok editor, tapi itu bukan lebar layout beranda.
- Setiap section diawali **H2 + divider garis** (pola: heading → garis → konten → tombol "lihat semua").
- Jarak: antar-baris kartu berita 35px, daftar pengumuman 16px, kartu event 20px/10px. Sisanya ❓.
- Rata teks: kiri untuk konten, tengah untuk menu dan judul tile.
- Aksesibilitas bawaan: link "Lewati ke konten" (`skip-link`), atribut `role`/`aria-label` pada carousel dan menu.

---

## 6. Depth & Elevation

- **Kartu berita:** bayangan lembut aktif (`elementor-card-shadow-yes`) 🔶 nilai persisnya ❓.
- **Hover kartu/tile:** `transform: scale(1.05)`; tombol: `translateX(6px)`.
- **Hero:** kedalaman dibuat lewat foto + overlay, bukan bayangan.
- **Dropdown menu:** panel penuh (stretch) di atas konten.
- Tidak ada glassmorphism atau efek blur di HTML; satu-satunya transparansi adalah pill "Pendaftaran" (`#FFFFFF33`).

---

## 7. Do's and Don'ts

**Do**
- Pakai navy `#000352` + putih + abu `#DFDFDF` sebagai basis; biarkan foto berita membawa warna.
- Pakai `Inter` dengan letter-spacing `0.5px` untuk komponen bergaya kartu/event.
- Tiap section: H2, divider, konten, tombol "Lihat semua / Lainnya / Lebih banyak".
- Tampilkan kategori sebagai badge/tag kecil di atas judul, dan tanggal di bawah.
- Sediakan versi mobile 1 kolom, dengan ukuran angka/teks yang diperkecil (45→32, 16→14).
- Pakai ikon Font Awesome solid yang seragam.
- Pertahankan bahasa Indonesia sebagai default dan sediakan pilihan EN.

**Don't**
- Jangan menambah warna aksen terang (hijau neon, oranye, gradien dekoratif).
- Jangan mencampur banyak font; jangan pakai serif untuk UI.
- Jangan membuat kartu dengan sudut sangat membulat; situs ini cenderung tegas dan datar (radius kecil, mis. 5px pada pill).
- Jangan menaruh teks putih di atas foto tanpa overlay gelap.
- Jangan menyembunyikan CTA "Pendaftaran" di dalam dropdown.
- Jangan autoplay slideshow hero (aslinya `autoplay: false`).

---

## 8. Responsive Behavior

| Breakpoint | Rentang | Perilaku utama |
|---|---|---|
| Mobile | ≤ 767px | Kartu 1 kolom, burger menu, bar bahasa di atas, kartu ikon 4 (versi mobile), tanggal event 32px |
| Tablet | 768–1024px | Grid 2 kolom, burger menu, kartu ikon versi mobile/tablet |
| Desktop | ≥ 1025px | Menu horizontal penuh, 5 kartu ikon, grid 2 kolom |

Breakpoint Elementor lengkap: `xs 0`, `sm 480`, `md 768`, `lg 1025`, `xl 1440`, `xxl 1600`.

Aturan:
- Hero tetap rasio 16:6 dengan tinggi minimum 400px.
- Gambar selalu `srcset` + `sizes` responsif dan `loading="lazy"` (kecuali logo header).
- Tombol "lihat semua" rata kiri di mobile.
- Sentuh: item menu dan tile harus cukup besar untuk ditekan jari.

---

## 9. Agent Prompt Guide

### Token siap pakai (CSS)

```css
:root {
  /* ✅ terverifikasi dari HTML */
  --color-navy: #000352;
  --color-surface-muted: #DFDFDF;
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-white-20: #FFFFFF33;

  --font-sans: "Inter", sans-serif;
  --tracking: 0.5px;

  --radius-pill: 5px;
  --gap-cards: 35px;
  --gap-list: 16px;
  --gap-event: 20px;
  --hover-scale: 1.05;
  --hover-shift: 6px;

  /* ❓ isi setelah cek DevTools */
  --color-header-bg: /* … */;
  --color-footer-bg: /* … */;
}

.event-month { background: var(--color-navy); color: var(--color-white);
  font: 500 16px/24px var(--font-sans); letter-spacing: var(--tracking);
  text-align: center; padding: 5px; }
.event-day { background: var(--color-surface-muted); color: var(--color-black);
  font: 600 45px/24px var(--font-sans); letter-spacing: var(--tracking);
  text-align: center; padding: 20px 5px; }
.event-title { font: 500 18px/22px var(--font-sans); letter-spacing: var(--tracking); }

@media (max-width: 767px) {
  .event-month { font-size: 14px; line-height: 19px; }
  .event-day { font-size: 32px; padding: 10px 5px; }
}
```

### Contoh prompt

> Buat halaman berita kampus bergaya undip.ac.id: header dengan logo kiri dan menu horizontal, CTA "Pendaftaran" berupa pill transparan putih 20%. Hero slideshow rasio 16:6 dengan overlay gelap, kategori kecil di atas judul. Di bawahnya grid kartu berita 2 kolom (thumbnail, badge kategori, judul, excerpt 15 kata, tanggal) dengan tombol "Lebih banyak". Palet: navy #000352, putih, abu #DFDFDF. Font Inter. Mobile 1 kolom.

> Buat komponen kartu event: kolom kiri 20% berisi label bulan (navy, teks putih) di atas angka tanggal (abu #DFDFDF, 45px, tebal 600), kolom kanan 80% berisi judul event Inter 18px. Di mobile angka menjadi 32px.

### Checklist sebelum selesai
- [ ] Hanya memakai navy, putih, abu, hitam (+ foto)?
- [ ] Font Inter, letter-spacing 0.5px di komponen kartu/event?
- [ ] Setiap section punya H2 + divider + tombol "lihat semua"?
- [ ] Hover memakai scale 1.05 / geser 6px, bukan efek mencolok?
- [ ] Ada skip-link, `aria-label`, dan alt teks yang layak?
- [ ] Nilai bertanda ❓ sudah diisi dari DevTools?

---

## Lampiran: Yang Belum Terverifikasi

Nilai berikut ada di CSS eksternal dan perlu diambil manual (DevTools → Elements/Computed) bila ingin tiruan piksel-presisi:

1. Warna latar header, footer, tile, dan bar copyright.
2. Warna scrim di atas foto hero dan warna teks judul hero.
3. Ukuran font H1 hero, H2 section, H3 kartu, excerpt, dan item menu.
4. Nilai bayangan kartu berita dan warna gradient hover.
5. Lebar maksimum container boxed dan padding section.
6. Border-radius kartu (selain pill 5px di menu).
7. Font untuk teks selain komponen event (kemungkinan mengikuti kit Elementor).