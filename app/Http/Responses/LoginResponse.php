<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
  public function toResponse($request)
  {
    $user = Auth::user();

    $redirectPath = match ($user->role) {
      'admin', 'super_admin' => '/dashboard',
      'member' => '/user-dashboard',
      default => '/',
    };

    $request->session()->forget('url.intended');

    return $request->wantsJson()
      ? new JsonResponse(['two_factor' => false], 200)
      : redirect()->to($redirectPath);
  }
}
