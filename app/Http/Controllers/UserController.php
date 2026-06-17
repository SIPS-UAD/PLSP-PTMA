<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->paginate(10);

        // Calculate statistics
        $totalUsers = User::count();
        $activeUsers = User::where('status', true)->count();
        $inactiveUsers = User::where('status', false)->count();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'stats' => [
                'totalUsers' => $totalUsers,
                'activeUsers' => $activeUsers,
                'inactiveUsers' => $inactiveUsers,
            ],
        ]);
    }

    public function show($id)
    {
        $user = User::where('id_user', $id)->firstOrFail();

        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    public function resetPassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = User::where('id_user', $id)->firstOrFail();

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Password reset successfully.');
    }
}