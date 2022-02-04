<?php

namespace App\Http\Controllers;

use App\Exports\DataExport;
use App\Models\Sorting;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $route;

    public $model;
    public $request;
    public $columns = [];
    public $fields;
    public $search = [];
    public $sorting = false;
    public $edit = true;
    public $create = true;
    public $delete = true;
    public $fileFilds = [];

    public function __construct()
    {
        $this->route = strtolower(class_basename($this->model));

        Inertia::share('model', $this->route);
        Inertia::share('fields', $this->fields);
        Inertia::share('search', $this->search);
        Inertia::share('sorting', $this->sorting);
        Inertia::share('base', explode('/', request()->path())[0] == 'erudio' ? '/erudio' : '');
    }

    public function index($query = null)
    {
        $query = $this->getListData($query)->paginate(50);
        $paginate = [
            'page' => $query->currentPage(),
            'count' => $query->lastPage(),
        ];

        return Inertia::render('Admin/List', [
            'rows' => $query->items(),
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
                $data[$key] = $this->uploadFile($item, null, $key);
            }
        });

        $model = $this->model::create($data->toArray());

        $this->updateSorting('create', $model->id);

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
        $data = collect($validator->validated())->filter(function ($item) {
            return $item !== null;
        });

        $data->filter(function ($item) {
            return $item instanceof UploadedFile || is_array($item);
        })->each(function ($item, $key) use ($data, $model) {
            if ($item instanceof UploadedFile) {
                $data[$key] = $this->uploadFile($item, $model[$key], $key);
            }

            if (is_array($item)) {
                $relation = $key;
                $files = collect($item)->filter(function ($item) {
                    return $item instanceof UploadedFile;
                })->map(function ($item, $key) use ($model, $relation) {
                    $old = isset($model[$relation]->$key) ? $model[$relation]->$key : null;

                    return $this->uploadFile($item, $old, $key);
                });
                $data[$key] = array_merge($item, $files->toArray());
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

        $this->updateSorting('delete', $model->id);

        return Redirect::back();
    }

    public function deleteFile(int $id)
    {
        $model = $this->model::findOrFail($id);
        $file = request()->get('file');

        $this->removeFile($model->$file);

        $model->update([$file => null]);

        return Redirect::back();
    }

    public function export()
    {
        return Excel::download(new DataExport($this->getListData(null, true)), $this->route . '.xlsx');
    }

    public function column(int $id, string $column, string $value)
    {
        $model = $this->model::findOrFail($id);

        $model->update([$column => $value]);

        return Redirect::back();
    }

    public function updateRow(Request $request)
    {
        $request->validate([
            'old' => 'required|integer',
            'new' => 'required|integer',
        ]);

        $old = $request->get('old');
        $new = $request->get('new');

        $this->updateSorting('edit', $old, $new);

        return Redirect::back();
    }

    protected function beforeDestroy(Model $model)
    {
    }

    private function updateSorting($type, $id, $new = null)
    {
        if (!$this->sorting) {
            return;
        }

        $sort = Sorting::where('model', $this->model)->first();

        if (!$sort) {
            $sort = $this->createSortList();
        }

        $list = collect(json_decode($sort->list));

        if ($type == 'create') {
            $list->add($id);
        }

        if ($type == 'edit') {
            $moveId = $list->pull($id);

            $list->splice($new, 0, [$moveId]);
        }

        if ($type == 'delete') {
            $list->filter(function ($value) use ($id) {
                return $value != $id;
            });
        }

        $sort->update(['list' => $list]);
    }

    private function createSortList()
    {
        $list = $this->model::all()->pluck('id');

        return Sorting::create([
            'model' => $this->model,
            'list' => $list,
        ]);
    }

    private function validator(Request $request)
    {
        return Validator::make($request->all(), $this->request::createFrom($request)->rules());
    }

    private function uploadFile(UploadedFile $file, string $oldFile = null, string $folder)
    {
        if ($oldFile) {
            $this->removeFile($oldFile);
        }

        return Storage::disk('public')->putFile($folder . '/' . $this->route, $file) ?: null;
    }

    private function removeFile($url)
    {
        if ($url) {
            Storage::disk('public')->delete($url);
        }
    }

    private function getListData($query = null, $order = false)
    {
        if (!$query) {
            $query = $this->model::query();
        }

        collect(request()->all())->except('page', 'lang')->each(function ($item, $key) use ($query) {
            $keyList = explode('*', $key);
            if (count($keyList) > 1) {
                $query->whereHas($keyList[0], function ($query) use ($keyList, $item) {
                    $query->where($keyList[1], 'like', '%' . $item . '%');
                });
            } else {
                $query->when($item !=  null, function ($q) use ($item, $key) {
                    $q->where($key, 'like', '%' . $item . '%');
                });
            }
        });

        if ($this->sorting) {
            $sort = Sorting::where('model', $this->model)->first();

            if ($sort) {
                $ids =  implode(',', json_decode($sort->list));

                return $query->orderBy(DB::raw('FIELD(`id`, ' . $ids . ')'));
            }
        }

        if ($order) {
            return $query->orderBy('id', 'DESC');
        }

        return $query->latest();
    }
}
