<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TentangController extends Controller
{
    public function index()
    {
        return Inertia::render('landingpage/tentang/index');
    }

    public function profil()
    {
        return Inertia::render('landingpage/tentang/profil/index');
    }

    public function ad()
    {
        return Inertia::render('landingpage/tentang/anggaranDasar/index');
    }

    public function anggaranRumahTangga()
    {
        return Inertia::render('landingpage/tentang/anggaranRumahTangga/index');
    }

    public function hasilRakernas()
    {
        return Inertia::render('landingpage/tentang/hasilRakernas/index');
    }

    public function hasilMunas()
    {
        return Inertia::render('landingpage/tentang/hasilMunas/index');
    }
}