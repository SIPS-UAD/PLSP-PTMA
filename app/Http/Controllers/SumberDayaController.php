<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SumberDayaController extends Controller
{
    public function asesor()
    {
        return Inertia::render('landingpage/sumberDaya/asesor/index');
    }

    public function cma()
    {
        return Inertia::render('landingpage/sumberDaya/CMA/index');
    }

    public function skemaSertifikasi()
    {
        return Inertia::render('landingpage/sumberDaya/skemaSertifikasi/index');
    }

    public function tuk()
    {
        return Inertia::render('landingpage/sumberDaya/TUK/index');
    }
}