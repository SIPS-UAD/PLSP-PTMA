<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\SumberDayaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\PendirianLisensiController;
use App\Http\Controllers\RegulasiController;
use App\Http\Controllers\TentangController;

Route::get('/home', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/', function () {
    return Inertia::render('landingpage/beranda/index');
})->name('landingpage');

Route::get('/tentang', [TentangController::class, 'index'])
    ->name('landingpage.tentang');

Route::prefix('tentang')->name('landingpage.tentang.')->group(function () {
    Route::get('/profil', [TentangController::class, 'profil'])
        ->name('profil');
    
    Route::get('/ad', [TentangController::class, 'ad'])
        ->name('ad');
    
    Route::get('/anggaran-rumah-tangga', [TentangController::class, 'anggaranRumahTangga'])
        ->name('anggaran-rumah-tangga');
    
    Route::get('/hasil-rakernas', [TentangController::class, 'hasilRakernas'])
        ->name('hasil-rakernas');
    
    Route::get('/hasil-munas', [TentangController::class, 'hasilMunas'])
        ->name('hasil-munas');
});



// Page Anggota
Route::prefix('anggota')->name('landingpage.anggota.')->group(function () {
    Route::get('/form-isian', [AnggotaController::class, 'formIsian'])->name('form-isian');
    Route::get('/proses-lisensi-BNSP', [AnggotaController::class, 'prosesLisensiBNSP'])->name('proses-lisensi-BNSP');
    Route::get('/sk-pimpinan-ptma', [AnggotaController::class, 'skPimpinanPTMA'])->name('sk-pimpinan-ptma');
    Route::get('/tamu-kegiatan', [AnggotaController::class, 'tamuKegiatan'])->name('tamu-kegiatan');
    Route::get('/terlisensi-BNSP', [AnggotaController::class, 'terlisensiBNSP'])->name('terlisensi-BNSP');
});


// Page Sumber Daya
Route::prefix('sumber-daya')->name('landingpage.sumber-daya.')->group(function () {
    Route::get('/asesor', [SumberDayaController::class, 'asesor'])->name('asesor');
    Route::get('/cma', [SumberDayaController::class, 'cma'])->name('cma');
    Route::get('/skema-sertifikasi', [SumberDayaController::class, 'skemaSertifikasi'])->name('skema-sertifikasi');
    Route::get('/tuk', [SumberDayaController::class, 'tuk'])->name('tuk');
});


// Page Materi
Route::prefix('materi')->name('landingpage.materi.')->group(function () {
    Route::get('/internalisasi', [MateriController::class, 'internalisasi'])->name('internalisasi');
    Route::get('/pelatihan-asesor', [MateriController::class, 'pelatihanAsesor'])->name('pelatihan-asesor');
    Route::get('/penyusunan-dokumen', [MateriController::class, 'penyusunanDokumen'])->name('penyusunan-dokumen');
});


// Page Pendirian Lisensi
Route::prefix('pendirian-lisensi')->name('landingpage.pendirian-lisensi.')->group(function () {
    Route::get('/apresiasi', [PendirianLisensiController::class, 'apresiasi'])
        ->name('apresiasi');
    
    Route::get('/pendirian-lsp', [PendirianLisensiController::class, 'pendirianLSP'])
        ->name('pendirian-lsp');
    
    Route::get('/pengajuan-fa', [PendirianLisensiController::class, 'pengajuanFA'])
        ->name('pengajuan-fa');
    
    Route::get('/pengajuan-skema-sertifikasi', [PendirianLisensiController::class, 'pengajuanSkemaSertifikasi'])
        ->name('pengajuan-skema-sertifikasi');
    
    Route::get('/pengajuan-witness', [PendirianLisensiController::class, 'pengajuanWitness'])
        ->name('pengajuan-witness');
    
    Route::get('/prl', [PendirianLisensiController::class, 'prl'])
        ->name('prl');
});


// Page Regulasi
Route::prefix('regulasi')->name('landingpage.regulasi.')->group(function () {
    Route::get('/iku-pt', [RegulasiController::class, 'ikuPerguruanTinggi'])
        ->name('iku-pt');
    
    Route::get('/peraturan-baru', [RegulasiController::class, 'peraturanBaru'])
        ->name('peraturan-baru');
    
    Route::get('/peraturan-bnsp', [RegulasiController::class, 'peraturanBNSP'])
        ->name('peraturan-bnsp');
    
    Route::get('/peraturan-dasar', [RegulasiController::class, 'peraturanDasar'])
        ->name('peraturan-dasar');
    
    Route::get('/proses-lisensi', [RegulasiController::class, 'prosesLisensi'])
        ->name('proses-lisensi');
});


// Page Kegiatan
Route::get('/kegiatan', function () {
    return Inertia::render('landingpage/kegiatan/index');
})->name('landingpage.kegiatan');


// Page Berita
Route::get('/berita', function () {
    return Inertia::render('landingpage/berita/index');
})->name('landingpage.berita');

Route::get('/detail', function () {
    return Inertia::render('landingpage/berita/detail/index');
})->name('landingpage.berita.detail');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('posts', PostController::class);

    Route::resource('events', EventController::class);

    Route::resource('comments', CommentController::class);
})->name('dashboard');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
