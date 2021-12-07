<?php

namespace App\Http\Controllers;

use App\Http\Requests\LiveCourseRequest;
use App\Models\Course;
use App\Models\LiveCourse;

class LiveCourseController extends AdminController
{

    public $model = LiveCourse::class;
    public $request = LiveCourseRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'headerName' => 'სახელი'],
        ['field' => 'price', 'headerName' => 'ფასი'],
    ];
    public $fields = [
        [
            'size' => 4,
            'list' => [
                ['type' => 'date', 'name' => 'start', 'label' => 'კურსის დაწყება'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'date', 'name' => 'end', 'label' => 'კურსის დასრულება'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'url', 'label' => 'ლინკი'],
                ['type' => 'select', 'name' => 'course_id', 'label' => 'კურსი'],
            ]
        ],
    ];

    public function __construct()
    {

        $this->fields[2]['list'][1]['options'] = Course::where('type', 1)->get()->map(function (Course $course) {
            return [
                'text' => $course->name_ka,
                'value' => $course->id,
            ];
        });

        parent::__construct();
    }
}
