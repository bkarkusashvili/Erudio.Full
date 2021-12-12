<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public $guarded = [];

    public function getIsLiveAttribute()
    {
        return $this->type == 1;
    }

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

    public function topics()
    {
        return $this->hasMany(CourseTopic::class);
    }

    public function lives()
    {
        return $this->hasMany(LiveCourse::class);
    }

    public function videos()
    {
        return $this->hasMany(CourseVideo::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
