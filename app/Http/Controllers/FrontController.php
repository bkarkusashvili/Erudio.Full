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

    public function team()
    {
        return Inertia::render('About/Team', []);
    }

    public function social()
    {
        return Inertia::render('About/Social', []);
    }

    public function media()
    {
        return Inertia::render('About/Media', []);
    }

    public function mediaSingle()
    {
        return Inertia::render('About/MediaSingle', []);
    }

    public function category()
    {
        return Inertia::render('Category', []);
    }

    public function categorySingle()
    {
        return Inertia::render('Category/CategorySingle', []);
    }

    public function course()
    {
        return Inertia::render('Course', []);
    }

    public function courseSingle()
    {
        return Inertia::render('Course/CourseSingle', []);
    }

    public function contact()
    {
        return Inertia::render('Contact', []);
    }
}
