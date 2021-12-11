<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

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

    public function pay()
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
                    "total" => 200,
                ],
                "methods" => [5],
                "returnurl" => 'https://erudio.ge/pay',
                "callbackUrl" => 'https://erudio.ge/pay'
            ]);

        // if ($response->ok()) {
        //     $body = json_decode($response->body());

        //     $this->access_token = $body->access_token;
        // }

        return $response;
    }
}
