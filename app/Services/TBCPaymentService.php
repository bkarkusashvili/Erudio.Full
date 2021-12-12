<?php

namespace App\Services;

use App\Models\Course;
use App\Models\LiveCourse;
use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Lang;
use Log;

class TBCPaymentService
{
    private $apiKey = '8cE9WQxV7LMoNhHEG6ySdzWIRRkY7nbd';
    private $client_id = '7000489';
    private $client_secret = 'ZJu3kFUia6sOPfeW';
    private $access_token;

    private $baseUrl = 'https://api.tbcbank.ge/v1/tpay/';

    private function getToken()
    {
        $response = Http::withHeaders(['apiKey' => $this->apiKey])
            ->withoutVerifying()
            ->asForm()
            ->baseUrl($this->baseUrl)
            ->post('access-token', [
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secret
            ]);

        if ($response->ok()) {
            $body = json_decode($response->body());

            $this->access_token = $body->access_token;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Course  $course
     * @return \Illuminate\Http\Response
     */
    public function pay(Course $course)
    {
        $this->getToken();

        $response = Http::withHeaders([
            'apiKey' => $this->apiKey,
            'Authorization' => 'Bearer ' . $this->access_token
        ])
            ->withoutVerifying()
            ->asJson()
            ->baseUrl($this->baseUrl)
            ->post('payments', [
                "amount" => [
                    "currency" => "GEL",
                    "total" => 0.01,
                ],
                "returnurl" => route('course.single', [
                    $course->id,
                    'lang' => Lang::locale(),
                    'status' => 'paid',
                ]),
                "callbackUrl" => route('pay.check'),
                // "returnurl" => 'https://erudio.ge/ka/course/2',
                // "callbackUrl" => 'https://erudio.ge/ka/course/2',
            ]);

        if ($response->ok()) {
            $user = auth()->user();
            $body = json_decode($response->body());

            $course->orders()->create([
                'user_id' => $user->id,
                'userName' => $user->firstname . ' ' . $user->lastname,
                'amount' => $course->price,
                'payId' => $body->payId,
            ]);
        }

        return $response;
    }

    public function checkStatus(string $payId)
    {
        $this->getToken();

        $response = Http::withHeaders([
            'apiKey' => $this->apiKey,
            'Authorization' => 'Bearer ' . $this->access_token
        ])
            ->withoutVerifying()
            ->asJson()
            ->baseUrl($this->baseUrl)
            ->get('payments/' . $payId);

        if ($response->ok()) {
            $body = json_decode($response->body());

            if ($body->status == 'Succeeded') {
                $order = Order::where('payId', $payId)->first();

                if ($order) {
                    $order->markAsPaid();
                }
            }
        }

        return $response;
    }
}
