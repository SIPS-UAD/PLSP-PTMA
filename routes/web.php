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

    Route::get('/ad', function () {
        return Inertia::render('landingpage/tentang/ad/index', [
            'posts' => \App\Models\Post::where('kategori', 'ad')->latest()->get(),
        ]);
    })->name('ad');

    Route::get('/anggaran-rumah-tangga', function () {
        return Inertia::render('landingpage/tentang/anggaran-rumah-tangga/index', [
            'posts' => \App\Models\Post::where('kategori', 'anggaran-rumah-tangga')->latest()->get(),
        ]);
    })->name('anggaran-rumah-tangga');

    Route::get('/hasil-rakernas', function () {
        return Inertia::render('landingpage/tentang/hasil-rakernas/index', [
            'posts' => \App\Models\Post::where('kategori', 'hasil-rakernas')->latest()->get(),
        ]);
    })->name('hasil-rakernas');

    Route::get('/hasil-munas', function () {
        return Inertia::render('landingpage/tentang/hasil-munas/index', [
            'posts' => \App\Models\Post::where('kategori', 'hasil-munas')->latest()->get(),
        ]);
    })->name('hasil-munas');
});

Route::prefix('anggota')->name('landingpage.anggota.')->group(function () {
    Route::get('/form-isian', function () {
        return Inertia::render('landingpage/anggota/form-isian/index', [
            'posts' => \App\Models\Post::where('kategori', 'form-isian')->latest()->get(),
        ]);
    })->name('form-isian');

    Route::get('/proses-lisensi-BNSP', function () {
        return Inertia::render('landingpage/anggota/proses-lisensi-BNSP/index', [
            'posts' => \App\Models\Post::where('kategori', 'proses-lisensi-BNSP')->latest()->get(),
        ]);
    })->name('proses-lisensi-BNSP');

    Route::get('/sk-pimpinan-ptma', function () {
        return Inertia::render('landingpage/anggota/sk-pimpinan-ptma/index', [
            'posts' => \App\Models\Post::where('kategori', 'sk-pimpinan-ptma')->latest()->get(),
        ]);
    })->name('sk-pimpinan-ptma');

    Route::get('/tamu-kegiatan', function () {
        return Inertia::render('landingpage/anggota/tamu-kegiatan/index', [
            'posts' => \App\Models\Post::where('kategori', 'tamu-kegiatan')->latest()->get(),
        ]);
    })->name('tamu-kegiatan');

    Route::get('/terlisensi-BNSP', function () {
        return Inertia::render('landingpage/anggota/terlisensi-BNSP/index', [
            'posts' => \App\Models\Post::where('kategori', 'terlisensi-BNSP')->latest()->get(),
        ]);
    })->name('terlisensi-BNSP');
});

Route::prefix('sumber-daya')->name('landingpage.sumber-daya.')->group(function () {
    Route::get('/asesor', function () {
        return Inertia::render('landingpage/sumber-daya/asesor/index', [
            'posts' => \App\Models\Post::where('kategori', 'asesor')->latest()->get(),
        ]);
    })->name('asesor');

    Route::get('/cma', function () {
        return Inertia::render('landingpage/sumber-daya/cma/index', [
            'posts' => \App\Models\Post::where('kategori', 'cma')->latest()->get(),
        ]);
    })->name('cma');

    Route::get('/skema-sertifikasi', function () {
        return Inertia::render('landingpage/sumber-daya/skema-sertifikasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'skema-sertifikasi')->latest()->get(),
        ]);
    })->name('skema-sertifikasi');

    Route::get('/tuk', function () {
        return Inertia::render('landingpage/sumber-daya/tuk/index', [
            'posts' => \App\Models\Post::where('kategori', 'tuk')->latest()->get(),
        ]);
    })->name('tuk');
});

Route::prefix('materi')->name('landingpage.materi.')->group(function () {
    Route::get('/internalisasi', function () {
        return Inertia::render('landingpage/materi/internalisasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'internalisasi')->latest()->get(),
        ]);
    })->name('internalisasi');

    Route::get('/pelatihan-asesor', function () {
        return Inertia::render('landingpage/materi/pelatihan-asesor/index', [
            'posts' => \App\Models\Post::where('kategori', 'pelatihan-asesor')->latest()->get(),
        ]);
    })->name('pelatihan-asesor');

    Route::get('/penyusunan-dokumen', function () {
        return Inertia::render('landingpage/materi/penyusunan-dokumen/index', [
            'posts' => \App\Models\Post::where('kategori', 'penyusunan-dokumen')->latest()->get(),
        ]);
    })->name('penyusunan-dokumen');
});

Route::prefix('pendirian-lisensi')->name('landingpage.pendirian-lisensi.')->group(function () {
    Route::get('/apresiasi', function () {
        return Inertia::render('landingpage/pendirian-lisensi/apresiasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'apresiasi')->latest()->get(),
        ]);
    })->name('apresiasi');

    Route::get('/pendirian-lsp', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pendirian-lsp/index', [
            'posts' => \App\Models\Post::where('kategori', 'pendirian-lsp')->latest()->get(),
        ]);
    })->name('pendirian-lsp');

    Route::get('/pengajuan-fa', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-fa/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan-fa')->latest()->get(),
        ]);
    })->name('pengajuan-fa');

    Route::get('/pengajuan-skema-sertifikasi', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-skema-sertifikasi/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan-skema-sertifikasi')->latest()->get(),
        ]);
    })->name('pengajuan-skema-sertifikasi');

    Route::get('/pengajuan-witness', function () {
        return Inertia::render('landingpage/pendirian-lisensi/pengajuan-witness/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan-witness')->latest()->get(),
        ]);
    })->name('pengajuan-witness');

    Route::get('/prl', function () {
        return Inertia::render('landingpage/pendirian-lisensi/prl/index', [
            'posts' => \App\Models\Post::where('kategori', 'prl')->latest()->get(),
        ]);
    })->name('prl');
});

Route::prefix('regulasi')->name('landingpage.regulasi.')->group(function () {
    Route::get('/iku-pt', function () {
        return Inertia::render('landingpage/regulasi/iku-pt/index', [
            'posts' => \App\Models\Post::where('kategori', 'iku-pt')->latest()->get(),
        ]);
    })->name('iku-pt');

    Route::get('/peraturan-baru', function () {
        return Inertia::render('landingpage/regulasi/peraturan-baru/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan-baru')->latest()->get(),
        ]);
    })->name('peraturan-baru');

    Route::get('/peraturan-bnsp', function () {
        return Inertia::render('landingpage/regulasi/peraturan-bnsp/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan-bnsp')->latest()->get(),
        ]);
    })->name('peraturan-bnsp');

    Route::get('/peraturan-dasar', function () {
        return Inertia::render('landingpage/regulasi/peraturan-dasar/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan-dasar')->latest()->get(),
        ]);
    })->name('peraturan-dasar');

    Route::get('/proses-lisensi', function () {
        return Inertia::render('landingpage/regulasi/proses-lisensi/index', [
            'posts' => \App\Models\Post::where('kategori', 'proses-lisensi')->latest()->get(),
        ]);
    })->name('proses-lisensi');
});

Route::get('/kegiatan', function () {
    return Inertia::render('landingpage/kegiatan/index');
})->name('landingpage.kegiatan');

Route::get('/berita', function () {
    return Inertia::render('landingpage/berita/index', [
        'posts' => \App\Models\Post::where('kategori', 'berita')->latest()->get(),
    ]);
})->name('landingpage.berita');

Route::get('/detail', function () {
    return Inertia::render('landingpage/berita/detail/index');
})->name('landingpage.berita.detail');


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
