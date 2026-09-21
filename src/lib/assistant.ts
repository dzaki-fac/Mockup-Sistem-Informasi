import { KNOWLEDGE, type Knowledge } from "./data";

export interface AssistantSource {
  id: string;
  title: string;
  version: string;
  updatedAt: string;
  status: string;
}

export interface AssistantAnswer {
  text: string;
  sources: AssistantSource[];
}

export const SUGGESTED_QUESTIONS = [
  "Apa persyaratan layanan surat keterangan domisili?",
  "Bagaimana prosedur pengajuan layanan ini?",
  "Apa SOP terbaru untuk verifikasi dokumen?",
  "Apa perubahan pada regulasi terbaru?",
];

export const NO_MATCH_MESSAGE =
  "Maaf, informasi yang relevan belum ditemukan dalam knowledge base KMS. Silakan gunakan Knowledge Center atau ajukan knowledge baru kepada pengelola.";

function toSource(k: Knowledge): AssistantSource {
  return {
    id: k.id,
    title: k.title,
    version: k.version,
    updatedAt: k.updatedAt,
    status: k.status,
  };
}

function byId(id: string): Knowledge {
  const found = KNOWLEDGE.find((k) => k.id === id);
  if (!found) throw new Error(`Knowledge ${id} tidak ditemukan`);
  return found;
}

/** Ringkasan poin penting sebuah dokumen (untuk konteks "Tanyakan ke AI"). */
export function summarizeDoc(id: string): AssistantAnswer {
  const doc = byId(id);
  const points = doc.content.slice(0, 3).join(" ");
  return {
    text: `Berdasarkan ${doc.title} versi ${doc.version}, poin pentingnya adalah sebagai berikut. ${points} Pastikan acuan yang digunakan adalah versi terbaru (${doc.version}, diperbarui ${doc.updatedAt}).`,
    sources: [toSource(doc)],
  };
}

/** Contoh percakapan awal agar halaman tidak kosong. */
export function exampleConversation(): { user: string; ai: AssistantAnswer } {
  return {
    user: "Bagaimana persyaratan layanan surat keterangan domisili?",
    ai: {
      text: "Berdasarkan knowledge yang tersedia di KMS, persyaratan layanan surat keterangan domisili meliputi KTP, Kartu Keluarga, dan formulir permohonan. Pastikan seluruh dokumen masih berlaku dan sesuai dengan ketentuan yang tercantum pada dokumen layanan.",
      sources: [toSource(byId("syarat-domisili"))],
    },
  };
}

/** Mesin jawab dummy: mencocokkan kata kunci dengan knowledge yang ada. */
export function answerQuestion(query: string): AssistantAnswer {
  const q = query.toLowerCase();

  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (has("domisili")) {
    if (has("syarat", "dokumen apa", "apa saja", "persyaratan")) {
      const d = byId("syarat-domisili");
      return {
        text: `Berdasarkan dokumen Persyaratan Layanan Surat Keterangan Domisili versi ${d.version}, persyaratan yang diperlukan adalah fotokopi KTP yang masih berlaku, fotokopi Kartu Keluarga, surat pengantar RT/RW, bukti tempat tinggal, dan formulir permohonan. Pastikan dokumen yang digunakan merupakan versi terbaru.`,
        sources: [toSource(d)],
      };
    }
    if (has("sop", "prosedur", "verifikasi", "alur", "cara", "pengajuan")) {
      const d = byId("sop-domisili");
      return {
        text: `Berdasarkan SOP Pelayanan Surat Keterangan Domisili versi ${d.version}, prosedurnya adalah: periksa kelengkapan berkas sesuai daftar persyaratan versi berjalan, verifikasi kesesuaian data KTP, KK, dan bukti domisili, catat kekurangan pada lembar verifikasi bila belum lengkap, lalu validasi dan teruskan ke penandatanganan bila sudah valid.`,
        sources: [toSource(d), toSource(byId("syarat-domisili"))],
      };
    }
    if (has("faq", "sering", "tanya")) {
      const d = byId("faq-domisili");
      return {
        text: `Berdasarkan FAQ Surat Keterangan Domisili versi ${d.version}, hal yang paling sering ditanyakan adalah kewajiban surat pengantar RT/RW, ketentuan KTP daerah asal, kemungkinan pengurusan oleh wakil dengan surat kuasa, dan lama proses bila berkas lengkap dan valid.`,
        sources: [toSource(d)],
      };
    }
    return {
      text: "Untuk layanan surat keterangan domisili, acuan yang tersedia adalah SOP versi 2.1 (prosedur verifikasi dan validasi), daftar persyaratan versi 1.3, dan FAQ versi 1.2. Silakan sebutkan kebutuhan spesifik — persyaratan, prosedur, atau pertanyaan umum — agar saya tunjukkan dokumen yang tepat.",
      sources: [toSource(byId("sop-domisili")), toSource(byId("syarat-domisili")), toSource(byId("faq-domisili"))],
    };
  }

  if (has("usaha", "sku")) {
    const d = byId("syarat-usaha");
    return {
      text: `Berdasarkan Persyaratan Surat Keterangan Usaha, dokumen yang diperlukan adalah fotokopi KTP dan KK, surat pengantar RT/RW, bukti usaha, dan formulir permohonan SKU. Perhatian: pembaruan ke versi 1.4 saat ini berstatus Menunggu Review, sehingga acuan resmi yang berlaku tetap versi sebelumnya hingga disetujui pimpinan.`,
      sources: [toSource(d)],
    };
  }

  if (has("sop") && has("verifikasi", "validasi", "dokumen")) {
    const d = byId("sop-domisili");
    const p = byId("panduan-dok-tidak-lengkap");
    return {
      text: `SOP terbaru untuk verifikasi dokumen adalah SOP Pelayanan Surat Keterangan Domisili versi ${d.version} (diperbarui ${d.updatedAt}): periksa kelengkapan berdasarkan checklist versi aktif, verifikasi kesesuaian data antar-dokumen, dan validasi sebelum penandatanganan. Bila berkas kurang, ikuti Panduan Penanganan Dokumen Tidak Lengkap versi ${p.version} — catat kekurangan pada lembar verifikasi dan arahkan pemohon melengkapinya.`,
      sources: [toSource(d), toSource(p)],
    };
  }

  if (has("sop")) {
    const d = byId("sop-keterangan-umum");
    return {
      text: `Berdasarkan SOP Pelayanan Surat Keterangan Umum versi ${d.version}, tahapnya adalah pemeriksaan identitas dan jenis surat, verifikasi dokumen pendukung sesuai matriks persyaratan, validasi oleh petugas verifikator, kemudian penyerahan dan pencatatan register. Untuk layanan domisili, gunakan SOP Domisili versi 2.1 yang lebih spesifik.`,
      sources: [toSource(d), toSource(byId("sop-domisili"))],
    };
  }

  if (has("regulasi", "peraturan", "aturan", "perubahan")) {
    const d = byId("regulasi-adminduk");
    return {
      text: `Berdasarkan Regulasi Dasar Pelayanan Administrasi Kependudukan versi ${d.version} (diperbarui ${d.updatedAt}), pelayanan mengacu pada peraturan perundang-undangan administrasi kependudukan yang berlaku. Setiap perubahan regulasi dicatat sebagai versi baru beserta tanggal berlakunya, dan petugas wajib memakai versi aktif — versi lama hanya untuk arsip.`,
      sources: [toSource(d)],
    };
  }

  if (has("tidak lengkap", "kurang", "belum lengkap", "kekurangan")) {
    const d = byId("panduan-dok-tidak-lengkap");
    return {
      text: `Berdasarkan Panduan Penanganan Dokumen Tidak Lengkap versi ${d.version}, langkahnya adalah identifikasi kekurangan dengan checklist persyaratan versi aktif, sampaikan secara jelas dan catat pada lembar verifikasi, berikan batas waktu dan cara melengkapi, dan catat pola kasus berulang sebagai usulan knowledge baru. Panduan ini tidak memuat data pribadi pemohon.`,
      sources: [toSource(d)],
    };
  }

  if (has("nama") && has("beda", "berbeda", "salah", "keliru")) {
    const d = byId("panduan-nama-beda");
    return {
      text: `Berdasarkan Panduan Penanganan Perbedaan Nama pada Dokumen versi ${d.version}, bandingkan seluruh dokumen identitas dan tandai bagian yang berbeda, minta dokumen pendukung tambahan sesuai ketentuan, jangan mengubah data sepihak, dan arahkan pemohon mengikuti mekanisme perbaikan data yang berlaku.`,
      sources: [toSource(d)],
    };
  }

  if (has("prosedur", "alur", "cara", "tahap", "pengajuan")) {
    const d = byId("sop-keterangan-umum");
    return {
      text: `Berdasarkan SOP Pelayanan Surat Keterangan Umum versi ${d.version}, prosedur pengajuan adalah siapkan dokumen persyaratan, serahkan ke loket untuk pemeriksaan dan verifikasi, tunggu validasi petugas, lalu ambil surat setelah diterbitkan dan dicatat pada register. Sebutkan jenis layanannya bila memerlukan prosedur yang lebih spesifik.`,
      sources: [toSource(d)],
    };
  }

  if (has("jam", "biaya", "bayar", "wakil", "kuasa", "lama", "berapa")) {
    const d = byId("faq-umum");
    return {
      text: `Berdasarkan FAQ Layanan Surat Keterangan Umum versi ${d.version}, jam layanan mengikuti jadwal yang diumumkan kelurahan, tidak ada pungutan di luar ketentuan resmi, dan ketentuan legalisir fotokopi mengikuti matriks persyaratan tiap jenis surat. Untuk detail domisili, lihat FAQ Domisili versi 1.2.`,
      sources: [toSource(d), toSource(byId("faq-domisili"))],
    };
  }

  if (has("persyaratan", "syarat")) {
    const d = byId("syarat-domisili");
    return {
      text: `Acuan persyaratan yang tersedia mencakup Surat Keterangan Domisili versi ${d.version} dan Surat Keterangan Usaha. Sebutkan jenis layanannya agar saya tunjukkan daftar dokumen yang tepat beserta versinya.`,
      sources: [toSource(d), toSource(byId("syarat-usaha"))],
    };
  }

  return { text: NO_MATCH_MESSAGE, sources: [] };
}
