<?php

namespace App\Http\Controllers;

use App\Http\Requests\PageRequest;
use App\Models\Page;

class PageController extends AdminController
{
    public $edit = true;
    public $create = false;
    public $delete = false;

    public $model = Page::class;
    public $request = PageRequest::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'title_ka', 'headerName' => 'სათაური'],
    ];
    public $fields = [
        1 => [
            [
                'size' => 8,
                'list' => [
                    ['type' => 'text', 'name' => 'slider_title_ka', 'label' => 'სლაიდერის სათაური (ქარ.)'],
                    ['type' => 'text', 'name' => 'slider_title_en', 'label' => 'სლაიდერის სათაური (ინგ.)'],
                    ['type' => 'text', 'name' => 'section_title_ka', 'label' => 'სექციის სათაური (ქარ.)'],
                    ['type' => 'text', 'name' => 'section_title_en', 'label' => 'სექციის სათაური (ინგ.)'],
                    ['type' => 'textarea', 'name' => 'text_ka', 'label' => 'კლიენტებზე მორგებული გადაწყვეტები (ქარ.)'],
                    ['type' => 'textarea', 'name' => 'text_en', 'label' => 'კლიენტებზე მორგებული გადაწყვეტები (ინგ.)'],
                ]
            ],
            [
                'size' => 4,
                'list' => [
                    ['type' => 'file', 'name' => 'file', 'label' => 'საპრეზენტაციო ფაილი'],
                ]
            ]
        ],
        2 => [
            [
                'size' => 8,
                'list' => [
                    ['type' => 'text', 'relation' => 'metas', 'name' => 'title_ka', 'label' => 'სათაური (ქარ.)'],
                    ['type' => 'text', 'relation' => 'metas', 'name' => 'title_en', 'label' => 'სათაური (ინგ.)'],
                    ['type' => 'textarea', 'relation' => 'metas', 'name' => 'text_ka', 'label' => 'ტექსტი (ქარ.)'],
                    ['type' => 'textarea', 'relation' => 'metas', 'name' => 'text_en', 'label' => 'ტექსტი (ინგ.)'],
                ]
            ],
            [
                'size' => 4,
                'list' => [
                    ['type' => 'image', 'relation' => 'metas', 'name' => 'image', 'label' => 'სურათი'],
                ]
            ]
        ],
        3 => [
            [
                'size' => 8,
                'list' => [
                    ['type' => 'text', 'name' => 'title', 'label' => 'სათაური'],
                ]
            ]
        ],
        4 => [
            [
                'size' => 12,
                'list' => [
                    ['type' => 'textarea', 'name' => 'text_ka', 'label' => 'ტექსტი (ქარ.)'],
                    ['type' => 'textarea', 'name' => 'text_en', 'label' => 'ტექსტი (ინგ.)'],
                ]
            ]
        ],
    ];

    public function __construct()
    {
        $id = (int) request()->route('page');

        if ($id) {
            $this->fields = $this->fields[$id];
        }

        parent::__construct();
    }
}
