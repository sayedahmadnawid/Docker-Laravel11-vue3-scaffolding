<?php

namespace Database\Seeders;

use App\Models\Trader;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TraderSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trader::factory()
            ->count(50)
            ->create();
    }
}
