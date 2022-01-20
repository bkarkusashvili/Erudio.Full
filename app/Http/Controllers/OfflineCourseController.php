<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfflineCourseRequest;
use App\Models\Course;
use App\Models\OfflineCourse;

class OfflineCourseController extends AdminController
{
    public $sorting = true;
    public $model = OfflineCourse::class;
    public $request = OfflineCourseRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'relation' => 'course', 'headerName' => 'სახელი'],
        ['field' => 'start', 'headerName' => 'დაწყების თარიღი'],
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
                ['type' => 'number', 'name' => 'quantity', 'label' => 'რაოდენობა'],
                ['type' => 'select', 'name' => 'course_id', 'label' => 'კურსი'],
            ]
        ],
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'course.name_ka', 'type' => 'text', 'label' => 'სახელი'],
        ['name' => 'start', 'type' => 'date', 'label' => 'დაწყების თარიღი'],
    ];

    public function __construct()
    {

        $this->fields[2]['list'][1]['options'] = Course::where('type', 2)->get()->map(function (Course $course) {
            return [
                'text' => $course->name_ka,
                'value' => $course->id,
            ];
        });

        parent::__construct();
    }

    public function index($query = null)
    {
        $query = OfflineCourse::query()->with('course');

        return parent::index($query);
    }
}
