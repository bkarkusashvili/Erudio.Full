<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends AdminController
{
    public $model = Course::class;
    public $request = TeamRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name', 'headerName' => 'სახელი'],
        ['field' => 'days', 'headerName' => 'დღეები'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'name', 'label' => 'სახელი'],
                ['type' => 'textarea', 'name' => 'bio', 'label' => 'ბიოგრაფია'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'profession', 'label' => 'პროფესია'],
                ['type' => 'text', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
}
