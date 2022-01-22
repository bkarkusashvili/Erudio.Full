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
            'key' => 'course_status',
            'ka' => 'სტატუსი',
            'en' => 'სტატუსი'
        ]);
        Translate::create([
            'key' => 'course_status_active',
            'ka' => 'აქტიური',
            'en' => 'აქტიური'
        ]);
        Translate::create([
            'key' => 'course_status_going',
            'ka' => 'მიმდინარე',
            'en' => 'მიმდინარე'
        ]);
        Translate::create([
            'key' => 'course_status_end',
            'ka' => 'დასრულებული',
            'en' => 'დასრულებული'
        ]);
        Translate::create([
            'key' => 'course_status_full',
            'ka' => 'ადგილები შევსებულია',
            'en' => 'ადგილები შევსებულია'
        ]);
    }
}
