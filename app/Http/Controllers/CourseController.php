<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends AdminController
{
    public $model = Course::class;
    public $columns = [
        ['field' => 'id', 'headerName' => 'ID'],
        ['field' => 'name', 'headerName' => 'სახელი'],
        ['field' => 'days', 'headerName' => 'დღეები'],
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     $items = Course::all();

    //     return Inertia::render('Admin/List', [
    //         'rows' => $items,
    //         'columns' => [
    //             ['field' => 'id', 'headerName' => 'ID'],
    //             ['field' => 'name', 'headerName' => 'სახელი'],
    //             ['field' => 'days', 'headerName' => 'დღეები'],
    //         ]
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\Models\Course  $course
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(Course $course)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\Course  $course
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(Course $course)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  \App\Models\Course  $course
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, Course $course)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  \App\Models\Course  $course
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy(Course $course)
    // {
    //     //
    // }
}
