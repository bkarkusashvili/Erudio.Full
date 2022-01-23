<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseVideoRequest;
use App\Models\Course;
use App\Models\CourseVideo;

class CourseVideoController extends AdminController
{

    public $model = CourseVideo::class;
    public $request = CourseVideoRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'relation' => 'course', 'headerName' => 'კურსი'],
        ['field' => 'name_ka', 'headerName' => 'სახელი'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'name_ka', 'label' => 'სახელი (ქარ.)'],
                ['type' => 'text', 'name' => 'name_en', 'label' => 'სახელი (ინგ.)'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'datetime', 'name' => 'created_at', 'label' => 'დამატების თარიღი', 'disableCreate' => true],
                ['type' => 'number', 'name' => 'number', 'label' => 'ვიდეოს ნომერი'],
                ['type' => 'select', 'name' => 'course_id', 'label' => 'კურსი'],

                ['type' => 'text', 'name' => 'video', 'label' => 'ვიდეო'],
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ],
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'course*name_ka', 'type' => 'text', 'label' => 'კურსი'],
        ['name' => 'name_ka', 'type' => 'text', 'label' => 'სახელი'],
    ];
    public $fileFilds = ['image'];

    public function __construct()
    {

        $this->fields[1]['list'][2]['options'] = Course::where('type', 0)->get()->map(function (Course $course) {
            return [
                'text' => $course->name_ka,
                'value' => $course->id,
            ];
        });

        parent::__construct();
    }

    public function index($query = null)
    {
        $query = CourseVideo::query()->with('course');

        return parent::index($query);
    }
}
