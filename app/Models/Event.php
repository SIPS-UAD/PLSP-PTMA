<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_event';

    protected $fillable = [
        'judul',
        'slug',
        'deskripsi',
        'thumbnail',
        'tanggal',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->judul);

                $originalSlug = $event->slug;
                $count = 1;
                while (static::where('slug', $event->slug)->exists()) {
                    $event->slug = "{$originalSlug}-{$count}";
                    $count++;
                }
            }
        });

        static::updating(function ($event) {
            if ($event->isDirty('judul') && !$event->isDirty('slug')) {
                $event->slug = Str::slug($event->judul);

                $originalSlug = $event->slug;
                $count = 1;
                while (static::where('slug', $event->slug)
                    ->where('id_event', '!=', $event->id_event)
                    ->exists()
                ) {
                    $event->slug = "{$originalSlug}-{$count}";
                    $count++;
                }
            }
        });
    }

    // Accessor untuk menghitung status berdasarkan tanggal
    public function getStatusAttribute()
    {
        $tanggal = Carbon::parse($this->tanggal);
        $sekarang = Carbon::now();

        if ($tanggal->isFuture()) {
            return 'akan_datang';
        } elseif ($tanggal->isToday()) {
            return 'sedang_berlangsung';
        } else {
            return 'terlewat';
        }
    }

    // Relationships
    public function users()
    {
        return $this->belongsToMany(User::class, 'pendaftaran_events', 'id_event', 'id_user')
            ->withTimestamps();
    }
}
