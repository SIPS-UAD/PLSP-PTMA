<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
  public function index()
  {
    $comments = Comment::with(['user', 'post'])->latest()->paginate(10);

    return Inertia::render('comments/index', [
      'comments' => $comments
    ]);
  }

  public function create()
  {
    $posts = Post::all(['id_post', 'judul']);

    return Inertia::render('comments/create', [
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

  public function show(Comment $comment)
  {
    $comment->load(['user', 'post']);

    return Inertia::render('comments/show', [
      'comment' => $comment
    ]);
  }

  public function edit(Comment $comment)
  {
    $posts = Post::all(['id_post', 'judul']);

    return Inertia::render('comments/edit', [
      'comment' => $comment,
      'posts' => $posts
    ]);
  }

  public function update(Request $request, Comment $comment)
  {
    $validated = $request->validate([
      'id_post' => 'required|exists:posts,id_post',
      'isi_komentar' => 'required|string',
    ]);

    $comment->update($validated);

    return redirect()->route('comments.index')
      ->with('success', 'Comment updated successfully.');
  }

  public function destroy(Comment $comment)
  {
    $comment->delete();

    return redirect()->route('comments.index')
      ->with('success', 'Comment deleted successfully.');
  }
}
