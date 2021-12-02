<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends AdminController
{
    public $model = Client::class;
    public $request = ClientRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
    ];
    public $fields = [
        [
            'size' => 12,
            'list' => [
                ['type' => 'file', 'name' => 'image', 'label' => 'სურათი'],
            ]
        ]
    ];
    public $fileFilds = ['image'];
}
