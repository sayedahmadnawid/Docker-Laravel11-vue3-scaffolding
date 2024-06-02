<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TraderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'name_kana' => $this->name_kana,
            'phone' => $this->phone,
            'fax' => $this->fax,
            'postalcode' => $this->postalcode,
            'prefecture' => $this->prefecture,
            'city' => $this->city,
            'area' => $this->area,
            'street' => $this->street,
            
        ];
    }
}
