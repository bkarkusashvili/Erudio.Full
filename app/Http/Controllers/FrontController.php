<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Client;
use App\Models\Course;
use App\Models\Media;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class FrontController extends Controller
{

    public function __construct()
    {
        Inertia::share('categories', Category::all());
        Inertia::share('lang', Lang::locale());
        Inertia::share('base', explode('/', request()->path())[0] == 'erudio' ? '/erudio' : '');
    }

    public function home()
    {
        return Inertia::render('Home', [
            'clients' => Client::all()
        ]);
    }

    public function about()
    {
        return Inertia::render('About', []);
    }

    public function team()
    {
        return Inertia::render('About/Team', [
            'list' => Team::all()
        ]);
    }

    public function social()
    {
        return Inertia::render('About/Social', []);
    }

    public function media()
    {
        return Inertia::render('About/Media', [
            'list' => Media::all()
        ]);
    }

    public function mediaSingle(int $id)
    {
        $item = Media::findOrFail($id);

        return Inertia::render('About/MediaSingle', [
            'item' => $item
        ]);
    }

    public function category()
    {
        return Inertia::render('Category', [
            'list' => Category::all()
        ]);
    }

    public function categorySingle(int $id)
    {
        $item = Category::findOrFail($id);

        return Inertia::render('Category/CategorySingle', [
            'item' => $item,
            'courses' => $item->courses,
        ]);
    }

    public function course(Request $request)
    {
        $query = Course::query();

        $query->when($request->has('category'), function ($q) {
            return $q->where('category_id', request('category'));
        });

        $query->when($request->has('city'), function ($q) {
            return $q->where('city_id', request('city'));
        });

        $list = $query->get();

        return Inertia::render('Course', [
            'list' => $list,
            'categories' => Category::all(),
            'cities' => City::all(),
        ]);
    }

    public function courseSingle(int $id)
    {
        $item = Course::with('instructor')->findOrFail($id);

        return Inertia::render('Course/CourseSingle', [
            'item' => $item
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', []);
    }

    public function profile()
    {
        return Inertia::render('Auth/Profile', []);
    }

    public function settings()
    {
        return Inertia::render('Auth/Settings', []);
    }
}
