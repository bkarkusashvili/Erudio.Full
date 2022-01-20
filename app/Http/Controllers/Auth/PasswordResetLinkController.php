<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Option;
use App\Models\Translate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Lang;

class PasswordResetLinkController extends Controller
{
    public function __construct()
    {
        $lang = Lang::locale();

        Inertia::share('categories', $this->sortByDrag(Category::query(), Category::class)->get());
        Inertia::share('lang', $lang);
        Inertia::share('translate', Translate::all()->mapWithKeys(function (Translate $option) use ($lang) {
            return [$option->key => $option->$lang];
        }));
        Inertia::share('options', Option::all()->mapWithKeys(function (Option $option) {
            return [$option->key => $option->value];
        }));
        Inertia::share('base', '');
    }

    /**
     * Display the password reset link request view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
