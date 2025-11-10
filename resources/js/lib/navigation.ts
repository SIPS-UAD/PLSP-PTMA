import { type NavLink } from '@/types';

// Main Navigation Links
export const navigationsLink: NavLink[] = [
    {
        text: 'TENTANG',
        link: '/tentang/profil',
        children: [
            { text: 'Profil', link: '/tentang/profil' },
            { text: 'Anggaran Dasar', link: '/tentang/ad' },
            { text: 'Anggaran Rumah Tangga', link: '/tentang/anggaran-rumah-tangga' },
            { text: 'Hasil Rakernas', link: '/tentang/hasil-rakernas' },
            { text: 'Hasil Munas', link: '/tentang/hasil-munas' },
        ],
    },
    {
        text: 'ANGGOTA',
        link: '/anggota/form-isian',
        children: [
            { text: 'Form Isian', link: '/anggota/form-isian' },
            { text: 'Proses Lisensi BNSP', link: '/anggota/proses-lisensi-BNSP' },
            { text: 'Tamu Kegiatan', link: '/anggota/tamu-kegiatan' },
            { text: 'Terlisensi BNSP', link: '/anggota/terlisensi-BNSP' },
        ],
    },
    {
        text: 'SUMBER DAYA',
        link: '/sumber-daya/asesor',
        children: [
            { text: 'Asesor', link: '/sumber-daya/asesor' },
            { text: 'CMA', link: '/sumber-daya/cma' },
            { text: 'Skema Sertifikasi', link: '/sumber-daya/skema-sertifikasi' },
            { text: 'TUK', link: '/sumber-daya/tuk' },
        ],
    },
    {
        text: 'MATERI',
        link: '/materi/internalisasi',
        children: [
            { text: 'Internalisasi', link: '/materi/internalisasi' },
            { text: 'Pelatihan Asesor', link: '/materi/pelatihan-asesor' },
            { text: 'Penyusunan Dokumen', link: '/materi/penyusunan-dokumen' },
        ],
    },
    {
        text: 'PENDIRIAN LISENSI',
        link: '/pendirian-lisensi/apresiasi',
        children: [
            { text: 'Apresiasi', link: '/pendirian-lisensi/apresiasi' },
            { text: 'Pendirian LSP', link: '/pendirian-lisensi/pendirian-lsp' },
            { text: 'Pengajuan FA', link: '/pendirian-lisensi/pengajuan-fa' },
            { text: 'Pengajuan Skema Sertifikasi', link: '/pendirian-lisensi/pengajuan-skema-sertifikasi' },
            { text: 'Pengajuan Witness', link: '/pendirian-lisensi/pengajuan-witness' },
            { text: 'PRL', link: '/pendirian-lisensi/prl' },
        ],
    },
    {
        text: 'REGULASI',
        link: '/regulasi/iku-pt',
        children: [
            { text: 'IKU Perguruan Tinggi', link: '/regulasi/iku-pt' },
            { text: 'Peraturan Baru', link: '/regulasi/peraturan-baru' },
            { text: 'Peraturan BNSP', link: '/regulasi/peraturan-bnsp' },
            { text: 'Peraturan Dasar', link: '/regulasi/peraturan-dasar' },
            { text: 'Proses Lisensi', link: '/regulasi/proses-lisensi' },
        ],
    },
    {
        text: 'KEGIATAN',
        link: '/kegiatan',
    },
    {
        text: 'BERITA',
        link: '/berita',
    },
];
