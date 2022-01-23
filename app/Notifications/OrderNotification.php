<?php

namespace App\Notifications;

use App\Models\Invoice;
use App\Models\Option;
use App\Models\Translate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Lang;

class OrderNotification extends Notification
{
    use Queueable;

    private $type;
    private $payType;
    private $isAdmin;
    private $invoice;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $type, string $payType = 'card', bool $isAdmin = false, Invoice $invoice = null)
    {
        $this->type = $type;
        $this->payType = $payType;
        $this->isAdmin = $isAdmin;
        $this->invoice = $invoice;
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

        $lang = Lang::locale();
        $data = Translate::whereIn('key', [
            'mail_order_subject',
            'mail_order_success',
            'mail_order_action',
            'mail_order_new',
            'mail_order_see_order',
            'mail_order_success_online',
            'mail_order_question',
        ])->get()->mapWithKeys(function (Translate $item) use ($lang) {
            return [$item->key => $item->$lang];
        });
        $email = Option::where('key', 'email')->first();
        $email = $email ? $email->value : 'info@erudio.ge';
        $template = new MailMessage;

        if ($this->isAdmin) {
            $template->subject($data['mail_order_subject'] . ' - ' . 'Beqa');
        } else {
            $template->subject($data['mail_order_subject']);
        }

        if ($this->payType == 'card') {
            $template->line($data['mail_order_' . $this->type . '_success']);
            $template->action($data['mail_order_action'], route('home'));
        } else {
            if ($this->isAdmin) {
                $template->line($data['mail_order_new']);
                $template->line('* სახელი: **' . $this->invoice->fullname . '**');
                $template->line('* სახელი ლათინურად: **' . $this->invoice->fullname_latin . '**');
                $template->line('* მეილი: **' . $this->invoice->email . '**');
                $template->line('* კომპანიის სახელი: **' . $this->invoice->company_name . '**');
                $template->line('* საიდენთფიკაციო ნომერი: **' . $this->invoice->company_number . '**');
                $template->line('* პოზიცია: **' . $this->invoice->position . '**');
                $template->line('* ტელეფონი: **' . $this->invoice->phone . '**');
                $template->line('* საიდან: **' . $this->invoice->from . '**');
                $template->action($data['mail_order_see_order'], route('home'));
            } else {
                $template->line($data['mail_order_success_online']);
            }
        }

        if ($this->isAdmin) {
            $template->line(str_replace(
                ':email',
                '<a href="' . $email . '">' . $email . '</a>',
                $data['mail_order_question']
            ));
        }

        return $template;
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
