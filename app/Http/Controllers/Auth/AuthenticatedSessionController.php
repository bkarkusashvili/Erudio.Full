<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Category;
use App\Models\Option;
use App\Models\Translate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    private $baseText = [
        'ka' => 'erudio წარმოადგენს აუდიტორული და საკონსულტაციო კომპანია Loialté-ს საგანმანათლებლო მიმართულებას და გთავაზობთ პროფესიული ტრენინგების მრავალფეროვან ჩამონათვალს.',
        'en' => 'erudio is the educational direction of the audit and consulting company Loialté and offers a diverse list of professional trainings.',
    ];
    private $lang;
    private $translate;

    public function __construct()
    {
        $lang = Lang::locale();
        $this->lang = $lang;
        $this->translate = Translate::all()->mapWithKeys(function (Translate $option) use ($lang) {
            return [$option->key => $option->$lang];
        });

        Inertia::share('categories', $this->sortByDrag(Category::query(), Category::class)->get());
        Inertia::share('lang', $lang);
        Inertia::share('translate', $this->translate);
        Inertia::share('options', Option::all()->mapWithKeys(function (Option $option) {
            return [$option->key => $option->value];
        }));
        Inertia::share('base', '');
    }

    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'metas' => [
                'title' => $this->translate['login'],
                'text' => $this->baseText[$this->lang],
                'image' => "/",
                'url' => route('login', ['lang' => $this->lang]),
            ]
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $path = route('profile', ['lang' => Lang::locale()]);

        return redirect()->intended($path);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('home'));
    }
}
