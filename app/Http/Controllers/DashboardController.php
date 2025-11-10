<?php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Event;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'latestPosts' => Post::latest()->take(5)->get(['id_post', 'judul', 'tanggal']),
            'latestEvents' => Event::latest()->take(5)->get(['id_event', 'judul', 'tanggal'])
        ]);
    }
}