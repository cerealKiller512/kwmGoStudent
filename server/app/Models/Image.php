<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'url', 'title'
    ];

    public function subject() : BelongsTo{
        return $this->belongsTo(Subject::class);
    }
}
