<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Subject extends Model
{
    protected $fillable = ['title', 'description', 'price', 'icon', 'user_id', 'category_id', 'level_id',];



    /**
     * subject is assigned to users (n:1)
     */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * subject belongs to many students (m:n) ?????
     */

    public function category():BelongsTo{
        return $this->belongsTo(Category::class);
    }

    public function level():BelongsTo{
        return $this->belongsTo(Category::class);
    }

    public function appointments():HasMany{
        return $this->hasMany(Appointment::class);
    }

    public function messages():HasMany{
        return $this->hasMany(Message::class);
    }
}
