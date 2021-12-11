<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseVideoController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\LiveCourseController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Services\TBCPaymentService;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/{locale?}', function ($locale = null) {
//     if (isset($locale) && in_array($locale, config('app.available_locales'))) {
//         app()->setLocale($locale);
//     }

//     return view('welcome');
// });

$hasErudio = request()->has('erudio');
$segment = $hasErudio ? 2 : 1;
$basePath = $hasErudio ? '/erudio' : '';

Route::redirect($basePath . '/',  $basePath . '/ka');

Route::group(['prefix' => '{lang?}', 'where' => ['lang' => 'en|ka']], function () use ($segment) {
    $lang = request()->segment($segment);

    if (in_array($lang, ['en', 'ka'])) {
        app()->setLocale($lang);
    }

    Route::get('/', [FrontController::class, 'home'])->name('home');

    Route::get('/about', [FrontController::class, 'about'])->name('about');
    Route::get('/team', [FrontController::class, 'team'])->name('team');
    Route::get('/social', [FrontController::class, 'social'])->name('social');
    Route::get('/media', [FrontController::class, 'media'])->name('media');
    Route::get('/media/{id}', [FrontController::class, 'mediaSingle'])->name('media.single');

    Route::get('/category', [FrontController::class, 'category'])->name('category');
    Route::get('/category/{id}', [FrontController::class, 'categorySingle'])->name('category.single');

    Route::get('/course', [FrontController::class, 'course'])->name('course');
    Route::get('/course/{id}', [FrontController::class, 'CourseSingle'])->name('course.single');
    Route::get('/contact', [FrontController::class, 'contact'])->name('contact');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [FrontController::class, 'profile'])->name('profile');
        Route::get('/settings', [FrontController::class, 'settings'])->name('settings');
    });

    Route::get('/terms', [FrontController::class, 'terms'])->name('terms');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    require __DIR__ . '/auth.php';
});

Route::middleware('admin')->prefix('admin')->group(function () {
    Route::resources([
        'course' => CourseController::class,
        'livecourse' => LiveCourseController::class,
        'coursevideo' => CourseVideoController::class,
        'city' => CityController::class,
        'instructor' => InstructorController::class,
        'slider' => SliderController::class,
        'team' => TeamController::class,
        'media' => MediaController::class,
        'subscribe' => SubscribeController::class,
        'category' => CategoryController::class,
        'page' => PageController::class,
        'option' => OptionController::class,
        'order' => OrderController::class,
        'user' => UserController::class,
        'client' => ClientController::class,
    ]);
    Route::get('/', function () {
        return redirect()->route('course.index');
    });
    Route::any('{query}', function () {
        return redirect()->route('course.index');
    })->where('query', '.*');
});

Route::get('/pay', function () {
    $payment = app(TBCPaymentService::class);

    return $payment->pay()->json();
});
