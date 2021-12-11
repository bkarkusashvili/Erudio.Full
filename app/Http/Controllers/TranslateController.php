<?php

namespace App\Http\Controllers;

use App\Http\Requests\TranslateRequest;
use App\Models\Translate;

class TranslateController extends AdminController
{
    public $create = true;
    public $delete = true;
    public $edit = true;

    public $model = Translate::class;
    public $request = TranslateRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'key', 'headerName' => 'Key'],
        ['field' => 'ka', 'headerName' => 'ka'],
        ['field' => 'en', 'headerName' => 'en'],
    ];
    public $fields = [
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'key', 'label' => 'Key'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'ka', 'label' => 'ქართული'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'en', 'label' => 'ინგლისური'],
            ]
        ],
    ];
}
