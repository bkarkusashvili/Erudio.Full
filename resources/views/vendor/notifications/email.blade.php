@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('გამარჯობა!')
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{!! $line !!}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
    switch ($level) {
        case 'success':
        case 'error':
            $color = $level;
            break;
        default:
            $color = 'primary';
    }
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{!! $line !!}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('პატივისცემით'),<br>
ერუდიოს გუნდი
{{-- {{ config('app.name') }} --}}
@endif

{{-- Subcopy --}}
@isset($actionText)
@slot('subcopy')
@lang(
"თუ ვერ ხედავთ ღილაკს \":actionText\" ან რაიმე სახის პრობლემა აქვს ლინკს, გთხოვთ აღნიშნული URL დააკოპიროთ:\n",
[
'actionText' => $actionText,
]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
@endslot
@endisset
@endcomponent
