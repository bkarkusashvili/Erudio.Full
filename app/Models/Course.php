<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public $guarded = [];

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function dates()
    {
        return $this->hasMany(CourseDate::class);
    }

    public function days()
    {
        return $this->hasMany(CourseDay::class);
    }

    public function topics()
    {
        return $this->hasMany(CourseTopic::class);
    }
}
