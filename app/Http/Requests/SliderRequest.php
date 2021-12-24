<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SliderRequest extends FormRequest
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
            'title' => 'required|string',
            'status' => 'nullable|boolean',
            'created_at' => [
                'date',
                request()->isMethod('PUT') ? 'required' : 'nullable'
            ],
            'image' => [
                'image',
                request()->isMethod('POST') ? 'required' : 'nullable'
            ],
            'video' => 'nullable'
        ];
    }
}
