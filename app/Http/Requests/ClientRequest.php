<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
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
            'title_ka' => 'required|string',
            'title_en' => 'nullable|string',
            'text_ka' => 'required|string',
            'text_en' => 'nullable|string',
            'image' => [
                'image',
                request()->isMethod('POST') ? 'required' : 'nullable'
            ],
        ];
    }
}
