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
        $tQuery = Course::where('status', 1)->where('popular_training', true)->where(function ($q) {
            $q->whereHas('lives');
            $q->orWhereHas('offlines');
            $q->orWhereHas('videos');
        });
        $cQuery = Course::where('status', 1)->where('popular_course', true)->where(function ($q) {
            $q->whereHas('lives');
            $q->orWhereHas('offlines');
            $q->orWhereHas('videos');
        });
        $mQuery = Course::where('status', 1)->where('popular_masterclass', true)->where(function ($q) {
            $q->whereHas('lives');
            $q->orWhereHas('offlines');
            $q->orWhereHas('videos');
        });

        $trainings = $this->sortByDrag($tQuery, Course::class)->get();
        $courses = $this->sortByDrag($cQuery, Course::class)->get();
        $masterclasses = $this->sortByDrag($mQuery, Course::class)->get();

        return Inertia::render('Home', [
            'clients' => $this->sortByDrag(Client::query(), Client::class)->get(),
            'trainings' => $this->mapCourses($trainings),
            'courses' => $this->mapCourses($courses),
            'masterclasses' => $this->mapCourses($masterclasses),
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

        $query = Course::where('status', 1)
            ->where(function ($q) {
                $q->whereHas('lives');
                $q->orWhereHas('offlines');
                $q->orWhereHas('videos');
            })
            ->where(function ($q) use ($s) {
                $q->where('name_ka', 'like', '%' . $s . '%');
                $q->orWhere('name_en', 'like', '%' . $s . '%');
            });

        $courses = $this->mapCourses($this->sortByDrag($query, Course::class)->get());
        $courses = $courses->map(function (Course $item) {
            return [
                'id' => $item->id,
                'url' => route('course.single', ['id' => $item->type_id, 'lang' => app()->getLocale(), 'type' => $item->type]),
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

        $courses = $this->getAllTypeCourse($id, false);

        return Inertia::render('Category/CategorySingle', [
            'item' => $item,
            'courses' => $courses,
        ]);
    }

    public function course(Request $request)
    {
        $type = $request->input('type', -1);
        $type = $type == '' ? -1 : (int) $type;
        $date = $request->input('date');
        if ($date) {
            $date = new Carbon($date);
        }

        $list = $this->getAllTypeCourse(
            $request->has('category') && !!$request->input('category'),
            $request->has('city') && !!$request->input('city'),
            $type,
            $date
        );

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
        $url = null;
        if ($type == 'online') {
            $course = LiveCourse::findOrFail($id);
            $id = $course->course_id;
            $url = $course->url;
        } else if ($type == 'offline') {
            $course = OfflineCourse::findOrFail($id);
            $id = $course->course_id;
        } else if ($type == 'masterclass') {
            $course = Course::findOrFail($id);
            $id = $course->id;
        } else {
            return;
        }

        $course_type_status = $course->course_status;
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
            ->when($type == 'masterclass', function (Builder $q) use ($type, $type_id, $user) {
                $q
                    ->select(
                        'courses.*',
                        DB::raw('null as start_date'),
                        DB::raw('null as end_date'),
                        'courses.id as type_id',
                    );

                if ($user && $user->hasCourse($type, $type_id)) {
                    $q->with('videos');
                }
            })
            ->findOrFail($id);
        $item->type_status = $course_type_status;
        $item->can_buy_course = $can_buy;
        if ($user) {
            $item->hasCourse = $user->hasCourse($type, $type_id);

            if ($item->hasCourse) {
                $item->url = $url;
            }
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
        $list = auth()->user()->orders()->where('status', 1)->get()->map(function (Order $order) {
            $order->course_name = $order->course_name;

            return $order;
        });

        return Inertia::render('Auth/Profile', [
            'list' => $list,
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
        $courseType = $request->get('courseType');
        $payType = $request->get('payType', 'card');

        $course = null;
        $baseCourse = null;

        if ($courseType == 'online') {
            $course = LiveCourse::findOrFail($courseId);
            $course->isFree = $course->course->is_free;
            $baseCourse = $course->course;
        } else if ($courseType == 'offline') {
            $course = OfflineCourse::findOrFail($courseId);
            $course->isFree = $course->course->is_free;
            $baseCourse = $course->course;
        } else if ($courseType == 'masterclass') {
            $course = Course::findOrFail($courseId);
            $course->can_buy = true;
            $baseCourse = $course;
        } else {
            return;
        }

        $user = auth()->user();

        if (!$course->can_buy || $user->hasCourse($courseType, $courseId)) {
            return;
        }

        if ($course->isFree || env('APP_ENV') == 'local') {
            Order::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
                'course_type' => $courseType,
                'userName' => $user->firstname . ' ' . $user->lastname,
                'amount' => $baseCourse->price,
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
            $response = $payment->pay($baseCourse, $payType, $courseId, $courseType);

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

        $invoice = Invoice::create(array_merge(
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
        $user->notify(new OrderNotification('online', 'invoice', true, $invoice));

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

    private function getAllTypeCourse($category_id = false, $city_id = false, $type = -1, $date = false)
    {
        $query = Course::query();

        $query->select(
            'courses.*',
            DB::raw('null as start_date'),
            DB::raw('null as end_date'),
            'courses.id as type_id',
        )
            ->whereHas('videos')
            ->when($category_id, function ($q) use ($category_id) {
                $q->where('category_id', $category_id);
            })
            ->when($city_id, function ($q) use ($city_id) {
                $q->where('city_id', $city_id);
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
            ->when($category_id, function ($q) use ($category_id) {
                $q->where('category_id', $category_id);
            })
            ->when($city_id, function ($q) use ($city_id) {
                $q->where('city_id', $city_id);
            })
            ->where('status', 1)
            ->when($type >= 0, function ($q) use ($type) {
                $q->where('type', $type);
            })
            ->when($type == 1 || $type == 2, function ($q) use ($date) {
                if ($date) {
                    $q->whereDate('start', '>=', $date);
                }
            });

        $online = Course::select(
            'courses.*',
            'live_courses.start as start_date',
            'live_courses.end as end_date',
            'live_courses.id as type_id',
        )
            ->rightJoin('live_courses', 'courses.id', '=', 'live_courses.course_id')
            ->when($category_id, function ($q) use ($category_id) {
                $q->where('category_id', $category_id);
            })
            ->when($city_id, function ($q) use ($city_id) {
                $q->where('city_id', $city_id);
            })
            ->where('status', 1)
            ->when($type >= 0, function ($q) use ($type) {
                $q->where('type', $type);
            })
            ->when($type == 1 || $type == 2, function ($q) use ($date) {
                if ($date) {
                    $q->whereDate('start', '>=', $date);
                }
            });


        $query->union($offline)->union($online);

        return $this->sortByDrag($query, Course::class)->get();
    }

    private function mapCourses($courses)
    {
        return $courses->map(function ($course) {
            if ($course->type == 'masterclass') {
                $course->type_id = $course->id;
            } else if ($course->type == 'online') {
                $active = $course->lives()->where('start', '>', now())->orderBy('start')->first();
                $prev = $course->lives()->where('start', '<=', now())->orderBy('start')->first();
                $course->type_id = $active ? $active->id : $prev->id;
            } else if ($course->type == 'offline') {
                $active = $course->offlines()->where('start', '>', now())->orderBy('start')->first();
                $prev = $course->offlines()->where('start', '<=', now())->orderBy('start')->first();
                $course->type_id = $active ? $active->id : $prev->id;
            }

            return $this->limitCourseText($course);
        });
    }
}
