<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lang;

class Order extends Model
{
    use HasFactory;

    public $guarded = [];

    public static $status = [
        0 => 'Pending',
        1 => 'Paid',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class)->withDefault();
    }

    public function markAsPaid()
    {
        $this->update(['status' => 1]);
    }

    public function getCourseNameAttribute()
    {
        $course = null;

        if ($this->course_type == 'online') {
            $course = LiveCourse::find($this->course_id)->course;
        } else if ($this->course_type == 'ofline') {
            $course = OfflineCourse::find($this->course_id)->course;
        } else {
            $course = Course::find($this->course_id);
        }

        $lang = Lang::locale();

        return $course['name_' . $lang];
    }
}
