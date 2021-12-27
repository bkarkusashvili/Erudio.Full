<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Category;
use App\Models\City;
use App\Models\Course;
use App\Models\Instructor;

class CourseController extends AdminController
{
    // public $categories;

    public $model = Course::class;
    public $request = CourseRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'headerName' => 'სახელი'],
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

                // [
                //     'type' => 'group',
                //     'title' => 'დღეები',
                //     'name' => 'day',
                //     'relation' => 'body',
                //     'addMore' => true,
                //     'divider' => 'top',
                //     'list' => [
                //         ['type' => 'date', 'name' => 'date', 'label' => 'თარიღი'],
                //         ['type' => 'text', 'name' => 'text_ka', 'label' => 'ტექსტი (ქარ.)'],
                //         ['type' => 'text', 'name' => 'text_en', 'label' => 'ტექსტი (ინგ.)'],
                //     ]
                // ],

                // [
                //     'type' => 'group',
                //     'title' => 'თემები',
                //     'name' => 'topic',
                //     'relation' => 'body',
                //     'addMore' => true,
                //     'divider' => 'top',
                //     'list' => [
                //         ['type' => 'date', 'name' => 'date', 'label' => 'თარიღი'],
                //         ['type' => 'text', 'name' => 'text_ka', 'label' => 'ტექსტი (ქარ.)'],
                //         ['type' => 'text', 'name' => 'text_en', 'label' => 'ტექსტი (ინგ.)'],
                //     ]
                // ],

                ['type' => 'textarea', 'name' => 'methodology_ka', 'label' => 'მეთოდოლოგია (ქარ.)'],
                ['type' => 'textarea', 'name' => 'methodology_en', 'label' => 'მეთოდოლოგია (ინგ.)'],
                ['type' => 'textarea', 'name' => 'for_ka', 'label' => 'ვისთვისაა საჭირო ეს კურსები (ქარ.)'],
                ['type' => 'textarea', 'name' => 'for_en', 'label' => 'ვისთვისაა საჭირო ეს კურსები (ინგ.)'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'toggle', 'name' => 'popular_training', 'label' => 'პოპულალური ტრენინგი', 'value' => false],
                ['type' => 'toggle', 'name' => 'popular_course', 'label' => 'პოპულალური კურსი', 'value' => false],
                ['type' => 'toggle', 'name' => 'popular_masterclass', 'label' => 'პოპულალური მასტერკლასი', 'value' => false],
                ['type' => 'datetime', 'name' => 'created_at', 'label' => 'დამატების თარიღი', 'disableCreate' => true],
                ['type' => 'textarea', 'name' => 'text_ka', 'label' => 'მთავარი გვერდის ტექსტი, მოკლე აღწერა (ქარ.)'],
                ['type' => 'textarea', 'name' => 'text_en', 'label' => 'მთავარი გვერდის ტექსტი, მოკლე აღწერა (ინგ.)'],
                ['type' => 'number', 'name' => 'days', 'label' => 'დღეები'],
                ['type' => 'number', 'name' => 'price', 'label' => 'ფასი'],
                ['type' => 'text', 'name' => 'phone', 'label' => 'ტელეფონი'],
                ['type' => 'select', 'name' => 'type', 'label' => 'კურსის ტიპი'],
                ['type' => 'select', 'name' => 'category_id', 'label' => 'კატეგორია'],
                ['type' => 'select', 'name' => 'city_id', 'label' => 'ქალაქი'],
                ['type' => 'select', 'name' => 'instructor_id', 'label' => 'ინსტრუქტორი'],
                ['type' => 'file', 'name' => 'video', 'label' => 'ვიდეო'],
                ['type' => 'file', 'name' => 'file', 'label' => 'საპრეზენტაციო ფაილი'],
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ],
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'name_ka', 'type' => 'text', 'label' => 'სახელი'],
        ['name' => 'price', 'type' => 'number', 'label' => 'ფასი'],
    ];
    public $fileFilds = ['image', 'file', 'video'];


    public function __construct()
    {
        // $this->categories = Category::all()->map(function (Category $category) {
        //     return [
        //         'text' => $category->title_ka,
        //         'value' => $category->id,
        //     ];
        // })->toArray();
        $start = 9;
        $this->fields[1]['list'][$start++]['options'] = [
            ['text' => 'Online ტრენინგი', 'value' => 1],
            ['text' => 'Offline ტრენინგი', 'value' => 2],
            ['text' => 'მასტერკლასი', 'value' => 0],
        ];
        $this->fields[1]['list'][$start++]['options'] = Category::all()->map(function (Category $category) {
            return [
                'text' => $category->title_ka,
                'value' => $category->id,
            ];
        });
        $this->fields[1]['list'][$start++]['options'] = City::all()->map(function (City $city) {
            return [
                'text' => $city->name_ka,
                'value' => $city->id,
            ];
        });
        $this->fields[1]['list'][$start++]['options'] = Instructor::all()->map(function (Instructor $instructor) {
            return [
                'text' => $instructor->name_ka,
                'value' => $instructor->id,
            ];
        });

        parent::__construct();
    }
}
