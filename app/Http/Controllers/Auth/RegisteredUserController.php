<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'nama_lsp' => 'required|string|max:255',
            'nama_ptma' => 'required|string|max:255',
            'nama_ketua' => 'required|string|max:255',
            'no_hp' => 'required|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nama_lsp' => $request->nama_lsp,
            'nama_ptma' => $request->nama_ptma,
            'nama_ketua' => $request->nama_ketua,
            'no_hp' => $request->no_hp,
            'role' => 'member',
            'status' => false, // Set status to false by default
        ]);

        event(new Registered($user));

        // Don't login the user automatically
        // Redirect to pending approval page
        return redirect()->route('register.pending');
    }
}
