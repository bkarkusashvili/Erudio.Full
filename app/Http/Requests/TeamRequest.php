<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamRequest extends FormRequest
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
            'profession_ka' => 'required|string',
            'profession_en' => 'nullable|string',
            'bio_ka' => 'required|string',
            'bio_en' => 'nullable|string',
            'image' => [
                'image',
                request()->isMethod('POST') ? 'required' : 'nullable'
            ],
        ];
    }
}
