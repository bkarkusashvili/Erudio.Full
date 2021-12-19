<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Option::create(['key' => 'facebook', 'value' => '']);
        // Option::create(['key' => 'twitter', 'value' => '']);
        // Option::create(['key' => 'youtube', 'value' => '']);
        // Option::create(['key' => 'linkedin', 'value' => '']);
        // Option::create(['key' => 'instagram', 'value' => '']);

        // Option::create(['key' => 'email', 'value' => '']);
        // Option::create(['key' => 'phone', 'value' => '']);
        // Option::create(['key' => 'address_ka', 'value' => '']);
        // Option::create(['key' => 'address_en', 'value' => '']);

        Option::create(['key' => 'copyright', 'value' => '']);
    }
}
