<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails/events', 'public');
        }

        $validated['thumbnail'] = $thumbnailPath;

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
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $thumbnailPath = $event->thumbnail;

        if ($request->hasFile('thumbnail')) {
            if ($event->thumbnail) {
                Storage::disk('public')->delete($event->thumbnail);
            }

            $thumbnailPath = $request->file('thumbnail')->store('thumbnails/events', 'public');
        }
        $validated['thumbnail'] = $thumbnailPath;

        $event->update($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        if ($event->thumbnail) {
            Storage::disk('public')->delete($event->thumbnail);
        }
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
