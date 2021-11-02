<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Category;
use App\Models\Course;

class CourseController extends AdminController
{
    public $categories;

    public $model = Course::class;
    public $request = CourseRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name', 'headerName' => 'სახელი'],
        ['field' => 'price', 'headerName' => 'ფასი'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'name_ka', 'label' => 'სახელი (ქარ.)'],
                ['type' => 'text', 'name' => 'name_en', 'label' => 'სახელი (ინგ.)'],
                ['type' => 'text', 'name' => 'address_ka', 'label' => 'მისამართი (ქარ.)'],
                ['type' => 'text', 'name' => 'address_en', 'label' => 'მისამართი (ინგ.)'],

                ['type' => 'textarea', 'name' => 'goal_ka', 'label' => 'მიზანი (ქარ.)'],
                ['type' => 'textarea', 'name' => 'goal_en', 'label' => 'მიზანი (ინგ.)'],
                ['type' => 'textarea', 'name' => 'methodology_ka', 'label' => 'მეთოდოლოგია (ქარ.)'],
                ['type' => 'textarea', 'name' => 'methodology_en', 'label' => 'მეთოდოლოგია (ინგ.)'],
                ['type' => 'textarea', 'name' => 'for_ka', 'label' => 'ვისთვისაა საჭირო ეს კურსები (ქარ.)'],
                ['type' => 'textarea', 'name' => 'for_en', 'label' => 'ვისთვისაა საჭირო ეს კურსები (ინგ.)'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'number', 'name' => 'price', 'label' => 'ფასი'],
                ['type' => 'text', 'name' => 'phone', 'label' => 'ტელეფონი'],
                ['type' => 'select', 'name' => 'category_id', 'label' => 'კატეგორია'],
                ['type' => 'select', 'name' => 'city_id', 'label' => 'ქალაქი'],
                ['type' => 'select', 'name' => 'instructor_id', 'label' => 'ინსტრუქტორი'],
                ['type' => 'file', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];

    public function __construct()
    {
        parent::__construct();
        $this->categories = Category::all()->map(function (Category $category) {
            return [
                'text' => $category->title_ka,
                'value' => $category->id,
            ];
        })->toArray();
    }
}
