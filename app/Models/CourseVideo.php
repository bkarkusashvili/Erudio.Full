<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseVideo extends Model
{
    use HasFactory;

    public $guarded = [];

    public function courses()
    {
        return $this->belongsTo(Course::class);
    }
}
