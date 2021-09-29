<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', []);
    }

    public function about()
    {
        return Inertia::render('About', []);
    }

    public function categories()
    {
        return Inertia::render('Categories', []);
    }

    public function courses()
    {
        return Inertia::render('Courses', []);
    }

    public function contact()
    {
        return Inertia::render('Contact', []);
    }
}
