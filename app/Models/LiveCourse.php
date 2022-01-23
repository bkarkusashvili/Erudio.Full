<?php

namespace App\Models;

use App\Casts\CourseStatusCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveCourse extends Model
{
    use HasFactory;

    public $guarded = [];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function getCourseStatusAttribute()
    {

        if ($this->start > now()) {
            if ($this->isFull) {
                return 'full';
            }

            return 'active';
        }

        if ($this->start <= now() && $this->end >= now()) {
            return 'going';
        }

        if ($this->end < now()) {
            return 'end';
        }

        return;
    }

    public function getIsFullAttribute()
    {
        $ordersCount = Order::where([
            'status' => 1,
            'course_id' => $this->id,
            'course_type' => 'online',
        ])->count();

        return $ordersCount >= $this->quantity;
    }

    public function getCanBuyAttribute()
    {
        return $this->course_status == 'active';
    }
}
