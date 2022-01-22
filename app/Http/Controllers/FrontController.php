<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Client;
use App\Models\Course;
use App\Models\Invoice;
use App\Models\LiveCourse;
use App\Models\Media;
use App\Models\OfflineCourse;
use App\Models\Option;
use App\Models\Order;
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
use DB;
use Hash;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Str;

class FrontController extends Controller
{
    public function __construct()
    {
        $lang = Lang::locale();

        Inertia::share('categories', $this->sortByDrag(Category::query(), Category::class)->get());
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
            'clients' => $this->sortByDrag(Client::query(), Client::class)->get(),
            'trainings' => $this->sortByDrag(Course::query(), Course::class)->where('popular_training', true)->where('status', 1)->get()->map(function ($course) {
                return $this->limitCourseText($course);
            }),
            'courses' => $this->sortByDrag(Course::query(), Course::class)->where('popular_course', true)->where('status', 1)->get()->map(function ($course) {
                return $this->limitCourseText($course);
            }),
            'masterclasses' => $this->sortByDrag(Course::query(), Course::class)->where('popular_masterclass', true)->where('status', 1)->get()->map(function ($course) {
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

        $categories = $this->sortByDrag(Category::query(), Category::class)->where('title_ka', 'like', '%' . $s . '%')
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

        $courses = $this->sortByDrag(Course::query(), Course::class)->where('status', 1)
            ->where('name_ka', 'like', '%' . $s . '%')
            ->orWhere('name_en', 'like', '%' . $s . '%')
            ->get();
        $courses = $courses->map(function (Course $item) {
            return [
                'id' => $item->id,
                'url' => route('course.single', ['id' => $item->id, 'lang' => app()->getLocale(), 'type' => $item->type]),
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
            'list' => $this->sortByDrag(Team::query(), Team::class)->get()
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
            'list' => $this->sortByDrag(Media::query(), Media::class)->get()->map(function (Media $media) {
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
            'list' => $this->sortByDrag(Category::query(), Category::class)->get()
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

        $type = $request->input('type', -1);
        $type = $type == '' ? -1 : (int) $type;
        $date = $request->input('date');
        if ($date) {
            $date = new Carbon($date);
        }
        $query = Course::query();

        $query->select(
            'courses.*',
            DB::raw('null as start_date'),
            DB::raw('null as end_date'),
            'courses.id as type_id',
        )
            ->whereHas('videos')
            ->when($request->has('category') && !!$request->input('category'), function ($q) {
                $q->where('category_id', request('category'));
            })
            ->when($request->has('city') && !!$request->input('city'), function ($q) {
                $q->where('city_id', request('city'));
            })
            ->where('status', 1)
            ->when($type >= 0, function ($q) use ($type) {
                $q->where('type', $type);
            });

        $offline = Course::select(
            'courses.*',
            'offline_courses.start as start_date',
            'offline_courses.end as end_date',
            'offline_courses.id as type_id',
        )
            ->rightJoin('offline_courses', 'courses.id', '=', 'offline_courses.course_id')
            ->when($request->has('category') && !!$request->input('category'), function ($q) {
                $q->where('category_id', request('category'));
            })
            ->when($request->has('city') && !!$request->input('city'), function ($q) {
                $q->where('city_id', request('city'));
            })
            ->where('status', 1)
            ->when($type >= 0, function ($q) use ($type) {
                $q->where('type', $type);
            })
            ->when($type == 1 || $type == 2, function ($q) use ($date) {
                if ($date) {
                    $q->whereDate('start_date', '>=', $date);
                }
            });

        $online = Course::select(
            'courses.*',
            'live_courses.start as start_date',
            'live_courses.end as end_date',
            'live_courses.id as type_id',
        )
            ->rightJoin('live_courses', 'courses.id', '=', 'live_courses.course_id')
            ->when($request->has('category') && !!$request->input('category'), function ($q) {
                $q->where('category_id', request('category'));
            })
            ->when($request->has('city') && !!$request->input('city'), function ($q) {
                $q->where('city_id', request('city'));
            })
            ->where('status', 1)
            ->when($type >= 0, function ($q) use ($type) {
                $q->where('type', $type);
            })
            ->when($type == 1 || $type == 2, function ($q) use ($date) {
                if ($date) {
                    $q->whereDate('start_date', '>=', $date);
                }
            });

        $query->union($offline)->union($online);

        $list = $this->sortByDrag($query, Course::class)->get();

        return Inertia::render('Course', [
            'list' => $list,
            'categories' => $this->sortByDrag(Category::query(), Category::class)->get(),
            'cities' => $this->sortByDrag(City::query(), City::class)->get(),
            'types' => [
                ['title_ka' => 'Online ტრენინგი', 'title_en' => 'Online Training', 'value' => 1],
                ['title_ka' => 'Offline ტრენინგი', 'title_en' => 'Offline Training', 'value' => 2],
                ['title_ka' => 'მასტერკლასი', 'title_en' => 'Masterclass', 'value' => 0],
            ]
        ]);
    }

    public function courseSingle(string $lang, string $type, int $id)
    {
        $type_id = $id;
        $course_type_status = null;
        $can_buy = true;
        if ($type == 'online') {
            $course = LiveCourse::findOrFail($id);
            $id = $course->course_id;
        } else if ($type == 'offline') {
            $course = OfflineCourse::findOrFail($id);
            $id = $course->course_id;
        } else if ($type == 'masterclass') {
            $course = Course::findOrFail($id);
            $id = $course->id;
        } else {
            return;
        }

        $course_type_status = $course->status;
        $can_buy = $course->can_buy;

        $user = auth()->user();

        $item = Course::with('instructor', 'instructorTwo')
            ->when($type == 'online', function (Builder $q) use ($type_id) {
                $q
                    ->leftJoin('live_courses', 'courses.id', '=', 'live_courses.course_id')
                    ->where('live_courses.id', $type_id)
                    ->select(
                        'courses.*',
                        'live_courses.start as start_date',
                        'live_courses.end as end_date',
                        'live_courses.id as type_id',
                    );
            })
            ->when($type == 'offline', function (Builder $q) use ($type_id) {
                $q
                    ->leftJoin('offline_courses', 'courses.id', '=', 'offline_courses.course_id')
                    ->where('offline_courses.id', $type_id)
                    ->select(
                        'courses.*',
                        'offline_courses.start as start_date',
                        'offline_courses.end as end_date',
                        'offline_courses.id as type_id',
                    );
            })
            ->when($type == 'masterclass', function (Builder $q) use ($type, $type_id) {
                $q
                    ->select(
                        'courses.*',
                        DB::raw('null as start_date'),
                        DB::raw('null as end_date'),
                        'courses.id as type_id',
                    );

                if (auth()->user()->hasCourse($type, $type_id)) {
                    $q->with('videos');
                }
            })
            ->findOrFail($id);
        $item->type_status = $course_type_status;
        $item->can_buy = $can_buy;
        if ($user) {
            $item->hasCourse = $user->hasCourse($type, $type_id);
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
        return Inertia::render('Auth/Settings', [
            'hasPassword' => auth()->user()->hasPassword
        ]);
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
        $coursType = $request->get('courseType');
        $payType = $request->get('payType', 'card');

        $course = null;

        if ($coursType == 'online') {
            $course = LiveCourse::findOrFail($courseId);
            $course->isFree = $course->course->is_free;
        } else if ($coursType == 'offline') {
            $course = OfflineCourse::findOrFail($courseId);
            $course->isFree = $course->course->is_free;
        } else if ($coursType == 'masterclass') {
            $course = Course::findOrFail($courseId);
            $course->can_buy = true;
        } else {
            return;
        }

        $user = auth()->user();

        if (!$course->can_buy || $user->hasCourse($coursType, $courseId)) {
            return;
        }

        if ($course->isFree) {
            Order::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
                'course_type' => $coursType,
                'userName' => $user->firstname . ' ' . $user->lastname,
                'amount' => $course->price,
                'status' => 1
            ]);

            $user = new User(['email' => auth()->user()->email]);
            $user->notify(new OrderNotification(Course::getCourseType($course->type), 'card'));

            return response()->json([
                'data' => null,
                'success' => true,
            ]);
        } else {
            $payment = app(TBCPaymentService::class);
            $response = $payment->pay($course, $payType);

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

        $email = Option::where('key', 'email')->first();
        $email = $email ? $email->value : 'info@erudio.ge';

        Invoice::create(array_merge(
            $data,
            [
                'status' => $course->isFree,
                'course_id' => $course->id
            ],
        ));

        $user = new User(['email' => $request->get('email')]);
        $user->notify(new OrderNotification('online', 'invoice'));

        $user = new User(['email' => auth()->user()->email]);
        $user->notify(new OrderNotification('online', 'invoice'));

        $user = new User(['email' => $email]);
        $user->notify(new OrderNotification('online', 'invoice', true));

        return redirect()->back();
    }

    public function payCheck(Request $request)
    {
        $payId = $request->get('PaymentId');

        $payment = app(TBCPaymentService::class);

        $payment->checkStatus($payId);
    }

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'terms' => 'required|accepted'
        ]);

        auth()->user()->delete();

        return redirect()->route('home', ['lang' => Lang::locale()]);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $requiredCurrentPassword = $user->has_password && ($request->password || $request->email != $user->email) ? 'required' : 'nullable';

        $data = $request->validate([
            'phone' => 'required|string|regex:/^5(?:[0-9][ -]*){8}$/',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', Rules\Password::defaults(), 'min:8', 'confirmed'],
            'current_password' => [$requiredCurrentPassword, function ($attribute, $value, $fail) use ($user) {
                if (!\Hash::check($value, $user->password)) {
                    return $fail(__('პაროლი არასწორია.'));
                }
            }],
        ]);

        $data['phone'] = str_replace([' ', '-'], ['', '',], $request->phone);

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return Redirect::back();
    }

    private function limitCourseText(Course $course)
    {
        $course->text_ka = Str::words(strip_tags($course->text_ka), 30, '');
        $course->text_en = Str::words(strip_tags($course->text_en), 30, '');

        return $course;
    }
}
