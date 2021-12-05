<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends AdminController
{
    public $edit = false;
    public $create = false;
    public $delete = false;

    public $model = User::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'firstname', 'headerName' => 'სახელი'],
        ['field' => 'lastname', 'headerName' => 'გვარი'],
        ['field' => 'personalnumber', 'headerName' => 'პირადი ნომერი'],
        ['field' => 'email', 'headerName' => 'მეილი'],
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
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $fileFilds = ['image'];
}
