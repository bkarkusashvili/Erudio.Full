<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    public $guarded = [];

    public function getBodyAttribute($value)
    {
        return json_decode($value);
    }

    public function setBodyAttribute($value)
    {
        $this->attributes['body'] = json_encode($value);
    }
}
