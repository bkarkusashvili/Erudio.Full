<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Option;
use App\Models\Translate;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
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
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return Inertia::render('Auth/Register', [
            'metas' => [
                'title' => $this->translate['registration'],
                'text' => $this->baseText[$this->lang],
                'image' => "/",
                'url' => route('register', ['lang' => $this->lang]),
            ]
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'required|string|regex:/^(?:[0-9][ -]*){8}$/',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults(), 'min:8'],
            'terms' => 'required|accepted'
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'phone' => '5' . str_replace([' ', '-'], ['', '',], $request->phone),
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        $path = route('profile', ['lang' => Lang::locale()]);

        return redirect($path);
    }
}
