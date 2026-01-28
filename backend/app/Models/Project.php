<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'images',
        'year',
        'client',
        'location',
        'is_active',
        'order'
    ];

    protected $casts = [
        'images' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer'
    ];
}
