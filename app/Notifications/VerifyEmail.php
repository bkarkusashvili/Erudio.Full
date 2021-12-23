<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;

class VerifyEmail extends VerifyEmailBase
{
    use Queueable;

    protected function buildMailMessage($url)
    {
        return (new MailMessage)
            ->subject('დაადასტურეთ ელ-ფოსტა')
            ->line('იმისათვის, რომ სრულფასოვნად ისარგებლოთ ერუდიოს სერვისებით აუცილებელია გააქტიურდეს თქვენი ანგარიში.')
            ->line('აქტივაციისათვის დააჭირეთ ღილაკს:')
            ->action('ელ-ფოსტის აქტივაცია', $url)
            ->line('გმადლობთ, რომ გაიარეთ რეგისტრაცია ერუდიოს სასწავლო პლატფორმაზე.');
    }
}
