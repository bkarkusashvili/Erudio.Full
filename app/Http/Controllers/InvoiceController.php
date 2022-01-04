<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;

class InvoiceController extends AdminController
{
    public $edit = true;
    public $create = true;
    public $delete = true;

    public $model = Invoice::class;
    public $request = InvoiceRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'fullname', 'headerName' => 'სახელი'],
        ['field' => 'fullname_latin', 'headerName' => 'სახელი ლათინურად'],
        ['field' => 'email', 'headerName' => 'მეილი'],
        ['field' => 'company_name', 'headerName' => 'კომპანია'],
        ['field' => 'company_number', 'headerName' => 'საიდენთიფიკაციო'],
        ['field' => 'position', 'headerName' => 'პოზიცია'],
        ['field' => 'phone', 'headerName' => 'მობილური'],
        ['field' => 'from', 'headerName' => 'საიდან'],
        ['field' => 'status', 'headerName' => 'სტატუსი', 'type' => 'checkbox'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'number', 'name' => 'status', 'label' => 'სტატუსი'],
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
}
