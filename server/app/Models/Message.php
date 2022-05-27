<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Message extends Model
{

    protected $fillable = ['text', 'user_id', 'student_id'];

    use HasFactory;


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * apointment belongs to one student
     */
    public function student():BelongsTo{
        return $this->belongsTo(Student::class);
    }
}
