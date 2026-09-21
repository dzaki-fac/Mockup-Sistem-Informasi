export type KnowledgeType =
  | "SOP"
  | "Persyaratan"
  | "Regulasi"
  | "Panduan Kasus"
  | "FAQ";

export type KnowledgeStatus =
  | "Aktif"
  | "Draft"
  | "Menunggu Review"
  | "Perlu Revisi"
  | "Disetujui"
  | "Ditolak"
  | "Kedaluwarsa";

export interface Knowledge {
  id: string;
  title: string;
  type: KnowledgeType;
  description: string;
  content: string[];
  source: string;
  owner: string;
  status: KnowledgeStatus;
  version: string;
  updatedAt: string;
  reviewDate: string;
  docNumber?: string;
  isPublic: boolean;
  gap: string;
  views: number;
}

export interface Submission {
  id: string;
  title: string;
  type: KnowledgeType;
  submitter: string;
  role: string;
  date: string;
  status: Exclude<KnowledgeStatus, "Aktif" | "Kedaluwarsa">;
  reason: string;
  source: string;
  version: string;
  changes: string;
}

export interface HistoryEntry {
  id: string;
  knowledgeId: string;
  knowledgeTitle: string;
  version: string;
  change: string;
  by: string;
  role: string;
  date: string;
}

export interface PublicService {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  procedure: string[];
  faq: { q: string; a: string }[];
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  kind: "usulan" | "review" | "perubahan";
}

export const KNOWLEDGE: Knowledge[] = [
  {
    id: "sop-domisili",
    title: "SOP Pelayanan Surat Keterangan Domisili",
    type: "SOP",
    description:
      "Prosedur baku pemeriksaan, verifikasi, dan validasi pengajuan Surat Keterangan Domisili di Kelurahan Tembalang.",
    content: [
      "Petugas menerima berkas dan memeriksa kelengkapan dokumen sesuai daftar persyaratan versi berjalan.",
      "Petugas memverifikasi kesesuaian data KTP, KK, dan bukti domisili (surat pengantar RT/RW atau bukti tempat tinggal).",
      "Jika dokumen tidak lengkap, petugas mencatat kekurangan pada lembar verifikasi dan mengarahkan pemohon melengkapi berkas.",
      "Jika dokumen lengkap dan valid, petugas memvalidasi dan meneruskan ke penandatanganan sesuai SOP tanda tangan.",
      "Petugas mencatat layanan pada buku register dan mengarsipkan salinan berkas sesuai ketentuan.",
    ],
    source: "Dokumen Internal Kelurahan",
    owner: "Pengelola SIPANDAI",
    status: "Aktif",
    version: "2.1",
    updatedAt: "10 Sep 2026",
    reviewDate: "10 Des 2026",
    docNumber: "SOP-TBL/07/2026",
    isPublic: false,
    gap: "Menjawab gap 2 & 4: versi terbaru terstandar agar tidak ada perbedaan pemahaman antarpetugas.",
    views: 214,
  },
  {
    id: "syarat-domisili",
    title: "Persyaratan Surat Keterangan Domisili",
    type: "Persyaratan",
    description:
      "Daftar dokumen dan ketentuan yang wajib dipenuhi pemohon Surat Keterangan Domisili.",
    content: [
      "Fotokopi KTP pemohon yang masih berlaku.",
      "Fotokopi Kartu Keluarga (KK).",
      "Surat pengantar RT/RW setempat.",
      "Bukti tempat tinggal (kontrak/sewa atau surat pernyataan pemilik rumah bila menumpang).",
      "Mengisi formulir permohonan yang disediakan kelurahan.",
    ],
    source: "Dokumen Pelayanan",
    owner: "Pengelola SIPANDAI",
    status: "Aktif",
    version: "1.3",
    updatedAt: "8 Sep 2026",
    reviewDate: "8 Des 2026",
    isPublic: true,
    gap: "Menjawab gap 1: persyaratan yang tersebar dirangkum dalam satu acuan.",
    views: 486,
  },
  {
    id: "sop-keterangan-umum",
    title: "SOP Pelayanan Surat Keterangan Umum",
    type: "SOP",
    description:
      "Prosedur pelaksanaan layanan surat keterangan umum (usaha, tidak mampu, kelahiran, dan sejenisnya).",
    content: [
      "Pemeriksaan identitas pemohon dan jenis surat yang diminta.",
      "Verifikasi dokumen pendukung sesuai matriks persyaratan tiap jenis surat.",
      "Validasi oleh petugas verifikator sebelum penandatanganan.",
      "Penyerahan dokumen dan pencatatan register layanan.",
    ],
    source: "Dokumen Internal Kelurahan",
    owner: "Pengelola SIPANDAI",
    status: "Aktif",
    version: "2.0",
    updatedAt: "20 Agu 2026",
    reviewDate: "20 Nov 2026",
    docNumber: "SOP-TBL/05/2026",
    isPublic: false,
    gap: "Menjawab gap 4: satu prosedur baku untuk semua petugas.",
    views: 167,
  },
  {
    id: "regulasi-adminduk",
    title: "Regulasi Dasar Pelayanan Administrasi Kependudukan",
    type: "Regulasi",
    description:
      "Ringkasan peraturan yang menjadi dasar pelayanan administrasi di tingkat kelurahan (ringkasan internal, bukan dokumen hukum resmi).",
    content: [
      "Pelayanan kelurahan mengacu pada peraturan perundang-undangan administrasi kependudukan yang berlaku.",
      "Setiap perubahan regulasi wajib dicatat sebagai versi baru dan ditandai tanggal berlakunya.",
      "Petugas wajib menggunakan regulasi versi aktif; versi lama hanya untuk arsip dan penelusuran.",
      "Unduh naskah lengkap peraturan melalui tautan sumber resmi yang tercantum pada lampiran knowledge.",
    ],
    source: "Peraturan Perundang-undangan (ringkasan)",
    owner: "Pimpinan Kelurahan",
    status: "Aktif",
    version: "3.0",
    updatedAt: "2 Sep 2026",
    reviewDate: "2 Mar 2027",
    docNumber: "REG-RINGKAS/2026",
    isPublic: false,
    gap: "Menjawab gap 2 & 5: perubahan regulasi terdokumentasi dan tertelusur versinya.",
    views: 198,
  },
  {
    id: "panduan-dok-tidak-lengkap",
    title: "Panduan Penanganan Dokumen Tidak Lengkap",
    type: "Panduan Kasus",
    description:
      "Panduan langkah penanganan ketika berkas pemohon kurang atau tidak sesuai, berdasarkan pengalaman petugas.",
    content: [
      "Identifikasi dokumen yang kurang dengan merujuk pada checklist persyaratan versi aktif — jangan mengandalkan hafalan.",
      "Sampaikan kekurangan secara jelas dan catat pada lembar verifikasi agar petugas berikutnya memahami konteksnya.",
      "Berikan batas waktu dan cara melengkapi (contoh: surat pengantar RT/RW asli, bukan fotokopi).",
      "Jika kasus berulang (mis. pendatang tanpa KK setempat), rujuk ke FAQ dan catat pengalaman sebagai usulan knowledge baru.",
      "Tidak mencatat data pribadi pemohon pada panduan ini — hanya pola kasus dan cara penanganannya.",
    ],
    source: "Pengalaman Petugas (dikurasi)",
    owner: "Petugas Senior",
    status: "Aktif",
    version: "1.1",
    updatedAt: "5 Sep 2026",
    reviewDate: "5 Des 2026",
    isPublic: false,
    gap: "Menjawab gap 3: pengalaman petugas dibagikan agar tidak bergantung pada individu.",
    views: 152,
  },
  {
    id: "panduan-nama-beda",
    title: "Panduan Penanganan Perbedaan Nama pada Dokumen",
    type: "Panduan Kasus",
    description:
      "Acuan penanganan ketika nama pemohon berbeda antara KTP, KK, dan dokumen pendukung.",
    content: [
      "Bandingkan seluruh dokumen identitas dan tandai bagian yang berbeda.",
      "Minta dokumen pendukung tambahan (ijazah, akta, atau surat pernyataan) sesuai ketentuan.",
      "Jangan mengubah data; arahkan pemohon mengikuti mekanisme perbaikan data yang berlaku.",
      "Dokumentasikan pola kasus untuk usulan pembaruan FAQ bila sering terjadi.",
    ],
    source: "Pengalaman Petugas (dikurasi)",
    owner: "Petugas Senior",
    status: "Aktif",
    version: "1.0",
    updatedAt: "28 Agu 2026",
    reviewDate: "28 Nov 2026",
    isPublic: false,
    gap: "Menjawab gap 3 & 4: penanganan kasus diseragamkan.",
    views: 121,
  },
  {
    id: "faq-domisili",
    title: "FAQ Surat Keterangan Domisili",
    type: "FAQ",
    description:
      "Pertanyaan dan jawaban yang paling sering muncul seputar layanan domisili.",
    content: [
      "Q: Apakah surat pengantar RT/RW wajib? A: Ya, wajib sebagai bukti domisili awal sebelum verifikasi kelurahan.",
      "Q: Berapa lama proses jika berkas lengkap? A: Mengacu pada SOP versi aktif; umumnya diselesaikan pada hari yang sama bila berkas valid.",
      "Q: Bagaimana jika KTP masih daerah asal? A: Petugas memeriksa ketentuan perpindahan penduduk yang berlaku dan mengarahkan sesuai prosedur.",
      "Q: Apakah bisa diwakilkan? A: Bisa dengan surat kuasa dan identitas penerima kuasa, sesuai ketentuan yang berlaku.",
    ],
    source: "Kompilasi Pertanyaan Layanan",
    owner: "Pengelola SIPANDAI",
    status: "Aktif",
    version: "1.2",
    updatedAt: "6 Sep 2026",
    reviewDate: "6 Des 2026",
    isPublic: true,
    gap: "Menjawab gap 1 & 4: jawaban seragam untuk pertanyaan berulang.",
    views: 342,
  },
  {
    id: "faq-umum",
    title: "FAQ Layanan Surat Keterangan Umum",
    type: "FAQ",
    description: "Kumpulan jawaban cepat untuk pertanyaan umum seputar surat keterangan.",
    content: [
      "Q: Jam layanan kapan? A: Mengikuti jam pelayanan kelurahan yang diumumkan pada papan informasi dan kanal resmi.",
      "Q: Apakah ada biaya? A: Mengacu pada ketentuan resmi; petugas tidak memungut biaya di luar ketentuan.",
      "Q: Syarat fotokopi harus dilegalisir? A: Menyesuaikan jenis surat; lihat matriks persyaratan pada knowledge Persyaratan terkait.",
    ],
    source: "Kompilasi Pertanyaan Layanan",
    owner: "Pengelola SIPANDAI",
    status: "Aktif",
    version: "1.0",
    updatedAt: "15 Agu 2026",
    reviewDate: "15 Nov 2026",
    isPublic: true,
    gap: "Menjawab gap 1: mengurangi pencarian berulang untuk pertanyaan umum.",
    views: 187,
  },
  {
    id: "syarat-usaha",
    title: "Persyaratan Surat Keterangan Usaha",
    type: "Persyaratan",
    description: "Dokumen dan ketentuan pengajuan Surat Keterangan Usaha (SKU).",
    content: [
      "Fotokopi KTP dan KK.",
      "Surat pengantar RT/RW.",
      "Bukti usaha (foto tempat usaha atau surat pernyataan usaha).",
      "Mengisi formulir permohonan SKU.",
    ],
    source: "Dokumen Pelayanan",
    owner: "Pengelola SIPANDAI",
    status: "Menunggu Review",
    version: "1.4-draft",
    updatedAt: "12 Sep 2026",
    reviewDate: "—",
    isPublic: true,
    gap: "Menjawab gap 2: pembaruan persyaratan menunggu persetujuan sebelum dipakai.",
    views: 64,
  },
];

export const SUBMISSIONS: Submission[] = [
  {
    id: "sub-01",
    title: "Pembaruan Persyaratan Surat Keterangan Usaha v1.4",
    type: "Persyaratan",
    submitter: "Petugas Pelayanan A",
    role: "Petugas Pelayanan",
    date: "12 Sep 2026",
    status: "Menunggu Review",
    reason:
      "Banyak pemohon menanyakan bukti usaha berupa foto tempat usaha; perlu ditegaskan pada daftar persyaratan agar verifikasi konsisten.",
    source: "Temuan layanan + pengalaman petugas",
    version: "1.3 → 1.4",
    changes: "Menambah poin bukti usaha + memperjelas format surat pernyataan.",
  },
  {
    id: "sub-02",
    title: "Panduan Penanganan KK Pendatang Baru",
    type: "Panduan Kasus",
    submitter: "Petugas Pelayanan B",
    role: "Petugas Pelayanan",
    date: "11 Sep 2026",
    status: "Menunggu Review",
    reason:
      "Kasus pendatang tanpa KK setempat sering terjadi; panduan perlu dibakukan agar tidak bergantung pada petugas tertentu.",
    source: "Pengalaman petugas",
    version: "Baru (v1.0)",
    changes: "Knowledge baru hasil kurasi pengalaman lapangan.",
  },
  {
    id: "sub-03",
    title: "Revisi FAQ Domisili — Klausul KTP Daerah Asal",
    type: "FAQ",
    submitter: "Petugas Pelayanan A",
    role: "Petugas Pelayanan",
    date: "9 Sep 2026",
    status: "Perlu Revisi",
    reason: "Jawaban klausul KTP daerah asal perlu merujuk regulasi terbaru.",
    source: "Regulasi terbaru (ringkasan)",
    version: "1.2 → 1.3",
    changes: "Menunggu pelampiran nomor regulasi acuan yang tepat.",
  },
  {
    id: "sub-04",
    title: "SOP Surat Keterangan Umum v2.0",
    type: "SOP",
    submitter: "Pengelola SIPANDAI",
    role: "Pengelola SIPANDAI",
    date: "20 Agu 2026",
    status: "Disetujui",
    reason: "Penyesuaian alur validasi sebelum penandatanganan.",
    source: "Dokumen Internal Kelurahan",
    version: "1.5 → 2.0",
    changes: "Disetujui pimpinan pada 20 Agu 2026 dan diterbitkan sebagai versi aktif.",
  },
];

export const HISTORY: HistoryEntry[] = [
  {
    id: "h-01",
    knowledgeId: "sop-domisili",
    knowledgeTitle: "SOP Pelayanan Surat Keterangan Domisili",
    version: "2.1",
    change: "Pembaruan persyaratan — penegasan bukti domisili",
    by: "Pengelola SIPANDAI",
    role: "Pengelola SIPANDAI",
    date: "10 Sep 2026",
  },
  {
    id: "h-02",
    knowledgeId: "sop-domisili",
    knowledgeTitle: "SOP Pelayanan Surat Keterangan Domisili",
    version: "2.0",
    change: "Perubahan prosedur — alur validasi sebelum tanda tangan",
    by: "Pengelola SIPANDAI",
    role: "Pengelola SIPANDAI",
    date: "20 Agu 2026",
  },
  {
    id: "h-03",
    knowledgeId: "sop-domisili",
    knowledgeTitle: "SOP Pelayanan Surat Keterangan Domisili",
    version: "1.0",
    change: "Versi awal diterbitkan",
    by: "Pengelola SIPANDAI",
    role: "Pengelola SIPANDAI",
    date: "1 Jul 2026",
  },
  {
    id: "h-04",
    knowledgeId: "syarat-domisili",
    knowledgeTitle: "Persyaratan Surat Keterangan Domisili",
    version: "1.3",
    change: "Penambahan ketentuan bukti tempat tinggal bagi pendatang",
    by: "Pengelola SIPANDAI",
    role: "Pengelola SIPANDAI",
    date: "8 Sep 2026",
  },
  {
    id: "h-05",
    knowledgeId: "regulasi-adminduk",
    knowledgeTitle: "Regulasi Dasar Pelayanan Administrasi Kependudukan",
    version: "3.0",
    change: "Penyesuaian ringkasan terhadap perubahan regulasi",
    by: "Pimpinan Kelurahan",
    role: "Pimpinan / Approver",
    date: "2 Sep 2026",
  },
  {
    id: "h-06",
    knowledgeId: "panduan-dok-tidak-lengkap",
    knowledgeTitle: "Panduan Penanganan Dokumen Tidak Lengkap",
    version: "1.1",
    change: "Penambahan pola kasus pendatang tanpa KK setempat",
    by: "Petugas Senior",
    role: "Petugas Pelayanan",
    date: "5 Sep 2026",
  },
];

export const SERVICES: PublicService[] = [
  {
    id: "domisili",
    name: "Surat Keterangan Domisili",
    description:
      "Surat keterangan tempat tinggal untuk keperluan administrasi (data dummy).",
    requirements: [
      "Fotokopi KTP yang masih berlaku",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat pengantar RT/RW",
      "Bukti tempat tinggal",
      "Formulir permohonan",
    ],
    procedure: [
      "Siapkan seluruh dokumen persyaratan.",
      "Datang ke loket pelayanan dengan membawa dokumen asli dan fotokopi.",
      "Petugas memeriksa dan memverifikasi berkas.",
      "Jika lengkap, berkas divalidasi dan diterbitkan surat keterangan.",
    ],
    faq: [
      {
        q: "Apakah surat pengantar RT/RW wajib?",
        a: "Ya, wajib sebagai bukti domisili awal.",
      },
      {
        q: "Bagaimana jika KTP masih daerah asal?",
        a: "Petugas akan memeriksa ketentuan perpindahan penduduk yang berlaku.",
      },
    ],
    updatedAt: "8 Sep 2026",
  },
  {
    id: "usaha",
    name: "Surat Keterangan Usaha",
    description: "Surat keterangan untuk keperluan usaha mikro (data dummy).",
    requirements: [
      "Fotokopi KTP dan KK",
      "Surat pengantar RT/RW",
      "Bukti usaha",
      "Formulir permohonan SKU",
    ],
    procedure: [
      "Siapkan dokumen persyaratan usaha.",
      "Serahkan ke loket pelayanan untuk verifikasi.",
      "Petugas memvalidasi bukti usaha.",
      "Surat diterbitkan setelah validasi selesai.",
    ],
    faq: [
      {
        q: "Bukti usaha seperti apa yang diterima?",
        a: "Foto tempat usaha atau surat pernyataan usaha sesuai ketentuan.",
      },
    ],
    updatedAt: "12 Sep 2026",
  },
  {
    id: "umum",
    name: "Surat Keterangan Umum",
    description:
      "Layanan surat keterangan umum lainnya (data dummy, mengacu pada SOP v2.0).",
    requirements: [
      "Identitas diri (KTP)",
      "Dokumen pendukung sesuai jenis surat",
      "Surat pengantar RT/RW bila dipersyaratkan",
    ],
    procedure: [
      "Tentukan jenis surat yang dibutuhkan.",
      "Lengkapi dokumen sesuai matriks persyaratan.",
      "Verifikasi dan validasi oleh petugas.",
      "Pengambilan surat di loket.",
    ],
    faq: [
      {
        q: "Apakah ada biaya?",
        a: "Mengacu pada ketentuan resmi yang berlaku.",
      },
    ],
    updatedAt: "20 Agu 2026",
  },
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n-01",
    title: "2 usulan baru menunggu review",
    desc: "Persyaratan SKU v1.4 dan Panduan KK Pendatang dari Petugas Pelayanan.",
    time: "2 jam lalu",
    unread: true,
    kind: "usulan",
  },
  {
    id: "n-02",
    title: "SOP Domisili v2.1 diterbitkan",
    desc: "Perubahan persyaratan sudah aktif dan dapat dijadikan acuan.",
    time: "1 hari lalu",
    unread: true,
    kind: "perubahan",
  },
  {
    id: "n-03",
    title: "1 pengajuan perlu revisi",
    desc: "Revisi FAQ Domisili membutuhkan nomor regulasi acuan.",
    time: "2 hari lalu",
    unread: false,
    kind: "review",
  },
];

export function getKnowledge(id: string): Knowledge | undefined {
  return KNOWLEDGE.find((k) => k.id === id);
}

export function searchKnowledge(query: string): Knowledge[] {
  const q = query.trim().toLowerCase();
  if (!q) return KNOWLEDGE;
  return KNOWLEDGE.filter(
    (k) =>
      k.title.toLowerCase().includes(q) ||
      k.description.toLowerCase().includes(q) ||
      k.type.toLowerCase().includes(q) ||
      k.content.join(" ").toLowerCase().includes(q)
  );
}
