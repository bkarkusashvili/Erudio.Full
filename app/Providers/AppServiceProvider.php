<?php

namespace App\Providers;

use App\Models\Page;
use App\Services\TBCPaymentService;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(TBCPaymentService::class, function () {
            return new TBCPaymentService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $logo = json_decode(Page::find(1))->body->logo;

        Inertia::share('logo', $logo ? '/storage/' . $logo : '/images/logo.png');
    }
}
