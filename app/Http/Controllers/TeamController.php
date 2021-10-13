<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Models\Team;

class TeamController extends AdminController
{
    public $model = Team::class;
    public $request = TeamRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name', 'headerName' => 'სახელი'],
        ['field' => 'profession', 'headerName' => 'პროფესია'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'name', 'label' => 'სახელი'],
                ['type' => 'textarea', 'name' => 'bio', 'label' => 'ბიოგრაფია'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'profession', 'label' => 'პროფესია'],
                ['type' => 'text', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
}
