<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LiveCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'url' => 'required|string|url',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'course_id' => 'required|integer|exists:courses,id',
        ];
    }
}
