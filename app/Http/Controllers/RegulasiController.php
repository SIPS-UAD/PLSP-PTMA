<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RegulasiController extends Controller
{
    public function ikuPerguruanTinggi()
    {
        return Inertia::render('landingpage/regulasi/IKUPerguruanTinggi/index');
    }

    public function peraturanBaru()
    {
        return Inertia::render('landingpage/regulasi/peraturanBaru/index');
    }

    public function peraturanBNSP()
    {
        return Inertia::render('landingpage/regulasi/peraturanBNSP/index');
    }

    public function peraturanDasar()
    {
        return Inertia::render('landingpage/regulasi/peraturanDasar/index');
    }

    public function prosesLisensi()
    {
        return Inertia::render('landingpage/regulasi/prosesLisensi/index');
    }
}