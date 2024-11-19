<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Проверяем, является ли текущий пользователь администратором
        if (!auth()->check() || !auth()->user()->is_admin) {
            // Если пользователь не администратор, отклоняем запрос (403)
            abort(403, 'Unauthorized action.');
        }

        // Если это администратор, пропускаем запрос
        return $next($request);
    }
}
