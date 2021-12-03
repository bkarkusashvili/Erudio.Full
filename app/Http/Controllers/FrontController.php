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
    public $base;

    public function __construct()
    {
        $this->base = explode('/', request()->path())[0] == 'erudio' ? '/erudio' : '';

        Inertia::share('categories', Category::all());
        Inertia::share('lang', Lang::locale());
        Inertia::share('base', $this->base);
    }

    public function home()
    {
        return Inertia::render('Home', [
            'clients' => Client::all()
        ]);
    }

    public function search(Request $request)
    {
        $s = $request->get('s');

        if (!$s) {
            return [];
        }

        $categories = Category::where('title_ka', 'like', '%' . $s . '%')
            ->orWhere('title_en', 'like', '%' . $s . '%')
            ->get();
        $categories = $categories->map(function (Category $item) {
            return [
                'id' => $item->id,
                'url' => route($this->base . 'course', ['category' => $item->id]),
                'text_ka' => $item->title_ka,
                'text_en' => $item->title_en,
            ];
        });

        $courses = Course::where('name_ka', 'like', '%' . $s . '%')
            ->orWhere('name_en', 'like', '%' . $s . '%')
            ->get();
        $courses = $courses->map(function (Category $item) {
            return [
                'id' => $item->id,
                'url' => route($this->base . 'course', $item->id),
                'text_ka' => $item->name_ka,
                'text_en' => $item->name_en,
            ];
        });

        return collect($categories, $courses)->filter(function ($item, $index) {
            return $index <= 2;
        });
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
