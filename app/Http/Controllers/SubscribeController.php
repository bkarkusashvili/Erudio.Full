<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscribeRequest;
use App\Models\Subscribe;

class SubscribeController extends AdminController
{
    public $model = Subscribe::class;
    public $request = SubscribeRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'email', 'headerName' => 'მეილი'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'email', 'name' => 'email', 'label' => 'მეილი'],
            ]
        ]
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'email', 'type' => 'text', 'label' => 'მეილი'],
    ];
}
