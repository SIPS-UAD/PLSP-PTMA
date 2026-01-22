<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $primaryKey = 'id_user';

    public function getRouteKeyName(): string
    {
        return 'id_user';
    }

    protected $fillable = [
        'name',
        'email',
        'password',
        'nama_lsp',
        'nama_ptma',
        'nama_ketua',
        'no_hp',
        'role',
        'status',
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
            'status' => 'boolean',
        ];
    }

    // Relationships
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'id_user', 'id_user');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'id_user', 'id_user');
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'pendaftaran_events', 'id_user', 'id_event')
            ->withTimestamps();
    }

    public function pendaftaranEvents(): HasMany
    {
        return $this->hasMany(PendaftaranEvent::class, 'id_user', 'id_user');
    }
}