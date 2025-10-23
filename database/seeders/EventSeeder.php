<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Faker\Factory as Faker;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 8; $i++) {
            Event::create([
                'judul' => $faker->sentence(4),
                'deskripsi' => $faker->paragraph(),
                'tanggal' => $faker->dateTimeBetween('+1 days', '+90 days')->format('Y-m-d'),
            ]);
        }
    }
}