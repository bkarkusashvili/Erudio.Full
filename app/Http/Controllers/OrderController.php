<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;

class OrderController extends AdminController
{
    public $edit = true;
    public $create = true;
    public $delete = true;

    public $model = Order::class;
    public $request = OrderRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'relation' => 'course', 'headerName' => 'სახელი'],
        ['field' => 'payId', 'headerName' => 'შეკვეთის ნომერი'],
        ['field' => 'userName', 'headerName' => 'მომხმარებლები'],
        ['field' => 'amount', 'headerName' => 'თანხა'],
        ['field' => 'status', 'headerName' => 'სტატუსი', 'type' => 'checkbox'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'userName', 'label' => 'სახელი'],
                ['type' => 'number', 'name' => 'amount', 'label' => 'თანხა'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'toggle', 'name' => 'status', 'label' => 'სტატუსი', 'value' => false],
            ]
        ],
    ];
    public $search = [
        ['name' => 'id', 'type' => 'number', 'label' => 'ID'],
        ['name' => 'payId', 'type' => 'text', 'label' => 'შეკვეთის ნომერი'],
        ['name' => 'userName', 'type' => 'text', 'label' => 'მომხმარებლები'],
        ['name' => 'amount', 'type' => 'number', 'label' => 'თანხა'],
        ['name' => 'status', 'type' => 'select', 'label' => 'სტატუსი', 'options' => [
            ['value' => 1, 'text' => 'აქტიური'],
            ['value' => 0, 'text' => 'გათიშული']
        ]],
    ];

    public function index($query = null)
    {
        $query = Order::query()->with('course');

        return parent::index($query);
    }
}
