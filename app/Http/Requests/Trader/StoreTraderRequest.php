<?php

namespace App\Http\Requests\Trader;

use Illuminate\Foundation\Http\FormRequest;

class StoreTraderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name_kana' => 'required|string|max:30',
            'name' => 'required|string|max:30',
            'fax' => 'nullable|numeric',
            'phone' => 'nullable|numeric',
            'postalcode' => 'nullable|string|max:8',
            'prefecture' => 'nullable|string|max:30',
            'city' => 'nullable|string|max:30',
            'area' => 'nullable|string|max:30',
            'street' => 'nullable|string|max:50',
        ];
    }
}
