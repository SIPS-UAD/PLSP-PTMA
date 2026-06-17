<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PendaftaranEvent extends Model
{
  protected $table = 'pendaftaran_events';

  protected $primaryKey = 'id_pendaftaran';

  protected $fillable = [
    'id_user',
    'id_event',
    'status',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, 'id_user', 'id_user');
  }

  public function event(): BelongsTo
  {
    return $this->belongsTo(Event::class, 'id_event', 'id_event');
  }
}
