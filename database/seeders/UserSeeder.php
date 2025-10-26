<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Beberapa akun contoh
        $roles = ['member', 'admin', 'super_admin'];

        for ($i = 1; $i <= 6; $i++) {
            User::firstOrCreate(
                ['email' => "user{$i}@example.com"],
                [
                    'name' => $faker->name(),
                    'email' => "user{$i}@example.com",
                    'password' => Hash::make('password'),
                    'nama_lsp' => $faker->company(),
                    'nama_ptma' => $faker->companySuffix(),
                    'no_hp' => $faker->phoneNumber(),
                    'role' => $faker->randomElement($roles),
                ]
            );
        }
    }
}
