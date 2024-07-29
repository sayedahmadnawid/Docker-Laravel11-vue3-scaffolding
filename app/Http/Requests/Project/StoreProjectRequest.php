<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'code' => 'required|string|max:12',
            'temporary_name' => 'required|string|max:30',
            'confirmed_name' => 'required|string|max:30',
            'short_name' => 'required|string|max:30',
            'type' => 'required|string|max:20',
            'nature' => 'required|string|max:20',
            'start_date' => 'required|date',
            'complete_date' => 'required|date',
        ];
    }
}
