<?php

namespace App\Http\Controllers;

use App\Models\Sorting;
use DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function sortByDrag($query, $model)
    {
        $sort = Sorting::where('model', $model)->first();

        if ($sort) {
            $ids =  implode(',', json_decode($sort->list));

            return $query->orderBy(DB::raw('FIELD(`id`, ' . $ids . ')'));
        }

        return $query;
    }
}
