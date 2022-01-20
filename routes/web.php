<?php

use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\FacebookController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseVideoController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LiveCourseController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\OfflineCourseController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TranslateController;
use App\Http\Controllers\UserController;
use App\Notifications\OrderNotification;
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

Route::redirect('/', '/ka');
Route::redirect('/login', '/ka/login');

Route::group(['prefix' => '{lang?}', 'where' => ['lang' => 'en|ka']], function () {
    $lang = request()->segment(1);

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
    Route::get('/course/{type}/{id}', [FrontController::class, 'CourseSingle'])->name('course.single');
    Route::get('/contact', [FrontController::class, 'contact'])->name('contact');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [FrontController::class, 'profile'])->name('profile');
        Route::get('/settings', [FrontController::class, 'settings'])->name('settings');
    });

    Route::get('/terms', [FrontController::class, 'terms'])->name('terms');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    require __DIR__ . '/auth.php';
});

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.update');

Route::post('/pay', [FrontController::class, 'pay'])->middleware('auth')->name('pay');
Route::post('/pay-invoice', [FrontController::class, 'payInvoice'])->middleware('auth')->name('pay.invoice');

Route::post('/update-profile', [FrontController::class, 'updateProfile'])->middleware('auth')->name('update.profile');
Route::delete('/delete-account', [FrontController::class, 'deleteAccount'])->middleware('auth')->name('deleteAccount');

$adminResources = [
    'course' => CourseController::class,
    'livecourse' => LiveCourseController::class,
    'offlinecourse' => OfflineCourseController::class,
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
    'translate' => TranslateController::class,
    'order' => OrderController::class,
    'invoice' => InvoiceController::class,
    'user' => UserController::class,
    'client' => ClientController::class,
];

Route::middleware('admin')->prefix('admin')->group(function () use ($adminResources) {
    collect($adminResources)->each(function ($item, $key) {
        Route::get($key . '/export', [$item, 'export'])->name($key . '.export');
        Route::post($key . '/column/{id}/{column}/{value}', [$item, 'column'])->name($key . '.column');
        Route::post($key . '/updateRow', [$item, 'updateRow'])->name($key . '.updateRow');
    });

    Route::resources($adminResources);
    Route::post('course/deleteFile/{id}', [CourseController::class, 'deleteFile'])->name('course.deleteFile');
    Route::post('page/deleteFile/{id}', [PageController::class, 'deleteFile'])->name('page.deleteFile');
    Route::post('slider/deleteFile/{id}', [SliderController::class, 'deleteFile'])->name('slider.deleteFile');

    Route::get('/', function () {
        return redirect()->route('course.index');
    });
    Route::any('{query}', function () {
        return redirect()->route('course.index');
    })->where('query', '.*');
});

Route::get('/auth/facebook/redirect', [FacebookController::class, 'handleRedirect'])->name('auth.facebook');
Route::get('/auth/facebook/callback', [FacebookController::class, 'handleCallback']);

Route::get('/auth/google/redirect', [GoogleController::class, 'handleRedirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleController::class, 'handleCallback']);


Route::get('/demo', function () {
    $message = (new OrderNotification())->toMail('example@gmail.com');
    $markdown = new \Illuminate\Mail\Markdown(view(), config('mail.markdown'));

    return $markdown->render('vendor.notifications.email', $message->data());
});
