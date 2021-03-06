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
        ['field' => 'phone', 'headerName' => 'მობილური'],
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
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'firstname', 'type' => 'text', 'label' => 'სახელი'],
        ['name' => 'lastname', 'type' => 'text', 'label' => 'გვარი'],
        ['name' => 'phone', 'type' => 'text', 'label' => 'მობილური'],
        ['name' => 'email', 'type' => 'text', 'label' => 'მეილი'],
    ];
    public $fileFilds = ['image'];
}
