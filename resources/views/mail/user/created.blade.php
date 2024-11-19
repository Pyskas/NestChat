<x-mail::message>
Привет {{ $user->name }},

Твой аккаунт был успешно создан.

**Здесь информация о твоем профиле:** <br>
Email: {{ $user-> email }} <br>
Пароль: {{ $password }}

Пожалуйста войдите в приложение что бы изменить свой пароль

    
<x-mail::button url="{{ route('login') }}">
Нажмите сюда что бы войти
</x-mail::button>

Спасибо тебе, <br>
{{ config('app.name') }}
</x-mail::message>