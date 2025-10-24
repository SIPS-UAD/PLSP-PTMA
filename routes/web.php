<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/landing', function () {
    return Inertia::render('landingpage/beranda/index');
})->name('landingpage');

Route::get('/tentang', function () {
    return Inertia::render('landingpage/tentang/index');
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
