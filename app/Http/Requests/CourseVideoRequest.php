<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseVideoRequest extends FormRequest
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
            'name_ka' => 'required|string',
            'name_en' => 'nullable|string',

            'number' => 'required|integer|min:1',
            'course_id' => 'required|integer|exists:courses,id',
            'video' => 'required|string|url',
            'created_at' => [
                'date',
                request()->isMethod('PUT') ? 'required' : 'nullable'
            ],
            'image' => [
                'image',
                request()->isMethod('POST') ? 'required' : 'nullable'
            ],
        ];
    }
}
