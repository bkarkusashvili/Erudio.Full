<?php

namespace App\Http\Controllers;

use App\Http\Requests\TranslateRequest;
use App\Models\Translate;

class TranslateController extends AdminController
{
    public $create = false;
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
}
