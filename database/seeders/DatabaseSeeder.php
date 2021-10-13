<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Team;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        Course::factory()->count(20)->create();
        Team::factory()->count(4)->create();
    }
}
