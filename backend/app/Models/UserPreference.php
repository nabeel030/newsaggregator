<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'author',
        'category',
        'source',
    ];

    public function getDecodedPreferences()
    {
        return [
            'categories' => json_decode($this->category, true) ?: [],
            'sources' => json_decode($this->source, true) ?: [],
            'authors' => json_decode($this->author, true) ?: [],
        ];
    }
}
