<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserDashboardController;

Route::get('/home', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/', function () {
    return Inertia::render('landingpage/beranda/index', [
        'posts' => \App\Models\Post::latest()->take(8)->get(),
        'events' => \App\Models\Event::latest()->take(8)->get(),
    ]);
})->name('landingpage');

Route::middleware(['auth', 'verified', 'role:member'])->group(function () {
    Route::get('/user-dashboard', [UserDashboardController::class, 'index'])->name('user-dashboard');
});

Route::get('/berita', function () {
    return Inertia::render('landingpage/berita/index', [
        'posts' => \App\Models\Post::where('kategori', 'berita')->latest()->get(),
    ]);
})->name('landingpage.berita');

Route::get('/berita/{slug}', function (string $slug) {
    $post = \App\Models\Post::where('slug', $slug)
        ->where('kategori', 'berita')
        ->firstOrFail();

    return Inertia::render('landingpage/berita/detail/index', [
        'post' => $post,
    ]);
})->name('landingpage.berita.detail');

Route::get('/tentang', function () {
    return Inertia::render('landingpage/tentang/index', [
        'posts' => \App\Models\Post::where('kategori', 'tentang')->latest()->get(),
    ]);
})->name('landingpage.tentang');

Route::prefix('tentang')->name('landingpage.tentang.')->group(function () {
    Route::get('/profil', function () {
        return Inertia::render('landingpage/tentang/profil/index', [
            'posts' => \App\Models\Post::where('kategori', 'profil')->latest()->get(),
        ]);
    })->name('profil');

    Route::get('/profil/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'profil')
            ->firstOrFail();

        return Inertia::render('landingpage/tentang/profil/detail/index', [
            'post' => $post,
        ]);
    })->name('profil.detail');

    Route::get('/ad', function () {
        return Inertia::render('landingpage/tentang/ad/index', [
            'posts' => \App\Models\Post::where('kategori', 'ad')->latest()->get(),
        ]);
    })->name('ad');

    Route::get('/ad/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'ad')
            ->firstOrFail();

        return Inertia::render('landingpage/tentang/ad/detail/index', [
            'post' => $post,
        ]);
    })->name('ad.detail');

    Route::get('/anggaran-rumah-tangga', function () {
        return Inertia::render('landingpage/tentang/anggaran-rumah-tangga/index', [
            'posts' => \App\Models\Post::where('kategori', 'anggaran-rumah-tangga')->latest()->get(),
        ]);
    })->name('anggaran-rumah-tangga');

    Route::get('/anggaran-rumah-tangga/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'anggaran-rumah-tangga')
            ->firstOrFail();

        return Inertia::render('landingpage/tentang/anggaran-rumah-tangga/detail/index', [
            'post' => $post,
        ]);
    })->name('anggaran-rumah-tangga.detail');

    Route::get('/hasil-rakernas', function () {
        return Inertia::render('landingpage/tentang/hasil-rakernas/index', [
            'posts' => \App\Models\Post::where('kategori', 'hasil-rakernas')->latest()->get(),
        ]);
    })->name('hasil-rakernas');

    Route::get('/hasil-rakernas/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'hasil-rakernas')
            ->firstOrFail();

        return Inertia::render('landingpage/tentang/hasil-rakernas/detail/index', [
            'post' => $post,
        ]);
    })->name('hasil-rakernas.detail');

    Route::get('/hasil-munas', function () {
        return Inertia::render('landingpage/tentang/hasil-munas/index', [
            'posts' => \App\Models\Post::where('kategori', 'hasil-munas')->latest()->get(),
        ]);
    })->name('hasil-munas');

    Route::get('/hasil-munas/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'hasil-munas')
            ->firstOrFail();

        return Inertia::render('landingpage/tentang/hasil-munas/detail/index', [
            'post' => $post,
        ]);
    })->name('hasil-munas.detail');
});

Route::prefix('anggota')->name('landingpage.anggota.')->group(function () {
    Route::get('/form-isian', function () {
        return Inertia::render('landingpage/anggota/form-isian/index', [
            'posts' => \App\Models\Post::where('kategori', 'form-isian')->latest()->get(),
        ]);
    })->name('form-isian');

    Route::get('/form-isian/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'form-isian')
            ->firstOrFail();

        return Inertia::render('landingpage/anggota/form-isian/detail/index', [
            'post' => $post,
        ]);
    })->name('form-isian.detail');

    Route::get('/proses-lisensi-BNSP', function () {
        return Inertia::render('landingpage/anggota/proses-lisensi-BNSP/index', [
            'posts' => \App\Models\Post::where('kategori', 'proses-lisensi-BNSP')->latest()->get(),
        ]);
    })->name('proses-lisensi-BNSP');

    Route::get('/proses-lisensi-BNSP/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'proses-lisensi-BNSP')
            ->firstOrFail();

        return Inertia::render('landingpage/anggota/proses-lisensi-BNSP/detail/index', [
            'post' => $post,
        ]);
    })->name('proses-lisensi-BNSP.detail');

    Route::get('/sk-pimpinan-ptma', function () {
        return Inertia::render('landingpage/anggota/sk-pimpinan-ptma/index', [
            'posts' => \App\Models\Post::where('kategori', 'sk-pimpinan-ptma')->latest()->get(),
        ]);
    })->name('sk-pimpinan-ptma');

    Route::get('/sk-pimpinan-ptma/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'sk-pimpinan-ptma')
            ->firstOrFail();

        return Inertia::render('landingpage/anggota/sk-pimpinan-ptma/detail/index', [
            'post' => $post,
        ]);
    })->name('sk-pimpinan-ptma.detail');

    Route::get('/tamu-kegiatan', function () {
        return Inertia::render('landingpage/anggota/tamu-kegiatan/index', [
            'posts' => \App\Models\Post::where('kategori', 'tamu-kegiatan')->latest()->get(),
        ]);
    })->name('tamu-kegiatan');

    Route::get('/tamu-kegiatan/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'tamu-kegiatan')
            ->firstOrFail();

        return Inertia::render('landingpage/anggota/tamu-kegiatan/detail/index', [
            'post' => $post,
        ]);
    })->name('tamu-kegiatan.detail');

    Route::get('/terlisensi-BNSP', function () {
        return Inertia::render('landingpage/anggota/terlisensi-BNSP/index', [
            'posts' => \App\Models\Post::where('kategori', 'terlisensi-BNSP')->latest()->get(),
        ]);
    })->name('terlisensi-BNSP');

    Route::get('/terlisensi-BNSP/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'terlisensi-BNSP')
            ->firstOrFail();

        return Inertia::render('landingpage/anggota/terlisensi-BNSP/detail/index', [
            'post' => $post,
        ]);
    })->name('terlisensi-BNSP.detail');
});

Route::prefix('sumber-daya')->name('landingpage.sumber-daya.')->group(function () {
    Route::get('/asesor', function () {
        return Inertia::render('landingpage/sumber-daya/asesor/index', [
            'posts' => \App\Models\Post::where('kategori', 'asesor')->latest()->get(),
        ]);
    })->name('asesor');

    Route::get('/asesor/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'asesor')
            ->firstOrFail();

        return Inertia::render('landingpage/sumber-daya/asesor/detail/index', [
            'post' => $post,
        ]);
    })->name('asesor.detail');

    Route::get('/cma', function () {
        return Inertia::render('landingpage/sumber-daya/cma/index', [
            'posts' => \App\Models\Post::where('kategori', 'cma')->latest()->get(),
        ]);
    })->name('cma');

    Route::get('/cma/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'cma')
            ->firstOrFail();

        return Inertia::render('landingpage/sumber-daya/cma/detail/index', [
            'post' => $post,
        ]);
    })->name('cma.detail');

    Route::get('/skema-sertifikasi', function () {
        return Inertia::render('landingpage/sumber-daya/skema-sertifikasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'skema-sertifikasi')->latest()->get(),
        ]);
    })->name('skema-sertifikasi');

    Route::get('/skema-sertifikasi/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'skema-sertifikasi')
            ->firstOrFail();

        return Inertia::render('landingpage/sumber-daya/skema-sertifikasi/detail/index', [
            'post' => $post,
        ]);
    })->name('skema-sertifikasi.detail');

    Route::get('/tuk', function () {
        return Inertia::render('landingpage/sumber-daya/tuk/index', [
            'posts' => \App\Models\Post::where('kategori', 'tuk')->latest()->get(),
        ]);
    })->name('tuk');

    Route::get('/tuk/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'tuk')
            ->firstOrFail();

        return Inertia::render('landingpage/sumber-daya/tuk/detail/index', [
            'post' => $post,
        ]);
    })->name('tuk.detail');
});

Route::prefix('materi')->name('landingpage.materi.')->group(function () {
    Route::get('/internalisasi', function () {
        return Inertia::render('landingpage/materi/internalisasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'internalisasi')->latest()->get(),
        ]);
    })->name('internalisasi');

    Route::get('/internalisasi/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'internalisasi')
            ->firstOrFail();

        return Inertia::render('landingpage/materi/internalisasi/detail/index', [
            'post' => $post,
        ]);
    })->name('internalisasi.detail');

    Route::get('/pelatihan-asesor', function () {
        return Inertia::render('landingpage/materi/pelatihan-asesor/index', [
            'posts' => \App\Models\Post::where('kategori', 'pelatihan-asesor')->latest()->get(),
        ]);
    })->name('pelatihan-asesor');

    Route::get('/pelatihan-asesor/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'pelatihan-asesor')
            ->firstOrFail();

        return Inertia::render('landingpage/materi/pelatihan-asesor/detail/index', [
            'post' => $post,
        ]);
    })->name('pelatihan-asesor.detail');

    Route::get('/penyusunan-dokumen', function () {
        return Inertia::render('landingpage/materi/penyusunan-dokumen/index', [
            'posts' => \App\Models\Post::where('kategori', 'penyusunan-dokumen')->latest()->get(),
        ]);
    })->name('penyusunan-dokumen');

    Route::get('/penyusunan-dokumen/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'penyusunan-dokumen')
            ->firstOrFail();

        return Inertia::render('landingpage/materi/penyusunan-dokumen/detail/index', [
            'post' => $post,
        ]);
    })->name('penyusunan-dokumen.detail');
});

Route::prefix('pendirian-lisensi')->name('landingpage.pendirian-lisensi.')->group(function () {
    Route::get('/apresiasi', function () {
        return Inertia::render('landingpage/pendirian-lisensi/apresiasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'apresiasi')->latest()->get(),
        ]);
    })->name('apresiasi');

    Route::get('/apresiasi/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'apresiasi')
            ->firstOrFail();

        return Inertia::render('landingpage/pendirian-lisensi/apresiasi/detail/index', [
            'post' => $post,
        ]);
    })->name('apresiasi.detail');

    Route::get('/pendirian-lsp', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pendirian-lsp/index', [
            'posts' => \App\Models\Post::where('kategori', 'pendirian-lsp')->latest()->get(),
        ]);
    })->name('pendirian-lsp');

    Route::get('/pendirian-lsp/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'pendirian-lsp')
            ->firstOrFail();

        return Inertia::render('landingpage/pendirian-lisensi/pendirian-lsp/detail/index', [
            'post' => $post,
        ]);
    })->name('pendirian-lsp.detail');

    Route::get('/pengajuan-fa', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-fa/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan-fa')->latest()->get(),
        ]);
    })->name('pengajuan-fa');

    Route::get('/pengajuan-fa/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'pengajuan-fa')
            ->firstOrFail();

        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-fa/detail/index', [
            'post' => $post,
        ]);
    })->name('pengajuan-fa.detail');

    Route::get('/pengajuan-skema-sertifikasi', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-skema-sertifikasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan-skema-sertifikasi')->latest()->get(),
        ]);
    })->name('pengajuan-skema-sertifikasi');

    Route::get('/pengajuan-skema-sertifikasi/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'pengajuan-skema-sertifikasi')
            ->firstOrFail();

        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-skema-sertifikasi/detail/index', [
            'post' => $post,
        ]);
    })->name('pengajuan-skema-sertifikasi.detail');

    Route::get('/pengajuan-witness', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-witness/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan-witness')->latest()->get(),
        ]);
    })->name('pengajuan-witness');

    Route::get('/pengajuan-witness/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'pengajuan-witness')
            ->firstOrFail();

        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-witness/detail/index', [
            'post' => $post,
        ]);
    })->name('pengajuan-witness.detail');

    Route::get('/prl', function () {
        return Inertia::render('landingpage/pendirian-lisensi/prl/index', [
            'posts' => \App\Models\Post::where('kategori', 'prl')->latest()->get(),
        ]);
    })->name('prl');

    Route::get('/prl/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'prl')
            ->firstOrFail();

        return Inertia::render('landingpage/pendirian-lisensi/prl/detail/index', [
            'post' => $post,
        ]);
    })->name('prl.detail');
});

Route::prefix('regulasi')->name('landingpage.regulasi.')->group(function () {
    Route::get('/iku-pt', function () {
        return Inertia::render('landingpage/regulasi/iku-pt/index', [
            'posts' => \App\Models\Post::where('kategori', 'iku-pt')->latest()->get(),
        ]);
    })->name('iku-pt');

    Route::get('/iku-pt/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'iku-pt')
            ->firstOrFail();

        return Inertia::render('landingpage/regulasi/iku-pt/detail/index', [
            'post' => $post,
        ]);
    })->name('iku-pt.detail');

    Route::get('/peraturan-baru', function () {
        return Inertia::render('landingpage/regulasi/peraturan-baru/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan-baru')->latest()->get(),
        ]);
    })->name('peraturan-baru');

    Route::get('/peraturan-baru/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'peraturan-baru')
            ->firstOrFail();

        return Inertia::render('landingpage/regulasi/peraturan-baru/detail/index', [
            'post' => $post,
        ]);
    })->name('peraturan-baru.detail');

    Route::get('/peraturan-bnsp', function () {
        return Inertia::render('landingpage/regulasi/peraturan-bnsp/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan-bnsp')->latest()->get(),
        ]);
    })->name('peraturan-bnsp');

    Route::get('/peraturan-bnsp/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'peraturan-bnsp')
            ->firstOrFail();

        return Inertia::render('landingpage/regulasi/peraturan-bnsp/detail/index', [
            'post' => $post,
        ]);
    })->name('peraturan-bnsp.detail');

    Route::get('/peraturan-dasar', function () {
        return Inertia::render('landingpage/regulasi/peraturan-dasar/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan-dasar')->latest()->get(),
        ]);
    })->name('peraturan-dasar');

    Route::get('/peraturan-dasar/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'peraturan-dasar')
            ->firstOrFail();

        return Inertia::render('landingpage/regulasi/peraturan-dasar/detail/index', [
            'post' => $post,
        ]);
    })->name('peraturan-dasar.detail');

    Route::get('/proses-lisensi', function () {
        return Inertia::render('landingpage/regulasi/proses-lisensi/index', [
            'posts' => \App\Models\Post::where('kategori', 'proses-lisensi')->latest()->get(),
        ]);
    })->name('proses-lisensi');

    Route::get('/proses-lisensi/{slug}', function (string $slug) {
        $post = \App\Models\Post::where('slug', $slug)
            ->where('kategori', 'proses-lisensi')
            ->firstOrFail();

        return Inertia::render('landingpage/regulasi/proses-lisensi/detail/index', [
            'post' => $post,
        ]);
    })->name('proses-lisensi.detail');
});

Route::get('/kegiatan', function () {
    return Inertia::render('landingpage/kegiatan/index', [
        'events' => \App\Models\Event::latest()->get(),
    ]);
})->name('landingpage.kegiatan');

Route::get('/kegiatan/{slug}', function (string $slug) {
    $event = \App\Models\Event::where('slug', $slug)->firstOrFail();

    return Inertia::render('landingpage/kegiatan/detail/index', [
        'event' => $event,
    ]);
})->name('landingpage.kegiatan.detail');


Route::middleware(['auth', 'verified', 'role:admin,super_admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('posts', PostController::class);
    Route::resource('events', EventController::class);
    Route::resource('comments', CommentController::class);

    // User Management Routes
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::post('users/{id}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
})->name('dashboard');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
