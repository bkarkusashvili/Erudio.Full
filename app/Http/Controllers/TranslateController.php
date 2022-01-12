<?php

namespace App\Http\Controllers;

use App\Http\Requests\TranslateRequest;
use App\Models\Translate;

class TranslateController extends AdminController
{
    public $create = true;
    public $delete = false;
    public $edit = true;

    public $model = Translate::class;
    public $request = TranslateRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'ka', 'headerName' => 'ქართული'],
        ['field' => 'en', 'headerName' => 'ინგლისური'],
    ];
    public $fields = [
        [
            'size' => 6,
            'list' => [
                ['type' => 'text', 'name' => 'ka', 'label' => 'ქართული'],
            ]
        ],
        [
            'size' => 6,
            'list' => [
                ['type' => 'text', 'name' => 'en', 'label' => 'ინგლისური'],
            ]
        ],
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'ka', 'type' => 'text', 'label' => 'ქართული'],
        ['name' => 'en', 'type' => 'text', 'label' => 'ინგლისური'],
    ];
}
