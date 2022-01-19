<?php

namespace App\Notifications;

use App\Models\Option;
use App\Models\Translate;
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
        $lang = Lang::locale();
        $data = Translate::whereIn('key', [
            'mail_reset_subject',
            'mail_reset_action_info',
            'mail_reset_action',
            'mail_reset_expire',
            'mail_reset_error',
        ])->get()->mapWithKeys(function (Translate $item) use ($lang) {
            return [$item->key => $item->$lang];
        });
        $email = Option::where('key', 'email')->first();
        $email = $email ? $email->value : 'info@erudio.ge';

        return (new MailMessage)
            ->subject($data['mail_reset_subject'])
            ->line($data['mail_reset_action_info'])
            ->action($data['mail_reset_action'], $url)
            ->line(str_replace(
                ':time',
                config('auth.passwords.' . config('auth.defaults.passwords') . '.expire'),
                $data['mail_reset_expire']
            ))
            ->line(str_replace(
                ':email',
                '<a href="' . $email . '">' . $email . '</a>',
                $data['mail_reset_error']
            ));
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
