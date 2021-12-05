<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstructorRequest;
use App\Models\Instructor;

class InstructorController extends AdminController
{
    public $model = Instructor::class;
    public $request = InstructorRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'headerName' => 'სახელი'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'name_ka', 'label' => 'სახელი (ქარ.)'],
                ['type' => 'text', 'name' => 'name_en', 'label' => 'სახელი (ინგ.)'],
                ['type' => 'text', 'name' => 'area_ka', 'label' => 'სფერო (ქარ.)'],
                ['type' => 'text', 'name' => 'area_en', 'label' => 'სფერო (ინგ.)'],
                ['type' => 'text', 'name' => 'profession_ka', 'label' => 'პროფესია (ქარ.)'],
                ['type' => 'text', 'name' => 'profession_en', 'label' => 'პროფესია (ინგ.)'],
                ['type' => 'textarea', 'name' => 'bio_ka', 'label' => 'ბიოგრაფია (ქარ.)'],
                ['type' => 'textarea', 'name' => 'bio_en', 'label' => 'ბიოგრაფია (ინგ.)'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
}
