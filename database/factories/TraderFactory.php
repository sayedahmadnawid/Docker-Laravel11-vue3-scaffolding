<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trader>
 */
class TraderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_kana' => $this->faker->kanaName(),
            'name'      => $this->faker->company(),
            'phone'     => $this->faker->phoneNumber(),
            'fax'       => $this->faker->phoneNumber(),
            'postalcode'=> $this->faker->postcode,
            'prefecture'=> $this->faker->prefecture,
            'city'      => $this->faker->city,
            'area'      => $this->faker->streetName(),
            'street'    => $this->faker->streetAddress(),
        ];
    }
}
