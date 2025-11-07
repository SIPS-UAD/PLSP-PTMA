<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MateriController extends Controller
{
    public function internalisasi()
    {
        return Inertia::render('landingpage/materi/internalisasi/index');
    }

    public function pelatihanAsesor()
    {
        return Inertia::render('landingpage/materi/pelatihanAsesor/index');
    }

    public function penyusunanDokumen()
    {
        return Inertia::render('landingpage/materi/penyusunanDokumen/index');
    }
}