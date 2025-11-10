<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaController extends Controller
{
    public function formIsian()
    {
        return Inertia::render('landingpage/anggota/formIsian/index');
    }

    public function prosesLisensiBNSP()
    {
        return Inertia::render('landingpage/anggota/prosesLisensiBNSP/index');
    }

    public function skPimpinanPTMA()
    {
        return Inertia::render('landingpage/anggota/skPimpinanPTMA/index');
    }
    
    public function tamuKegiatan()
    {
        return Inertia::render('landingpage/anggota/tamuKegiatan/index');
    }

    public function terlisensiBNSP()
    {
        return Inertia::render('landingpage/anggota/terlisensiBNSP/index');
    }
}