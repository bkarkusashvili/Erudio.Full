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
        Translate::create(['key' => 'home', 'ka' => 'მთავარი', 'en' => 'მთავარი']);
        Translate::create(['key' => 'about', 'ka' => 'ჩვენს შესახებ', 'en' => 'ჩვენს შესახებ']);
        Translate::create(['key' => 'team', 'ka' => 'ჩვენი გუნდი', 'en' => 'ჩვენი გუნდი']);
        Translate::create(['key' => 'social', 'ka' => 'სოც. პასუხისმგებლობა', 'en' => 'სოც. პასუხისმგებლობა']);
        Translate::create(['key' => 'media', 'ka' => 'მედია', 'en' => 'მედია']);
        Translate::create(['key' => 'categories', 'ka' => 'კატეგორიები', 'en' => 'კატეგორიები']);
        Translate::create(['key' => 'courses', 'ka' => 'კურსები', 'en' => 'კურსები']);
        Translate::create(['key' => 'contact', 'ka' => 'კონტაქტი', 'en' => 'კონტაქტი']);
        Translate::create(['key' => 'login', 'ka' => 'შესვლა', 'en' => 'შესვლა']);
        Translate::create(['key' => 'myPage', 'ka' => 'ჩემი გვერდი', 'en' => 'ჩემი გვერდი']);
        Translate::create(['key' => 'settings', 'ka' => 'პარამეტრები', 'en' => 'პარამეტრები']);
        Translate::create(['key' => 'logout', 'ka' => 'სისტემიდან გასვლა', 'en' => 'სისტემიდან გასვლა']);

        Translate::create(['key' => 'home', 'ka' => 'კურსები', 'en' => 'Home']);
    }
}
