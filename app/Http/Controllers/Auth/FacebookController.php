<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Lang;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
    const DRIVER_TYPE = 'facebook';

    public function handleRedirect()
    {
        return Socialite::driver(static::DRIVER_TYPE)->redirect();
    }

    public function handleCallback(Request $request)
    {
        $resUser = Socialite::driver(static::DRIVER_TYPE)->user();
        $user = User::where(static::DRIVER_TYPE . '_id', $resUser->id)->first();

        if (!$user) {
            $request->request->add(['email' => $resUser->email]);

            $validator = Validator::make($request->all(), [
                'email' => 'nullable|unique:users,email'
            ]);

            if ($validator->fails()) {
                $user = User::where('email', $request->email)->first();

                if ($user->hasVerifiedEmail()) {
                    return redirect()->route('login', ['lang' => Lang::locale()]);
                }
                $user->delete();
            }

            $fullname = explode(' ', $resUser->name);

            $user = User::create([
                'firstname' => array_shift($fullname),
                'lastname' => implode(' ', $fullname),
                'email' => $resUser->email,
                static::DRIVER_TYPE . '_id' => $resUser->getId()
            ]);

            $user->markEmailAsVerified();
        }

        Auth::login($user);

        return redirect()->route('profile', ['lang' => Lang::locale()]);
    }
}
