<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CityRequest extends FormRequest
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
            'created_at' => [
                'date',
                request()->isMethod('PUT') ? 'required' : 'nullable'
            ],
        ];
    }
}
