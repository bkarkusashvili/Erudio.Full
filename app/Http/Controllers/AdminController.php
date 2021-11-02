<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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
    public $fileFilds = [];

    public function __construct()
    {
        $this->route = strtolower(class_basename($this->model));

        Inertia::share('model', $this->route);
        Inertia::share('fields', $this->fields);
    }

    public function index()
    {
        $result = $this->model::latest()->paginate(10);
        $paginate = [
            'page' => $result->currentPage(),
            'count' => $result->lastPage(),
        ];

        return Inertia::render('Admin/List', [
            'rows' => $result->items(),
            'paginate' => $paginate,
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
        $data = collect($validator->validated());

        $data->each(function ($item, $key) use ($data) {
            if ($item instanceof UploadedFile) {
                $data[$key] = $this->uploadImage($item);
            }
        });

        $model = $this->model::create($data->toArray());

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

        $model = $this->model::findOrFail($id);
        $data = collect($validator->validated())->filter(fn ($item) => $item !== null);

        $data->each(function ($item, $key) use ($data, $model) {
            if ($item instanceof UploadedFile) {
                $data[$key] = $this->uploadImage($item, $model[$key]);
            }
        });

        $model->update($data->toArray());

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
        $model = $this->model::findOrFail($id);

        collect($this->fileFilds)->each(function ($field) use ($model) {
            $this->removeFile($model->$field);
        });
        $this->beforeDestroy($model);

        $model->delete();
    }

    protected function beforeDestroy(Model $model)
    {
    }

    private function validator(Request $request)
    {
        return Validator::make($request->all(), $this->request::createFrom($request)->rules());
    }

    private function uploadImage(UploadedFile $image, string $oldImage = null)
    {
        if ($oldImage) {
            $this->removeFile($oldImage);
        }

        return Storage::disk('public')->putFile('images/' . $this->route, $image) ?: null;
    }

    private function removeFile(string $url)
    {
        Storage::disk('public')->delete($url);
    }
}
