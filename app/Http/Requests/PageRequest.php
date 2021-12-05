<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
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
        $id = (int) request()->route('page');
        $rules = ['title' => 'required|string'];

        if ($id == 2) {
            $rules = [
                'metas.title_ka' => 'required|string',
                'metas.title_en' => 'nullable|string',
                'metas.text_ka' => 'required|string',
                'metas.text_en' => 'nullable|string',
                'metas.image' => [
                    'image',
                    request()->isMethod('POST') ? 'required' : 'nullable'
                ],
            ];
        }

        return $rules;
    }
}
