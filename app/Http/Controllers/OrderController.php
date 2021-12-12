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
        ['field' => 'payId', 'headerName' => 'შეკვეთის ნომერი'],
        ['field' => 'userName', 'headerName' => 'მომხმარებლები'],
        ['field' => 'amount', 'headerName' => 'თანხა'],
        ['field' => 'status', 'headerName' => 'სტატუსი'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'number', 'name' => 'status', 'label' => 'სტატუსი'],
            ]
        ],
    ];
}
