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
        ['field' => 'name_ka', 'headerName' => 'სახელი'],
        ['field' => 'profession', 'headerName' => 'პროფესია'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'name_ka', 'label' => 'სახელი (ქარ.)'],
                ['type' => 'text', 'name' => 'name_en', 'label' => 'სახელი (ინგ.)'],
                ['type' => 'textarea', 'name' => 'bio_ka', 'label' => 'ბიოგრაფია (ქარ.)'],
                ['type' => 'textarea', 'name' => 'bio_en', 'label' => 'ბიოგრაფია (ინგ.)'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'text', 'name' => 'profession_ka', 'label' => 'პროფესია (ქარ.)'],
                ['type' => 'text', 'name' => 'profession_en', 'label' => 'პროფესია (ინგ.)'],
                ['type' => 'file', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $fileFilds = ['image'];
}
