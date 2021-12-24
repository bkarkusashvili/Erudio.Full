<?php

namespace App\Http\Controllers;

use App\Http\Requests\OptionRequest;
use App\Models\Option;

class OptionController extends AdminController
{
    public $create = false;
    public $delete = false;
    public $edit = true;

    public $model = Option::class;
    public $request = OptionRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'key', 'headerName' => 'Key'],
        ['field' => 'value', 'headerName' => 'Value'],
    ];
    public $fields = [
        [
            'size' => 6,
            'list' => [
                ['type' => 'text', 'name' => 'key', 'label' => 'Key', 'disabled' => true],
            ]
        ],
        [
            'size' => 6,
            'list' => [
                ['type' => 'text', 'name' => 'value', 'label' => 'Value'],
            ]
        ],
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'key', 'type' => 'text', 'label' => 'Key'],
        ['name' => 'value', 'type' => 'text', 'label' => 'Value'],
    ];
}
