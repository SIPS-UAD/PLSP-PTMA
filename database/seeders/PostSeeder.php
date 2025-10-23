<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use Faker\Factory as Faker;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = User::pluck('id_user')->toArray();

        if (empty($userIds)) {
            // fallback: buat satu user jika tidak ada
            $user = User::factory()->create();
            $userIds = [$user->id_user];
        }

        for ($i = 0; $i < 20; $i++) {
            Post::create([
                'id_user' => $faker->randomElement($userIds),
                'judul' => $faker->sentence(6),
                'deskripsi' => $faker->paragraphs(3, true),
                'tanggal' => $faker->date(),
                'kategori' => $faker->word(),
            ]);
        }
    }
}