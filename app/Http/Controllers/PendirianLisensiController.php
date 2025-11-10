<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PendirianLisensiController extends Controller
{
    public function apresiasi()
    {
        return Inertia::render('landingpage/pendirianLisensi/apresiasi/index');
    }

    public function pendirianLSP()
    {
        return Inertia::render('landingpage/pendirianLisensi/pendirianLSP/index');
    }

    public function pengajuanFA()
    {
        return Inertia::render('landingpage/pendirianLisensi/pengajuanFA/index');
    }

    public function pengajuanSkemaSertifikasi()
    {
        return Inertia::render('landingpage/pendirianLisensi/pengajuanSkemaSertifikasi/index');
    }

    public function pengajuanWitness()
    {
        return Inertia::render('landingpage/pendirianLisensi/pengajuanWitness/index');
    }

    public function prl()
    {
        return Inertia::render('landingpage/pendirianLisensi/PRL/index');
    }
}