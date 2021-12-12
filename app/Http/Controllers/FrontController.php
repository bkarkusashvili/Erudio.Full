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
use App\Models\Translate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FrontController extends Controller
{

    public function __construct()
    {
        $lang = Lang::locale();

        Inertia::share('categories', Category::all());
        Inertia::share('options', Option::all()->mapWithKeys(function (Option $option) {
            return [$option->key => $option->value];
        }));
        Inertia::share('translate', Translate::all()->mapWithKeys(function (Translate $option) use ($lang) {
            return [$option->key => $option->$lang];
        }));
        Inertia::share('lang', $lang);
        Inertia::share('base', '');
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
                'url' => route('course', ['category' => $item->id, 'lang' => app()->getLocale()]),
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
                'url' => route('course.single', [$item->id, 'lang' => app()->getLocale()]),
                'text_ka' => $item->name_ka,
                'text_en' => $item->name_en,
            ];
        });

        return collect($categories)->merge($courses)->filter(function ($item, $index) {
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

    public function mediaSingle(string $lang, int $id)
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

    public function categorySingle(string $lang, int $id)
    {
        $item = Category::findOrFail($id);

        return Inertia::render('Category/CategorySingle', [
            'item' => $item,
            'courses' => $item->courses->map(function (Course $course) {
                $course->isLive = $course->isLive;

                return $course;
            }),
        ]);
    }

    public function course(Request $request)
    {
        $today = now()->setHour(0)->setMinute(0)->setSecond(0)->setMilliseconds(0);

        $type = (int) $request->input('type', 1);
        $date = $request->input('date', $today);
        $date = new Carbon($date);
        $query = Course::query()->where('type', $type)->with('lives');

        $query->when($type == 1, function ($q) use ($date) {
            $q->whereHas('lives', function ($q) use ($date) {
                $q->whereDate('start', '>=', $date);
            });
        });

        $query->when($request->has('category'), function ($q) {
            $q->where('category_id', request('category'));
        });

        $query->when($request->has('city'), function ($q) {
            $q->where('city_id', request('city'));
        });

        $list = $query->get();

        return Inertia::render('Course', [
            'list' => $list,
            'categories' => Category::all(),
            'cities' => City::all(),
        ]);
    }

    public function courseSingle(string $lang, int $id)
    {
        $item = Course::with('instructor', 'lives', 'videos')->findOrFail($id);
        $item->isLive = $item->isLive;

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
        return Inertia::render('Auth/Profile', [
            'item' => Course::find(2),
        ]);
    }

    public function settings()
    {
        return Inertia::render('Auth/Settings', []);
    }

    public function terms()
    {
        return Inertia::render('Terms', []);
    }

    public function updatePassword()
    {
        return Inertia::render('Auth/Settings', []);
    }
}
