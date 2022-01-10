<?php

namespace App\Exceptions;

use App\Models\Category;
use App\Models\Option;
use App\Models\Translate;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Lang;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    // public function __construct()
    // {
    //     $lang = Lang::locale();

    //     Inertia::share('categories', Category::all());
    //     Inertia::share('options', Option::all()->mapWithKeys(function (Option $option) {
    //         return [$option->key => $option->value];
    //     }));
    //     Inertia::share('translate', Translate::all()->mapWithKeys(function (Translate $option) use ($lang) {
    //         return [$option->key => $option->$lang];
    //     }));
    //     Inertia::share('lang', $lang);
    //     Inertia::share('base', '');
    // }

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    // public function render($request, NotFoundHttpException $exception)
    // {
    //     return Inertia::renderErrorResponse(
    //         'Error',
    //         parent::render($request, $exception),
    //         [404]
    //     );
    // }

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
