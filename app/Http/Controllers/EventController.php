<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->paginate(10);

        return Inertia::render('admin/events/index', [
            'events' => $events
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        Event::create($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    public function edit(Event $event)
    {
        return Inertia::render('admin/events/edit', [
            'event' => $event
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $event->update($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);

        // Ambil data pendaftar event
        $registrants = DB::table('pendaftaran_events')
            ->join('users', 'pendaftaran_events.id_user', '=', 'users.id_user')
            ->where('pendaftaran_events.id_event', $id)
            ->select(
                'pendaftaran_events.id',
                'users.name as nama',
                'users.nama_lsp',
                'users.nama_ptma',
                'users.email',
                'users.no_hp'
            )
            ->get();

        return Inertia::render('admin/events/show', [
            'event' => $event,
            'registrants' => $registrants,
        ]);
    }
}
