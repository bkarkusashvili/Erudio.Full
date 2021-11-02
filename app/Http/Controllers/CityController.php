<?php

namespace App\Http\Controllers;

use App\Http\Requests\CityRequest;
use App\Models\City;

class CityController extends AdminController
{
    public $model = City::class;
    public $request = CityRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'headerName' => 'ქალაქი'],
    ];
    public $fields = [
        [
            'size' => 12,
            'list' => [
                ['type' => 'text', 'name' => 'name_ka', 'label' => 'ქალაქი (ქარ.)'],
                ['type' => 'text', 'name' => 'name_en', 'label' => 'ქალაქი (ინგ.)'],
            ]
        ]
    ];
}
