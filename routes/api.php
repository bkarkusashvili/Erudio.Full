<?php

use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/search', [FrontController::class, 'search'])->name('search');
Route::get('/subscribe', [FrontController::class, 'subscribe'])->name('add.subscribe');
Route::get('/pay/check', [FrontController::class, 'payCheck'])->name('pay.check');
