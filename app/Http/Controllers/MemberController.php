<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class MemberController extends Controller
{
    /**
     * Display a listing of members
     */
    public function index()
    {
        // Get all members for statistics calculation
        $allMembers = User::where('role', 'member')->get();

        // Get paginated members for table display
        $members = User::where('role', 'member')
            ->latest()
            ->paginate(10);

        // Calculate statistics
        $totalMembers = $allMembers->count();
        
        $aktifCount = $allMembers->filter(function($member) {
            return $member->status === true;
        })->count();

        $tidakAktifCount = $allMembers->filter(function($member) {
            return $member->status === false;
        })->count();

        return Inertia::render('admin/members/index', [
            'members' => $members,
            'stats' => [
                'totalMembers' => $totalMembers,
                'aktifCount' => $aktifCount,
                'tidakAktifCount' => $tidakAktifCount,
            ],
        ]);
    }

    /**
     * Show a specific member detail
     */
    public function show(User $member)
    {
        // Ensure it's a member
        if ($member->role !== 'member') {
            abort(403, 'Unauthorized to view this member.');
        }

        return Inertia::render('admin/members/detail', [
            'member' => $member,
        ]);
    }

    /**
     * Activate a member
     */
    public function aktifkan(User $member)
    {
        // Ensure it's a member
        if ($member->role !== 'member') {
            abort(403, 'Unauthorized to activate this user.');
        }

        // Only update if not already active
        if ($member->status !== true) {
            $member->update([
                'status' => true,
            ]);
        }

        return back()
            ->with('success', "Anggota '{$member->name}' telah diaktifkan.");
    }

    /**
     * Deactivate a member
     */
    public function nonaktifkan(User $member)
    {
        // Ensure it's a member
        if ($member->role !== 'member') {
            abort(403, 'Unauthorized to deactivate this user.');
        }

        // Only update if not already inactive
        if ($member->status !== false) {
            $member->update([
                'status' => false,
            ]);
        }

        return back()
            ->with('success', "Anggota '{$member->name}' telah dinonaktifkan.");
    }

    /**
     * Delete a member
     */
    public function destroy(User $member)
    {
        // Ensure it's a member
        if ($member->role !== 'member') {
            abort(403, 'Unauthorized to delete this user.');
        }

        $memberName = $member->name;
        $member->delete();

        return redirect()->route('members.index')
            ->with('success', "Member '{$memberName}' has been deleted successfully.");
    }

    /**
     * Bulk activate members
     */
    public function bulkApprove(Request $request)
    {
        $validated = $request->validate([
            'member_ids' => 'required|array',
            'member_ids.*' => 'integer|exists:users,id_user',
        ]);

        User::whereIn('id_user', $validated['member_ids'])
            ->where('role', 'member')
            ->update([
                'status' => true,
            ]);

        return redirect()->route('members.index')
            ->with('success', count($validated['member_ids']) . ' member(s) have been activated.');
    }

    /**
     * Bulk deactivate members
     */
    public function bulkReject(Request $request)
    {
        $validated = $request->validate([
            'member_ids' => 'required|array',
            'member_ids.*' => 'integer|exists:users,id_user',
        ]);

        User::whereIn('id_user', $validated['member_ids'])
            ->where('role', 'member')
            ->update([
                'status' => false,
            ]);

        return redirect()->route('members.index')
            ->with('success', count($validated['member_ids']) . ' member(s) have been deactivated.');
    }
}