<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Faker\Factory as Faker;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $postIds = Post::pluck('id_post')->toArray();
        $userIds = User::pluck('id_user')->toArray();

        if (empty($postIds) || empty($userIds)) {
            return;
        }

        for ($i = 0; $i < 80; $i++) {
            Comment::create([
                'id_post' => $faker->randomElement($postIds),
                'id_user' => $faker->randomElement($userIds),
                'isi_komentar' => $faker->sentences(2, true),
            ]);
        }
    }
}