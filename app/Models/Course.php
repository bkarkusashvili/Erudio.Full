<?php

namespace App\Models;

use App\Casts\CourseTypeCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public $guarded = [];

    protected $casts = [
        'type' => CourseTypeCast::class,
    ];

    public function getIsFreeAttribute()
    {
        return $this->price == 0;
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function instructorTwo()
    {
        return $this->belongsTo(Instructor::class, 'instructor_two_id');
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

    public function videos()
    {
        // type: 0

        return $this->hasMany(CourseVideo::class);
    }

    public function lives()
    {
        // type: 1

        return $this->hasMany(LiveCourse::class);
    }

    public function offlines()
    {
        // type: 2

        return $this->hasMany(OfflineCourse::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function getCourseStatusAttribute()
    {
        return 'active';
    }

    public function getIsFullAttribute()
    {
        return false;
    }

    public function getCanBuyAttribute()
    {
        return true;
    }

    public static function getCourseType(int $type)
    {
        return [
            'masterclass',
            'online',
            'offline',
        ][$type];
    }
}
