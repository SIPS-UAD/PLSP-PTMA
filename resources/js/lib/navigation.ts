import {
    anggota,
    berita,
    kegiatan,
    landingpage,
    materi,
    pendirianLisensi,
    regulasi,
    sumberDaya,
    tentang,
} from '@/routes/landingpage';
import { type NavLink } from '@/types';

// Main Navigation Links
export const navigationsLink: NavLink[] = [
    {
        text: 'BERANDA',
        link: landingpage().url,
    },
    {
        text: 'TENTANG',
        link: tentang.profil().url,
        children: [
            { text: 'Profil', link: tentang.profil().url },
            { text: 'Anggaran Dasar', link: tentang.anggaranDasar().url },
            {
                text: 'Anggaran Rumah Tangga',
                link: tentang.anggaranRumahTangga().url,
            },
            { text: 'Hasil Rakernas', link: tentang.hasilRakernas().url },
            { text: 'Hasil Munas', link: tentang.hasilMunas().url },
        ],
    },
    {
        text: 'ANGGOTA',
        link: anggota.formIsian().url,
        children: [
            { text: 'Form Isian', link: anggota.formIsian().url },
            {
                text: 'Proses Lisensi BNSP',
                link: anggota.prosesLisensiBnsp().url,
            },
            { text: 'SK Pimpinan PTMA', link: anggota.skPimpinanPtma().url },
            { text: 'Tamu Kegiatan', link: anggota.tamuKegiatan().url },
            { text: 'Terlisensi BNSP', link: anggota.terlisensiBnsp().url },
        ],
    },
    {
        text: 'SUMBER DAYA',
        link: sumberDaya.asesor().url,
        children: [
            { text: 'Asesor', link: sumberDaya.asesor().url },
            { text: 'CMA', link: sumberDaya.cma().url },
            {
                text: 'Skema Sertifikasi',
                link: sumberDaya.skemaSertifikasi().url,
            },
            { text: 'TUK', link: sumberDaya.tuk().url },
        ],
    },
    {
        text: 'MATERI',
        link: materi.internalisasi().url,
        children: [
            { text: 'Internalisasi', link: materi.internalisasi().url },
            { text: 'Pelatihan Asesor', link: materi.pelatihanAsesor().url },
            {
                text: 'Penyusunan Dokumen',
                link: materi.penyusunanDokumen().url,
            },
        ],
    },
    {
        text: 'PENDIRIAN LISENSI',
        link: pendirianLisensi.apresiasi().url,
        children: [
            { text: 'Apresiasi', link: pendirianLisensi.apresiasi().url },
            {
                text: 'Pendirian LSP',
                link: pendirianLisensi.pendirianLsp().url,
            },
            { text: 'Pengajuan FA', link: pendirianLisensi.pengajuanFa().url },
            {
                text: 'Pengajuan Skema Sertifikasi',
                link: pendirianLisensi.pengajuanSkemaSertifikasi().url,
            },
            {
                text: 'Pengajuan Witness',
                link: pendirianLisensi.pengajuanWitness().url,
            },
            { text: 'PRL', link: pendirianLisensi.prl().url },
        ],
    },
    {
        text: 'REGULASI',
        link: regulasi.ikuPt().url,
        children: [
            { text: 'IKU Perguruan Tinggi', link: regulasi.ikuPt().url },
            { text: 'Peraturan Baru', link: regulasi.peraturanBaru().url },
            { text: 'Peraturan BNSP', link: regulasi.peraturanBnsp().url },
            { text: 'Peraturan Dasar', link: regulasi.peraturanDasar().url },
            { text: 'Proses Lisensi', link: regulasi.prosesLisensi().url },
        ],
    },
    {
        text: 'KEGIATAN',
        link: kegiatan().url,
    },
    {
        text: 'BERITA',
        link: berita().url,
    },
];
