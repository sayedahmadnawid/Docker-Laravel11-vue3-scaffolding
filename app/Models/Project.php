<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'temporary_name',
        'confirmed_name',
        'short_name',
        'type',
        'nature',
        'start_date',
        'complete_date',
    ];
}
