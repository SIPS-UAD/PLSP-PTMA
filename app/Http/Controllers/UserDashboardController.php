<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
  public function index(Request $request): Response
  {

    return Inertia::render('user/index');
  }

  public function edit(Request $request): Response
  {
    return Inertia::render('user/edit');
  }

  public function update(Request $request)
  {
    $user = $request->user();

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'nama_lsp' => 'required|string|max:255',
      'nama_ptma' => 'required|string|max:255',
      'nama_ketua' => 'required|string|max:255',
      'no_hp' => 'required|string|max:20',
      'email' => 'required|email|max:255|unique:users,email,' . $user->id_user . ',id_user',
      'password' => 'nullable|string',
      'password_baru' => 'nullable|string|min:8|confirmed',
    ]);

    if ($request->filled('password_baru')) {
      if (!$request->filled('password')) {
        return back()->withErrors([
          'password' => 'Password saat ini diperlukan untuk mengubah password.'
        ]);
      }

      if (!Hash::check($request->password, $user->password)) {
        return back()->withErrors([
          'password' => 'Password saat ini tidak sesuai.'
        ]);
      }

      $user->password = Hash::make($request->password_baru);
    }

    $user->name = $validated['name'];
    $user->nama_lsp = $validated['nama_lsp'];
    $user->nama_ptma = $validated['nama_ptma'];
    $user->nama_ketua = $validated['nama_ketua'];
    $user->no_hp = $validated['no_hp'];

    if ($user->email !== $validated['email']) {
      $user->email = $validated['email'];
      $user->email_verified_at = null; 
    }

    $user->save();

    return redirect()->route('user.profile')->with('success', 'Profil berhasil diperbarui.');
  }
}
