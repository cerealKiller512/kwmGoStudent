<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
{
    protected $fillable = ['title', 'rating', 'description', 'user_id', 'student_id', 'category_id', 'level_id'];

    public function scopeFavourite($query)
    {
        return $query->where('rating', '>=', 8);

    }

    /**
     * subject has many images
     */

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    /**
     * subject is assigned to user (n:1)
     */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * subject belongs to many students (m:n) ?????
     */
    public function students():HasOne{
      return $this->hasOne(Student::class);
    }

    public function category():BelongsTo{
        return $this->belongsTo(Category::class);
    }

    public function level():BelongsTo{
        return $this->belongsTo(Category::class);
    }
}
