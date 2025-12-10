<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_event';

    protected $fillable = [
        'judul',
        'deskripsi',
        'thumbnail',
        'tanggal',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    // Relationships
    public function users()
    {
        return $this->belongsToMany(User::class, 'pendaftaran_events', 'id_event', 'id_user')
            ->withTimestamps();
    }
}
