<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->code,
            'temporary_name' => $this->temporary_name,
            'confirmed_name' => $this->confirmed_name,
            'short_name' => $this->short_name,
            'type' => $this->type,
            'nature' => $this->nature,
            'start_date' => $this->start_date,
            'complete_date' => $this->complete_date,
        ];
    }
}
