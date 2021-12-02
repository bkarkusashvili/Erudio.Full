<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends AdminController
{
    public $edit = true;
    public $create = false;
    public $delete = true;

    public $model = Order::class;
    public $request = MediaRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'title_ka', 'headerName' => 'კურსი'],
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
                ['type' => 'file', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $fileFilds = ['image'];
}
