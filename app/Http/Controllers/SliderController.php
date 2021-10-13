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
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'title', 'label' => 'სათაური'],
                ['type' => 'text', 'name' => 'file', 'label' => 'ფაილი'],
            ]
        ]
    ];
}
