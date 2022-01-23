<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
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
            'fullname' => 'required|string',
            'fullname_latin' => 'required|string',
            'email' => 'required|string|email',
            'company_name' => 'required|string',
            'company_number' => 'required|integer',
            'position' => 'required|string',
            'phone' => 'required|string',
            'from' => 'required|string',
            'status' => 'required|boolean',
        ];
    }
}
