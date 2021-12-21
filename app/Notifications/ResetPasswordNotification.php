<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
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
            ->line('თქვენს ანგარიშზე პაროლის შესაცვლელად გთხოვთ დააჭიროთ “პაროლის აღდგენა”')
            ->action('პაროლის აღდგენა', url('/'))
            ->line('იმ შემთხვევაში თუ პაროლის აღდგენა თქვენ არ მოითხოვეთ, გთხოვთ მოგვწეროთ ელ-ფოსტაზე <a href="mailto:info@erudio.ge">info@erudio.ge</a>');
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
