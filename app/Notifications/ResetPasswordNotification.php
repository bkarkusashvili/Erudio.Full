<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Lang;

class ResetPasswordNotification extends ResetPassword
{
    use Queueable;

    protected function buildMailMessage($url)
    {
        return (new MailMessage)
            ->subject('პაროლის აღდგენა')
            ->line('თქვენს ანგარიშზე პაროლის შესაცვლელად გთხოვთ დააჭიროთ “პაროლის აღდგენა”')
            ->action('პაროლის აღდგენა', $url)
            ->line('პაროლის რესეტის ამ ბმულს ვადა ამოეწურება ' . config('auth.passwords.' . config('auth.defaults.passwords') . '.expire') . ' წუთში.')
            ->line('იმ შემთხვევაში თუ პაროლის აღდგენა თქვენ არ მოითხოვეთ, გთხოვთ მოგვწეროთ ელ-ფოსტაზე <a href="mailto:info@erudio.ge">info@erudio.ge</a>');
    }

    protected function resetUrl($notifiable)
    {
        if (static::$createUrlCallback) {
            return call_user_func(static::$createUrlCallback, $notifiable, $this->token);
        }

        return url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
            'lang' => Lang::locale()
        ], false));
    }
}
