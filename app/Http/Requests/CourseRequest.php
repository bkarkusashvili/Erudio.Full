<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
            'address_ka' => 'required|string',
            'address_en' => 'nullable|string',
            'goal_ka' => 'required|string',
            'goal_en' => 'nullable|string',
            'goal_ka' => 'required|string',
            'goal_en' => 'nullable|string',
            'methodology_ka' => 'required|string',
            'methodology_en' => 'nullable|string',
            'for_ka' => 'required|string',
            'for_en' => 'nullable|string',

            'price' => 'required|integer',
            'phone' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'city_id' => 'required|integer|exists:cities,id',
            'instructor_id' => 'required|integer|exists:instructors,id',
            'image' => [
                'image',
                request()->isMethod('POST') ? 'required' : 'nullable'
            ],
        ];
    }
}
