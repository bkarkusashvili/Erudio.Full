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
        // VerifyEmail
        Translate::create(['key' => 'mail_verify_subject', 'ka' => 'დაადასტურეთ ელ-ფოსტა', 'en' => 'დაადასტურეთ ელ-ფოსტა']);
        Translate::create([
            'key' => 'mail_verify_info',
            'ka' => 'იმისათვის, რომ სრულფასოვნად ისარგებლოთ ერუდიოს სერვისებით აუცილებელია გააქტიურდეს თქვენი ანგარიში.',
            'en' => 'იმისათვის, რომ სრულფასოვნად ისარგებლოთ ერუდიოს სერვისებით აუცილებელია გააქტიურდეს თქვენი ანგარიში.'
        ]);
        Translate::create([
            'key' => 'mail_verify_action_info',
            'ka' => 'აქტივაციისათვის დააჭირეთ ღილაკს:',
            'en' => 'აქტივაციისათვის დააჭირეთ ღილაკს:'
        ]);
        Translate::create([
            'key' => 'mail_verify_action',
            'ka' => 'ელ-ფოსტის აქტივაცია',
            'en' => 'ელ-ფოსტის აქტივაცია'
        ]);
        Translate::create([
            'key' => 'mail_verify_success',
            'ka' => 'გმადლობთ, რომ გაიარეთ რეგისტრაცია ერუდიოს სასწავლო პლატფორმაზე.',
            'en' => 'გმადლობთ, რომ გაიარეთ რეგისტრაცია ერუდიოს სასწავლო პლატფორმაზე.'
        ]);

        // SubscribeNotification
        Translate::create([
            'key' => 'mail_subscribe_subject',
            'ka' => 'გამოწერა',
            'en' => 'გამოწერა'
        ]);
        Translate::create([
            'key' => 'mail_subscribe_text',
            'ka' => 'თქვენი ელ-ფოსტა წარმატებით დაემატა ჩვენს გამომწერთა სიას.',
            'en' => 'თქვენი ელ-ფოსტა წარმატებით დაემატა ჩვენს გამომწერთა სიას.'
        ]);

        // ResetPasswordNotification
        Translate::create([
            'key' => 'mail_reset_subject',
            'ka' => 'პაროლის აღდგენა',
            'en' => 'პაროლის აღდგენა'
        ]);
        Translate::create([
            'key' => 'mail_reset_action_info',
            'ka' => 'თქვენს ანგარიშზე პაროლის შესაცვლელად გთხოვთ დააჭიროთ “პაროლის აღდგენა”',
            'en' => 'თქვენს ანგარიშზე პაროლის შესაცვლელად გთხოვთ დააჭიროთ “პაროლის აღდგენა”'
        ]);
        Translate::create([
            'key' => 'mail_reset_action',
            'ka' => 'პაროლის აღდგენა',
            'en' => 'პაროლის აღდგენა'
        ]);
        Translate::create([
            'key' => 'mail_reset_expire',
            'ka' => 'პაროლის რესეტის ამ ბმულს ვადა ამოეწურება :time წუთში',
            'en' => 'პაროლის რესეტის ამ ბმულს ვადა ამოეწურება :time წუთში'
        ]);
        Translate::create([
            'key' => 'mail_reset_error',
            'ka' => 'იმ შემთხვევაში თუ პაროლის აღდგენა თქვენ არ მოითხოვეთ, გთხოვთ მოგვწეროთ ელ-ფოსტაზე :email',
            'en' => 'იმ შემთხვევაში თუ პაროლის აღდგენა თქვენ არ მოითხოვეთ, გთხოვთ მოგვწეროთ ელ-ფოსტაზე :email'
        ]);

        // OrderNotification
        Translate::create([
            'key' => 'mail_order_subject',
            'ka' => 'ახალი შეკვეთა',
            'en' => 'ახალი შეკვეთა'
        ]);
        Translate::create([
            'key' => 'mail_order_success',
            'ka' => 'თქვენ წარმატებით შეიძინეთ ონლაინ კურსი, კურსის სანახავად გთხოვთ ეწვიოთ თქვენს პროფილს',
            'en' => 'თქვენ წარმატებით შეიძინეთ ონლაინ კურსი, კურსის სანახავად გთხოვთ ეწვიოთ თქვენს პროფილს'
        ]);
        Translate::create([
            'key' => 'mail_order_action',
            'ka' => 'ჩემი ანაგარიში',
            'en' => 'ჩემი ანაგარიში'
        ]);
        Translate::create([
            'key' => 'mail_order_new',
            'ka' => 'თქვენ მიიღეთ ახალი მოთხოვნა',
            'en' => 'თქვენ მიიღეთ ახალი მოთხოვნა'
        ]);
        Translate::create([
            'key' => 'mail_order_see_order',
            'ka' => 'შეკვეთის ნახვა',
            'en' => 'შეკვეთის ნახვა'
        ]);
        Translate::create([
            'key' => 'mail_order_success_online',
            'ka' => 'თქვენი მოთხოვნა დაფიქსირებულია, ჩვენი წარმომადგენელი მალე დაგიკავშირდებათ.',
            'en' => 'თქვენი მოთხოვნა დაფიქსირებულია, ჩვენი წარმომადგენელი მალე დაგიკავშირდებათ.'
        ]);
        Translate::create([
            'key' => 'mail_order_question',
            'ka' => 'კითხვების შემთხვევაში გთხოვთ მოგვწეროთ ელ-ფოსტაზე: :email',
            'en' => 'კითხვების შემთხვევაში გთხოვთ მოგვწეროთ ელ-ფოსტაზე: :email'
        ]);
    }
}
