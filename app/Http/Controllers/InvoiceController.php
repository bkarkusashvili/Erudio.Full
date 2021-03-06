<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;

class InvoiceController extends AdminController
{
    public $edit = true;
    public $create = false;
    public $delete = true;

    public $model = Invoice::class;
    public $request = InvoiceRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name_ka', 'relation' => 'course', 'headerName' => 'კურსი'],
        ['field' => 'fullname', 'headerName' => 'სახელი'],
        ['field' => 'company_name', 'headerName' => 'კომპანია'],
        ['field' => 'company_number', 'headerName' => 'საიდენთიფიკაციო'],
        ['field' => 'status', 'headerName' => 'სტატუსი', 'type' => 'checkbox'],
    ];
    public $fields = [
        [
            'size' => 8,
            'list' => [
                ['type' => 'text', 'name' => 'fullname', 'label' => 'სახელი'],
                ['type' => 'text', 'name' => 'fullname_latin', 'label' => 'სახელი ლათინურად'],
                ['type' => 'text', 'name' => 'company_name', 'label' => 'კომპანიის სახელი'],
                ['type' => 'text', 'name' => 'company_number', 'label' => 'კომპანიის საიდენთიფიკაციო'],
                ['type' => 'text', 'name' => 'from', 'label' => 'საიდან'],
            ]
        ],
        [
            'size' => 4,
            'list' => [
                ['type' => 'toggle', 'name' => 'status', 'label' => 'სტატუსი', 'value' => false],
                ['type' => 'email', 'name' => 'email', 'label' => 'მეილი'],
                ['type' => 'text', 'name' => 'position', 'label' => 'პოზიცია'],
                ['type' => 'text', 'name' => 'phone', 'label' => 'მობილური'],
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
        $query = Invoice::query()->with('course');

        return parent::index($query);
    }
}
