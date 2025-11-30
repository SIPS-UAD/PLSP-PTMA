<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
  public function index(Request $request): Response
  {
    $user = $request->user();

    $pendaftaranEvents = $user->pendaftaranEvents()
      ->with('event')
      ->latest('created_at')
      ->get();

    $attendances = $pendaftaranEvents->map(fn($pendaftaran) => [
      'id' => $pendaftaran->id_pendaftaran,
      'status' => $pendaftaran->status,
      'event' => [
        'id_event' => $pendaftaran->event->id_event,
        'title' => $pendaftaran->event->title,
        'date' => $pendaftaran->event->date,
      ],
    ]);

    $lastUpdate = $pendaftaranEvents->first()?->updated_at?->format('d-m-Y') ?? now()->format('d-m-Y');

    return Inertia::render('user/index', [
      'attendances' => $attendances,
      'lastUpdate' => $lastUpdate,
    ]);
  }
}
