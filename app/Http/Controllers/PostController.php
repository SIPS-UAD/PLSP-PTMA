<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
  public function index()
  {
    $posts = Post::with('user')->latest()->paginate(10);

    return Inertia::render('admin/posts/index', [
      'posts' => $posts
    ]);
  }

  public function create()
  {
    return Inertia::render('admin/posts/create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'judul' => 'required|string|max:255',
      'deskripsi' => 'required|string',
      'tanggal' => 'required|date',
      'kategori' => 'required|string|max:255',
    ]);

    $validated['id_user'] = auth()->id();

    Post::create($validated);

    return redirect()->route('posts.index')
      ->with('success', 'Post created successfully.');
  }

  public function edit(Post $post)
  {
    return Inertia::render('admin/posts/edit', [
      'post' => $post
    ]);
  }

  public function update(Request $request, Post $post)
  {
    $validated = $request->validate([
      'judul' => 'required|string|max:255',
      'deskripsi' => 'required|string',
      'tanggal' => 'required|date',
      'kategori' => 'required|string|max:255',
    ]);

    $post->update($validated);

    return redirect()->route('posts.index')
      ->with('success', 'Post updated successfully.');
  }

  public function destroy(Post $post)
  {
    $post->delete();

    return redirect()->route('posts.index')
      ->with('success', 'Post deleted successfully.');
  }

  public function show(Post $post)
  {
    return Inertia::render('admin/posts/show', [
      'post' => $post->load('user')
    ]);
  }
}
