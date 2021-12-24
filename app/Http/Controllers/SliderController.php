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
        ['field' => 'status', 'headerName' => 'სტატუსი', 'type' => 'checkbox'],
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
                ['type' => 'datetime', 'name' => 'created_at', 'label' => 'დამატების თარიღი', 'disableCreate' => true],
                ['type' => 'file', 'name' => 'video', 'label' => 'ვიდეო'],
                ['type' => 'image', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'title', 'type' => 'text', 'label' => 'სათაური'],
        ['name' => 'status', 'type' => 'select', 'label' => 'სტატუსი', 'options' => [
            ['value' => 1, 'text' => 'აქტიური'],
            ['value' => 0, 'text' => 'გათიშული']
        ]],
    ];
    public $fileFilds = ['image', 'video'];
}
