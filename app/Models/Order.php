<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
