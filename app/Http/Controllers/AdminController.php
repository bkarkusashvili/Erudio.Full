<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private string $route;

    public $model;
    public $request;
    public $columns = [];
    public $fields;
    public bool $edit = true;
    public bool $create = true;
    public bool $delete = true;

    public function __construct()
    {
        $this->route = strtolower(class_basename($this->model));

        Inertia::share('model', $this->route);
        Inertia::share('fields', $this->fields);
    }

    public function index()
    {
        $items = $this->model::all();

        return Inertia::render('Admin/List', [
            'rows' => $items,
            'columns' => $this->columns,
            'actions' => [
                'edit' => $this->edit,
                'create' => $this->create,
                'delete' => $this->delete,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $this->validator($request);
        $validator->validate();

        $model = $this->model::create($validator->validated());

        return Redirect::route($this->route . '.edit', [$model->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $item = $this->model::findOrFail($id);

        return Inertia::render('Admin/Edit', [
            'data' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $validator = $this->validator($request);
        $validator->validate();

        $item = $this->model::findOrFail($id);
        $item->update($validator->validated());

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        //
    }

    private function validator(Request $request)
    {
        return Validator::make($request->all(), $this->request::createFrom($request)->rules());
    }
}
