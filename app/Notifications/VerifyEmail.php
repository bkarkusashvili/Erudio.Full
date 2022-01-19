<?php

namespace App\Notifications;

use App\Models\Translate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Lang;

class VerifyEmail extends VerifyEmailBase
{
    use Queueable;

    protected function buildMailMessage($url)
    {
        $lang = Lang::locale();
        $data = Translate::whereIn('key', [
            'mail_verify_subject',
            'mail_verify_info',
            'mail_verify_action_info',
            'mail_verify_action',
            'mail_verify_success',
        ])->get()->mapWithKeys(function (Translate $item) use ($lang) {
            return [$item->key => $item->$lang];
        });

        return (new MailMessage)
            ->subject($data['mail_verify_subject'])
            ->line($data['mail_verify_info'])
            ->line($data['mail_verify_action_info'])
            ->action($data['mail_verify_action'], $url)
            ->line($data['mail_verify_success']);
    }
}
