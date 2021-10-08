<?php

use App\Http\Controllers\FrontController;
use Illuminate\Foundation\Application;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [FrontController::class, 'home'])->name('home');

Route::get('/about', [FrontController::class, 'about'])->name('about');
Route::get('/team', [FrontController::class, 'team'])->name('team');
Route::get('/social', [FrontController::class, 'social'])->name('social');
Route::get('/media', [FrontController::class, 'media'])->name('media');
Route::get('/media-single', [FrontController::class, 'mediaSingle'])->name('media.single');

Route::get('/category', [FrontController::class, 'category'])->name('category');
Route::get('/category-single', [FrontController::class, 'categorySingle'])->name('category.single');

Route::get('/course', [FrontController::class, 'course'])->name('course');
Route::get('/course/1', [FrontController::class, 'CourseSingle'])->name('course.single');
Route::get('/contact', [FrontController::class, 'contact'])->name('contact');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
