<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Client;
use App\Models\Course;
use App\Models\Invoice;
use App\Models\Media;
use App\Models\Option;
use App\Models\Page;
use App\Models\Slider;
use App\Models\Subscribe;
use App\Models\Team;
use App\Models\Translate;
use App\Models\User;
use App\Notifications\OrderNotification;
use App\Notifications\SubscribeNotification;
use App\Services\TBCPaymentService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Str;

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
            'trainings' => Course::where('popular_training', true)->where('status', 1)->get()->map(function ($course) {
                return $this->limitCourseText($course);
            }),
            'courses' => Course::where('popular_course', true)->where('status', 1)->get()->map(function ($course) {
                return $this->limitCourseText($course);
            }),
            'masterclasses' => Course::where('popular_masterclass', true)->where('status', 1)->get()->map(function ($course) {
                return $this->limitCourseText($course);
            }),
            'item' => Page::findOrFail(1),
            'slider' => Slider::where('status', 1)->get()
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

        $courses = Course::where('status', 1)
            ->where('name_ka', 'like', '%' . $s . '%')
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
            $email = $request->get('email');
            Subscribe::create(['email' => $email]);

            $response['success'] = true;

            $user = new User(['email' => $email]);
            $user->notify(new SubscribeNotification);
        }

        return $response;
    }

    public function about()
    {
        return Inertia::render('About', [
            'item' => Page::findOrFail(2),
        ]);
    }

    public function team()
    {
        return Inertia::render('About/Team', [
            'list' => Team::all()
        ]);
    }

    public function social()
    {
        return Inertia::render('About/Social', [
            'item' => Page::findOrFail(3),
        ]);
    }

    public function media()
    {
        return Inertia::render('About/Media', [
            'list' => Media::all()->map(function (Media $media) {
                $media->text_ka = Str::limit(strip_tags($media->text_ka), 220, '...');
                $media->text_en = Str::limit(strip_tags($media->text_en), 220, '...');

                return $media;
            })
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
            'courses' => $item->courses()->where('status', 1)->get()->map(function (Course $course) {
                $course->isLive = $course->isLive;

                return $course;
            }),
        ]);
    }

    public function course(Request $request)
    {
        $today = now()->setHour(0)->setMinute(0)->setSecond(0)->setMilliseconds(0);

        $type = (int) $request->input('type', -1);
        $date = $request->input('date', $today);
        $date = new Carbon($date);
        $query = Course::query()->with('lives')->where('status', 1);

        $query->when($type == -1, function ($q) {
            // $q->whereHas('lives')->orWhere('type', 0);
        });

        $query->when($type >= 0, function ($q) use ($type) {
            $q->where('type', $type);
        });

        $query->when($type == 1, function ($q) use ($date) {
            $q->whereHas('lives', function ($q) use ($date) {
                $q->whereDate('start', '>=', $date);
            });
        });

        $query->when($type == 2, function ($q) use ($date) {
            $q->whereHas('offlines', function ($q) use ($date) {
                $q->whereDate('start', '>=', $date);
            });
        });

        $query->when($request->has('category') && !!$request->input('category'), function ($q) {
            $q->where('category_id', request('category'));
        });

        $query->when($request->has('city') && !!$request->input('city'), function ($q) {
            $q->where('city_id', request('city'));
        });

        $list = $query->get();

        return Inertia::render('Course', [
            'list' => $list,
            'categories' => Category::all(),
            'cities' => City::all(),
            'types' => [
                ['title_ka' => 'Online ტრენინგი', 'title_en' => 'Online Training', 'value' => 1],
                ['title_ka' => 'Offline ტრენინგი', 'title_en' => 'Offline Training', 'value' => 2],
                ['title_ka' => 'მასტერკლასი', 'title_en' => 'Masterclass', 'value' => 0],
            ]
        ]);
    }

    public function courseSingle(string $lang, int $id)
    {
        $item = Course::with('instructor', 'instructorTwo', 'lives', 'videos', 'offlines')->findOrFail($id);
        $item->isLive = $item->isLive;

        $user = auth()->user();
        if ($user) {
            $item->hasCourse = $user->hasCourse($item);
        }

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
            'list' => auth()->user()->orders()->with('course')->where('status', 1)->get(),
        ]);
    }

    public function settings()
    {
        return Inertia::render('Auth/Settings', []);
    }

    public function terms()
    {
        return Inertia::render('Terms', [
            'item' => Page::find(4)
        ]);
    }

    public function updatePassword()
    {
        return Inertia::render('Auth/Settings', []);
    }

    public function pay(Request $request)
    {
        $courseId = $request->get('courseId');
        // $request->input('courseId');

        $course = Course::findOrFail($courseId);

        if ($course->isFree) {
            $user = auth()->user();
            $course->orders()->create([
                'user_id' => $user->id,
                'userName' => $user->firstname . ' ' . $user->lastname,
                'amount' => $course->price,
                'status' => 1
            ]);

            return response()->json([
                'data' => null,
                'success' => true,
            ]);
        } else {
            $payment = app(TBCPaymentService::class);
            $response = $payment->pay();

            if ($response->ok()) {
                $body = json_decode($response->body());
                $redirectUrl = $body->links[1]->uri;

                return response()->json([
                    'data' => $redirectUrl,
                    'success' => true,
                ]);
            }
        }
    }

    public function payInvoice(Request $request)
    {
        $courseId = $request->get('courseId');
        // $request->input('courseId');

        $course = Course::findOrFail($courseId);

        $data = $request->validate([
            'fullname' => 'required|string',
            'fullname_latin' => 'required|string',
            'email' => 'required|string|email',
            'company_name' => 'required|string',
            'company_number' => 'required|integer',
            'position' => 'required|string',
            'phone' => 'required|string',
            'from' => 'required|string',
        ]);
        // liveCourseId: liveCourse,

        Invoice::create(array_merge(
            $data,
            [
                'status' => $course->isFree,
                'course_id' => $course->id
            ],
        ));

        $user = new User(['email' => $request->get('email')]);
        $user->notify(new OrderNotification);

        return redirect()->back();
    }

    public function payCheck(Request $request)
    {
        $payId = $request->get('PaymentId');

        $payment = app(TBCPaymentService::class);

        $payment->checkStatus($payId);
    }

    private function limitCourseText(Course $course)
    {
        $course->text_ka = Str::words(strip_tags($course->text_ka), 30, '');
        $course->text_en = Str::words(strip_tags($course->text_en), 30, '');

        return $course;
    }
}
