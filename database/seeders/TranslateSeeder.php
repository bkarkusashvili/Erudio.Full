<?php

namespace Database\Seeders;

use App\Models\Translate;
use Illuminate\Database\Seeder;

class TranslateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Translate::create([
            'key' => 'days_header',
            'ka' => 'ორგანიზაციული დეტალები',
            'en' => 'ორგანიზაციული დეტალები'
        ]);
    }
}
