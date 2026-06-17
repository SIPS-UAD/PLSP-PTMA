<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class CommentController extends Controller
{
  public function index()
  {
    $comments = Comment::with(['user', 'post'])->latest()->paginate(10);

    // Calculate statistics for comments
    $now = Carbon::now();

    $totalComments = Comment::count();

    $commentsThisMonth = Comment::whereYear('created_at', $now->year)
      ->whereMonth('created_at', $now->month)
      ->count();

    $commentsThisYear = Comment::whereYear('created_at', $now->year)->count();

    return Inertia::render('admin/comments/index', [
      'comments' => $comments,
      'stats' => [
        'totalComments' => $totalComments,
        'commentsThisMonth' => $commentsThisMonth,
        'commentsThisYear' => $commentsThisYear,
      ]
    ]);
  }

  public function create()
  {
    $posts = Post::all(['id_post', 'judul']);

    return Inertia::render('admin/comments/create', [
      'posts' => $posts
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'id_post' => 'required|exists:posts,id_post',
      'isi_komentar' => 'required|string',
    ]);

    $validated['id_user'] = auth()->id();

    Comment::create($validated);

    return redirect()->route('comments.index')
      ->with('success', 'Comment created successfully.');
  }

  public function destroy(Comment $comment)
  {
    $comment->delete();

    return redirect()->route('comments.index')
      ->with('success', 'Comment deleted successfully.');
  }
}
