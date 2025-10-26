<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/landing', function () {
    return Inertia::render('landingpage/beranda/index');
})->name('landingpage');

Route::get('/tentang', function () {
    return Inertia::render('landingpage/tentang/page');
})->name('landingpage.tentang');


// Page Anggota
Route::get('/anggota/form-isian', function () {
    return Inertia::render('landingpage/anggota/formIsian/index');
})->name('landingpage.anggota.form-isian');

Route::get('/anggota/proses-lisensi-BNSP', function () {
    return Inertia::render('landingpage/anggota/prosesLisensiBNSP/index');
})->name('landingpage.anggota.proses-lisensi-BNSP');

Route::get('/anggota/tamu-kegiatan', function () {
    return Inertia::render('landingpage/anggota/tamuKegiatan/index');
})->name('landingpage.anggota.tamu-kegiatan');

Route::get('/anggota/terlisensi-BNSP', function () {
    return Inertia::render('landingpage/anggota/terlisensiBNSP/index');
})->name('landingpage.anggota.terlisensi-BNSP');


// Page Sumber Daya
Route::get('/sumber-daya/asesor', function () {
    return Inertia::render('landingpage/sumberDaya/asesor/index');
})->name('landingpage.sumber-daya.asesor');

Route::get('/sumber-daya/cma', function () {
    return Inertia::render('landingpage/sumberDaya/CMA/index');
})->name('landingpage.sumber-daya.cma');

Route::get('/sumber-daya/skema-sertifikasi', function () {
    return Inertia::render('landingpage/sumberDaya/skemaSertifikasi/index');
})->name('landingpage.sumber-daya.skema-sertifikasi');

Route::get('/sumber-daya/tuk', function () {
    return Inertia::render('landingpage/sumberDaya/TUK/index');
})->name('landingpage.sumber-daya.tuk');


// Page Materi
Route::get('/materi/internalisasi', function () {
    return Inertia::render('landingpage/materi/internalisasi/index');
})->name('landingpage.materi.internalisasi');

Route::get('/materi/pelatihan-asesor', function () {
    return Inertia::render('landingpage/materi/pelatihanAsesor/index');
})->name('landingpage.materi.pelatihan-asesor');

Route::get('/materi/penyusunan-dokumen', function () {
    return Inertia::render('landingpage/materi/penyusunanDokumen/index');
})->name('landingpage.materi.penyusunan-dokumen');


// Page Pendirian Lisensi
Route::get('/pendirian-lisensi/apresiasi', function () {
    return Inertia::render('landingpage/pendirianLisensi/apresiasi/index');
})->name('landingpage.pendirian-lisensi/apresiasi');

Route::get('/pendirian-lisensi/pendirian-lsp', function () {
    return Inertia::render('landingpage/pendirianLisensi/pendirianLSP/index');
})->name('landingpage.pendirian-lisensi/pendirian-lsp');

Route::get('/pendirian-lisensi/pengajuan-fa', function () {
    return Inertia::render('landingpage/pendirianLisensi/pengajuanFA/index');
})->name('landingpage.pendirian-lisensi/pengajuan-fa');

Route::get('/pendirian-lisensi/pengajuan-skema-sertifikasi', function () {
    return Inertia::render('landingpage/pendirianLisensi/pengajuanSkemaSertifikasi/index');
})->name('landingpage.pendirian-lisensi/pengajuan-skema-sertifikasi');

Route::get('/pendirian-lisensi/pengajuan-witness', function () {
    return Inertia::render('landingpage/pendirianLisensi/pengajuanWitness/index');
})->name('landingpage.pendirian-lisensi/pengajuan-witness');

Route::get('/pendirian-lisensi/prl', function () {
    return Inertia::render('landingpage/pendirianLisensi/PRL/index');
})->name('landingpage.pendirian-lisensi/prl');


// Page Regulasi
Route::get('/regulasi/iku-pt', function () {
    return Inertia::render('landingpage/regulasi/IKUPErguruanTinggi/index');
})->name('landingpage.regulasi.iku-pt');

Route::get('/regulasi/peraturan-baru', function () {
    return Inertia::render('landingpage/regulasi/peraturanBaru/index');
})->name('landingpage.regulasi.peraturan-baru');

Route::get('/regulasi/peraturan-bnsp', function () {
    return Inertia::render('landingpage/regulasi/peraturanBNSP/index');
})->name('landingpage.regulasi.peraturan-bnsp');

Route::get('/regulasi/peraturan-dasar', function () {
    return Inertia::render('landingpage/regulasi/peraturanDasar/index');
})->name('landingpage.regulasi.peraturan-dasar');

Route::get('/regulasi/proses-lisensi', function () {
    return Inertia::render('landingpage/regulasi/prosesLisensi/index');
})->name('landingpage.regulasi.proses-lisensi');


// Page Tentang
Route::get('/tentang/profil', function () {
    return Inertia::render('landingpage/tentang/profil/index');
})->name('landingpage.tentang.profil');

Route::get('/tentang/ad', function () {
    return Inertia::render('landingpage/tentang/ad/index');
})->name('landingpage.tentang.ad');

Route::get('/tentang/anggaran-rumah-tangga', function () {
    return Inertia::render('landingpage/tentang/anggaranRumahTangga/index');
})->name('landingpage.tentang.anggaran-rumah-tangga');

Route::get('/tentang/hasil-rakernas', function () {
    return Inertia::render('landingpage/tentang/hasilRakernas/index');
})->name('landingpage.tentang.hasil-rakernas');

Route::get('/tentang/hasil-munas', function () {
    return Inertia::render('landingpage/tentang/hasilMunas/index');
})->name('landingpage.tentang.hasil-munas');


// Page Kegiatan
Route::get('/kegiatan', function () {
    return Inertia::render('landingpage/kegiatan/index');
})->name('landingpage.kegiatan');


// Page Berita
Route::get('/berita', function () {
    return Inertia::render('landingpage/berita/index');
})->name('landingpage.berita');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard'); 

    Route::resource('posts', PostController::class);

    Route::resource('events', EventController::class);

    Route::resource('comments', CommentController::class);
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
