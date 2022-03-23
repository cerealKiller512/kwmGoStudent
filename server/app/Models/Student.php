<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use \Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName', 'lastName', 'id', 'email', 'password', 'phone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * student has many subjects (1:n)
     * @return HasMany
     */

    public function subjects() : HasMany{
       return $this->hasMany(Subject::class);
    }

    // students belongs to many subjects (m:n)
    //public function subjects(): \Illuminate\Database\Eloquent\Relations\BelongsToMany{
    //return $this->belongsToMany(Subject::class)->withTimestamps();
    //}
}
