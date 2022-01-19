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
            'key' => 'mail_order_offline_success',
            'ka' => 'თქვენ წარმატებით შეიძინეთ ოფლაინ კურსი, კურსის სანახავად გთხოვთ ეწვიოთ თქვენს პროფილს',
            'en' => 'თქვენ წარმატებით შეიძინეთ ოფლაინ კურსი, კურსის სანახავად გთხოვთ ეწვიოთ თქვენს პროფილს'
        ]);
        Translate::create([
            'key' => 'mail_order_masterclass_success',
            'ka' => 'თქვენ წარმატებით შეიძინეთ მასტერკლასი, კურსის სანახავად გთხოვთ ეწვიოთ თქვენს პროფილს',
            'en' => 'თქვენ წარმატებით შეიძინეთ მასტერკლასი, კურსის სანახავად გთხოვთ ეწვიოთ თქვენს პროფილს'
        ]);
    }
}
