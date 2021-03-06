<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Level extends Model
{

    protected $fillable= ['id', 'level'];
    use HasFactory;

    /**
     * Level has many subjects
     */
    public function subjects() : hasMany{
        return $this->hasMany(Subject::class);
    }
}
