<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegisterNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('იმისათვის, რომ სრულფასოვნად ისარგებლოთ ერუდიოს სერვისებით აუცილებელია გააქტიურდეს თქვენი ანგარიში.')
            ->line('აქტივაციისათვის დააჭირეთ ღილაკს:')
            ->action('ელ-ფოსტის აქტივაცია', url('/'))
            ->line('გმადლობთ, რომ გაიარეთ რეგისტრაცია ერუდიოს სასწავლო პლატფორმაზე.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
