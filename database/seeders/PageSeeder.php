<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::create(['title_ka' => 'მთავარი']);
        Page::create(['title_ka' => 'ჩვენს შესახებ']);
        Page::create(['title_ka' => 'სოციალური პასუხისმგებლობა']);
    }
}
