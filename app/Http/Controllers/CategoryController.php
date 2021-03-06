<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryController extends AdminController
{
    public $sorting = true;
    public $model = Category::class;
    public $request = CategoryRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'title_ka', 'headerName' => 'სათაური'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'title_ka', 'label' => 'სათაური (ქარ.)'],
                ['type' => 'text', 'name' => 'title_en', 'label' => 'სათაური (ინგ.)'],
                ['type' => 'textarea', 'name' => 'text_ka', 'label' => 'ტექსტი (ქარ.)'],
                ['type' => 'textarea', 'name' => 'text_en', 'label' => 'ტექსტი (ინგ.)'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'datetime', 'name' => 'created_at', 'label' => 'დამატების თარიღი', 'disableCreate' => true],
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'title_ka', 'type' => 'text', 'label' => 'სათაური'],
    ];
    public $fileFilds = ['image'];
}
