<x-mail::message>
Привет {{ $user->name }},

@if ($user->blocked_at)
Ваш аккаунт был заблокирован.Вы больше не сможете зайти в наше приложение.
@else
Ваш аккаунт был активирован.Вы можете зайти в наше приложение.
<x-mail::button url="{{ route('login') }}">
Нажмите что бы войти
</x-mail::button>
@endif

Спасибо вам, <br>
{{ config('app.name') }}
</x-mail::message>