<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trader extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_kana',
        'name',
        'phone',
        'fax',
        'postalcode',
        'prefecture',
        'city',
        'area',
        'street',
    ];
}
