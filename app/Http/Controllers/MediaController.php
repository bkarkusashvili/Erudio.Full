<?php

namespace App\Http\Controllers;

use App\Http\Requests\MediaRequest;
use App\Models\Media;

class MediaController extends AdminController
{
    public $model = Media::class;
    public $request = MediaRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'title', 'headerName' => 'სათაური'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'title', 'label' => 'სათაური'],
                ['type' => 'textarea', 'name' => 'text', 'label' => 'ტექსტი'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'file', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
}
