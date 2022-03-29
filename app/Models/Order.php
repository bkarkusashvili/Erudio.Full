<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lang;

class Order extends Model
{
    use HasFactory;

    public $guarded = [];

    public $appends = ['courseName'];

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
            $item = LiveCourse::find($this->course_id);
            $course = $item ? $item->course : null;
        } else if ($this->course_type == 'offline') {
            $item = OfflineCourse::find($this->course_id);
            $course = $item ? $item->course : null;
        } else {
            $course = Course::find($this->course_id);
        }

        $lang = Lang::locale();

        return isset($course['name_' . $lang]) ? $course['name_' . $lang] : '';
    }
}
