<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('register/pending', function () {
        return Inertia::render('auth/register-pending');
    })->name('register.pending');

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

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
    Route::get('/user/edit', [UserDashboardController::class, 'edit'])->name('user.edit');
    Route::put('/user/profile', [UserDashboardController::class, 'update'])->name('user.profile.update');
});

Route::get('/user/profile', function () {
    return redirect()->route('user-dashboard');
})->middleware(['auth', 'verified'])->name('user.profile');

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

Route::prefix('tentang')->name('landingpage.tentang.')->group(function () {
    Route::get('/profil', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'profil')->latest()->get(),
            'sectionTitle' => 'Profil',
        ]);
    })->name('profil');


    Route::get('/ad', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'anggaran dasar')->latest()->get(),
            'sectionTitle' => 'AD',
        ]);
    })->name('ad');

    Route::get('/anggaran-rumah-tangga', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'anggaran rumah tangga')->latest()->get(),
            'sectionTitle' => 'Anggaran Rumah Tangga',
        ]);
    })->name('anggaran-rumah-tangga');

    Route::get('/hasil-rakernas', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'hasil rakernas')->latest()->get(),
            'sectionTitle' => 'Hasil Rakernas',
        ]);
    })->name('hasil-rakernas');


    Route::get('/hasil-munas', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'hasil munas')->latest()->get(),
            'sectionTitle' => 'Hasil Munas',
        ]);
    })->name('hasil-munas');
});

Route::prefix('anggota')->name('landingpage.anggota.')->group(function () {
    Route::get('/form-isian', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'form isian')->latest()->get(),
            'sectionTitle' => 'Form Isian',
        ]);
    })->name('form-isian');


    Route::get('/proses-lisensi-BNSP', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'proses lisensi BNSP')->latest()->get(),
            'sectionTitle' => 'Proses Lisensi BNSP',
        ]);
    })->name('proses-lisensi-BNSP');

    Route::get('/sk-pimpinan-ptma', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'sk pimpinan ptma')->latest()->get(),
            'sectionTitle' => 'SK Pimpinan PTMA',
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
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'tamu kegiatan')->latest()->get(),
            'sectionTitle' => 'Tamu Kegiatan',
        ]);
    })->name('tamu-kegiatan');

    Route::get('/terlisensi-BNSP', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'terlisensi BNSP')->latest()->get(),
            'sectionTitle' => 'Terlisensi BNSP',
        ]);
    })->name('terlisensi-BNSP');
});

Route::prefix('sumber-daya')->name('landingpage.sumber-daya.')->group(function () {
    Route::get('/asesor', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'asesor')->latest()->get(),
            'sectionTitle' => 'Asesor',
        ]);
    })->name('asesor');

    Route::get('/cma', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'cma')->latest()->get(),
            'sectionTitle' => 'CMA',
        ]);
    })->name('cma');

    Route::get('/skema-sertifikasi', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'skema sertifikasi')->latest()->get(),
            'sectionTitle' => 'Skema Sertifikasi',
        ]);
    })->name('skema-sertifikasi');

    Route::get('/tuk', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'tuk')->latest()->get(),
            'sectionTitle' => 'TUK',
        ]);
    })->name('tuk');
});

Route::prefix('materi')->name('landingpage.materi.')->group(function () {
    Route::get('/internalisasi', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'internalisasi')->latest()->get(),
            'sectionTitle' => 'Internalisasi',
        ]);
    })->name('internalisasi');

    Route::get('/pelatihan-asesor', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'pelatihan assesor')->latest()->get(),
            'sectionTitle' => 'Pelatihan Asesor',
        ]);
    })->name('pelatihan-asesor');

    Route::get('/penyusunan-dokumen', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'penyusunan dokumen')->latest()->get(),
            'sectionTitle' => 'Penyusunan Dokumen',
        ]);
    })->name('penyusunan-dokumen');
});

Route::prefix('pendirian-lisensi')->name('landingpage.pendirian-lisensi.')->group(function () {
    Route::get('/dokumen-internalisasi', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'dokumen internalisasi')->latest()->get(),
            'sectionTitle' => 'Dokumen Internalisasi',
        ]);
    })->name('dokumen-internalisasi');

    Route::get('/pengajuan-pelatihan-dan-aca', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan pelatihan dan aca')->latest()->get(),
            'sectionTitle' => 'Pengajuan Pelatihan dan ACA',
        ]);
    })->name('pengajuan-pelatihan-dan-aca');

    Route::get('/apresiasi', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'apresiasi')->latest()->get(),
            'sectionTitle' => 'Apresiasi',
        ]);
    })->name('apresiasi');

    Route::get('/pendirian-lsp', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'pendirian lsp')->latest()->get(),
            'sectionTitle' => 'Pendirian LSP',
        ]);
    })->name('pendirian-lsp');

    Route::get('/pengajuan-fa', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan fa')->latest()->get(),
            'sectionTitle' => 'Pengajuan FA',
        ]);
    })->name('pengajuan-fa');

    Route::get('/pengajuan-skema-sertifikasi', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan skema sertifikasi')->latest()->get(),
            'sectionTitle' => 'Pengajuan Skema Sertifikasi',
        ]);
    })->name('pengajuan-skema-sertifikasi');

    Route::get('/pengajuan-witness', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'pengajuan witness')->latest()->get(),
            'sectionTitle' => 'Pengajuan Witness',
        ]);
    })->name('pengajuan-witness');

    Route::get('/prl', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'prl')->latest()->get(),
            'sectionTitle' => 'PRL',
        ]);
    })->name('prl');
});

Route::prefix('regulasi')->name('landingpage.regulasi.')->group(function () {
    Route::get('/iku-pt', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'iku pt')->latest()->get(),
            'sectionTitle' => 'IKU PT',
        ]);
    })->name('iku-pt');

    Route::get('/peraturan-baru', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan baru')->latest()->get(),
            'sectionTitle' => 'Peraturan Baru',
        ]);
    })->name('peraturan-baru');

    Route::get('/peraturan-bnsp', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan bnsp')->latest()->get(),
            'sectionTitle' => 'Peraturan BNSP',
        ]);
    })->name('peraturan-bnsp');

    Route::get('/peraturan-dasar', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'peraturan dasar')->latest()->get(),
            'sectionTitle' => 'Peraturan Dasar',
        ]);
    })->name('peraturan-dasar');

    Route::get('/proses-lisensi', function () {
        return Inertia::render('landingpage/page-detail/index', [
            'posts' => \App\Models\Post::where('kategori', 'proses lisensi')->latest()->get(),
            'sectionTitle' => 'Proses Lisensi',
        ]);
    })->name('proses-lisensi');
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

    // Member Management Routes
    Route::get('members', [MemberController::class, 'index'])->name('members.index');
    Route::get('members/{member}', [MemberController::class, 'show'])->name('members.show');
    Route::patch('members/{member}/aktifkan', [MemberController::class, 'aktifkan'])->name('members.aktifkan');
    Route::patch('members/{member}/nonaktifkan', [MemberController::class, 'nonaktifkan'])->name('members.nonaktifkan');
    Route::delete('members/{member}', [MemberController::class, 'destroy'])->name('members.destroy');
})->name('dashboard');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
