<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Appointment extends Model
{

    protected $fillable = ['day', 'from', 'to', 'subject_id', 'student_id'];

    use HasFactory;

    /**
     * appointment is assigned to subject (n:1)
     */

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * apointment belongs to one or no student
     */
    public function students():HasOne{
        return $this->hasOne(Student::class);
    }
}
