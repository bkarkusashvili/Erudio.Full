<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Client;
use App\Models\Course;
use App\Models\Media;
use App\Models\Option;
use App\Models\Subscribe;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FrontController extends Controller
{

    public function __construct()
    {
        Inertia::share('categories', Category::all());
        Inertia::share('options', Option::all()->mapWithKeys(function (Option $option) {
            return [$option->key => $option->value];
        }));
        Inertia::share('lang', Lang::locale());
        Inertia::share('base', explode('/', request()->path())[0] == 'erudio' ? '/erudio' : '');
    }

    public function home()
    {
        return Inertia::render('Home', [
            'clients' => Client::all(),
            'trainings' => Course::where('popular_training', true)->get(),
            'courses' => Course::where('popular_course', true)->get(),
            'masterclasses' => Course::where('popular_masterclass', true)->get(),
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
                'url' => route('course', ['category' => $item->id]),
                'text_ka' => $item->title_ka,
                'text_en' => $item->title_en,
            ];
        });

        $courses = Course::where('name_ka', 'like', '%' . $s . '%')
            ->orWhere('name_en', 'like', '%' . $s . '%')
            ->get();
        $courses = $courses->map(function (Course $item) {
            return [
                'id' => $item->id,
                'url' => route('course.single', $item->id),
                'text_ka' => $item->name_ka,
                'text_en' => $item->name_en,
            ];
        });

        return collect($categories, $courses)->filter(function ($item, $index) {
            return $index <= 2;
        });
    }

    public function subscribe(Request $request)
    {

        $response = [
            'success' => false,
            'message' => 'თქვენი ელ-ფოსტა წარმატებით დაემატა გამომწერთა სიაში',
        ];
        $validator = Validator::make($request->all(), ['email' => 'required|email|unique:subscribes']);

        if ($validator->fails()) {
            $response['message'] = $validator->errors()->get('email')[0];
        } else {
            Subscribe::create(['email' => $request->get('email')]);

            $response['success'] = true;
        }

        return $response;
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
