<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_post';

    protected $fillable = [
        'judul',
        'slug',
        'konten',
        'kategori',
        'image_link',
        'id_user',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->judul);

                $originalSlug = $post->slug;
                $count = 1;
                while (static::where('slug', $post->slug)->exists()) {
                    $post->slug = "{$originalSlug}-{$count}";
                    $count++;
                }
            }
        });

        static::updating(function ($post) {
            if ($post->isDirty('judul') && !$post->isDirty('slug')) {
                $post->slug = Str::slug($post->judul);

                $originalSlug = $post->slug;
                $count = 1;
                while (static::where('slug', $post->slug)
                    ->where('id_post', '!=', $post->id_post)
                    ->exists()
                ) {
                    $post->slug = "{$originalSlug}-{$count}";
                    $count++;
                }
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_post', 'id_post');
    }
}
