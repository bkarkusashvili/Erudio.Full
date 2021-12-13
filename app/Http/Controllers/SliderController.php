<?php

namespace App\Http\Controllers;

use App\Http\Requests\SliderRequest;
use App\Models\Slider;

class SliderController extends AdminController
{
    public $model = Slider::class;
    public $request = SliderRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'title', 'headerName' => 'სათაური'],
        ['field' => 'title', 'status' => 'სტატუსი'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'title', 'label' => 'სათაური'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'toggle', 'name' => 'status', 'label' => 'სტატუსი', 'value' => false],
                ['type' => 'file', 'name' => 'video', 'label' => 'ვიდეო'],
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $fileFilds = ['image', 'video'];
}
