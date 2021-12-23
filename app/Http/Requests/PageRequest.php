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
        $rules = [];

        if ($id == 1) {
            $rules = [
                'body.text_ka' => 'required|string',
                'body.text_en' => 'nullable|string',
                'body.file' => [
                    'file',
                    request()->isMethod('POST') ? 'required' : 'nullable'
                ],
            ];
        }

        if ($id == 2) {
            $rules = [
                'body.title_ka' => 'required|string',
                'body.title_en' => 'nullable|string',
                'body.text_ka' => 'required|string',
                'body.text_en' => 'nullable|string',
                'body.video' => 'file|nullable',
                'body.image' => [
                    'image',
                    request()->isMethod('POST') ? 'required' : 'nullable'
                ],
            ];
        }

        if ($id == 3) {
            $rules = [
                'body.title_ka' => 'nullable|string',
                'body.title_en' => 'nullable|string',
                'body.text_ka' => 'nullable|string',
                'body.text_en' => 'nullable|string',

                'body.image' => [
                    'image',
                    request()->isMethod('POST') ? 'required' : 'nullable'
                ],
            ];
        }

        if ($id == 4) {
            $rules = [
                'body.text_ka' => 'required|string',
                'body.text_en' => 'nullable|string',
            ];
        }

        return $rules;
    }
}
