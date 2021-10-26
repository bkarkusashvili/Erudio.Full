<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryController extends AdminController
{
    public $model = Category::class;
    public $request = CategoryRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'title', 'headerName' => 'სათაური'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'title', 'label' => 'სათაური'],
                ['type' => 'textarea', 'name' => 'text', 'label' => 'ტექსტი'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'file', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
}
