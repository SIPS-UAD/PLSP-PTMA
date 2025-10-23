<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $primaryKey = 'id_user';

    protected $fillable = [
        'name',
        'email',
        'password',
        'nama_lsp',
        'nama_ptma',
        'no_hp',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relationships
    public function posts()
    {
        return $this->hasMany(Post::class, 'id_user', 'id_user');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_user', 'id_user');
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'pendaftaran_events', 'id_user', 'id_event')
            ->withTimestamps();
    }
}
