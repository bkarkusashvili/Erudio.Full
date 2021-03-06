<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderNotification;
use Illuminate\Support\Facades\Http;
use Lang;

class TBCPaymentService
{
    private $apiKey;
    private $client_id;
    private $client_secret;
    private $testing;
    private $access_token;

    private $baseUrl = 'https://api.tbcbank.ge/v1/tpay/';

    public function __construct()
    {
        $this->apiKey = env('TBC_PAYMENT_API_KEY');
        $this->client_id = env('TBC_PAYMENT_CLIENT_ID');
        $this->client_secret = env('TBC_PAYMENT_API_SECRET');
        $this->testing = env('TBC_PAYMENT_TESTING');
    }

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
    public function pay(Course $course, $type, $courseId, $couseType)
    {
        $this->getToken();

        $methods = $type == 'card' ? [4, 5, 7] : [8];

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
                    "total" => $this->testing ? 0.01 : $course->price,
                ],
                "methods" => $methods,
                "returnurl" => route('course.single', [
                    'id' => $courseId,
                    'type' => $couseType,
                    'lang' => Lang::locale(),
                    'status' => 'paid',
                ]),
            ]);

        if ($response->ok()) {
            $user = auth()->user();
            $body = json_decode($response->body());

            Order::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
                'course_type' => $couseType,
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

                    $course = Course::find($order->course_id);
                    $user = User::find($order->user_id);
                    $user->notify(new OrderNotification(Course::getCourseType($course->type), 'card'));
                }
            }
        }

        return $response;
    }
}
