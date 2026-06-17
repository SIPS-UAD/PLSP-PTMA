<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class PostController extends Controller
{
  public function index(Request $request)
  {
    $search = $request->input('search');
    $kategori = $request->input('kategori');

    // Get all posts for statistics calculation
    $allPosts = Post::with('user')->latest()->get();

    // Get paginated posts for table display with filters
    $posts = Post::with('user')
      ->when($search, function ($query, $search) {
        $query->where('judul', 'like', "%{$search}%");
      })
      ->when($kategori, function ($query, $kategori) {
        $query->where('kategori', $kategori);
      })
      ->latest()
      ->paginate(10)
      ->withQueryString();

    // Calculate statistics
    $now = Carbon::now();
    $currentMonth = $now->month;
    $currentYear = $now->year;

    $totalPostsCount = $allPosts->count();

    $postsThisMonth = $allPosts->filter(function ($post) use ($currentMonth, $currentYear) {
      $postDate = Carbon::parse($post->tanggal);
      return $postDate->month == $currentMonth && $postDate->year == $currentYear;
    })->count();

    $postsThisYear = $allPosts->filter(function ($post) use ($currentYear) {
      $postDate = Carbon::parse($post->tanggal);
      return $postDate->year == $currentYear;
    })->count();

    // Get unique categories for filter
    $categories = Post::select('kategori')
      ->distinct()
      ->whereNotNull('kategori')
      ->orderBy('kategori')
      ->pluck('kategori')
      ->toArray();

    return Inertia::render('admin/posts/index', [
      'posts' => $posts,
      'stats' => [
        'totalPosts' => $totalPostsCount,
        'postsThisMonth' => $postsThisMonth,
        'postsThisYear' => $postsThisYear,
      ],
      'categories' => $categories,
      'filters' => [
        'search' => $search,
        'kategori' => $kategori,
      ],
    ]);
  }

  public function create()
  {
    // Ambil kategori unik dari database
    $categories = Post::select('kategori')
      ->distinct()
      ->whereNotNull('kategori')
      ->orderBy('kategori')
      ->pluck('kategori')
      ->map(fn($kategori) => [
        'value' => $kategori,
        'label' => ucfirst($kategori)
      ])
      ->toArray();

    return Inertia::render('admin/posts/create', [
      'categories' => $categories
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'judul' => 'required|string|max:255',
      'deskripsi' => 'required|string',
      'kategori' => 'required|string|max:255',
      'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $thumbnailPath = null;
    if ($request->hasFile('thumbnail')) {
      $thumbnailPath = $request->file('thumbnail')->store('thumbnails/posts', 'public');
    }

    $validated['thumbnail'] = $thumbnailPath;
    $validated['id_user'] = auth()->id();
    $validated['tanggal'] = now()->toDateString();

    Post::create($validated);

    return redirect()->route('posts.index')
      ->with('success', 'Post created successfully.');
  }

  public function edit(Post $post)
  {
    // Ambil kategori unik dari database
    $categories = Post::select('kategori')
      ->distinct()
      ->whereNotNull('kategori')
      ->orderBy('kategori')
      ->pluck('kategori')
      ->map(fn($kategori) => [
        'value' => $kategori,
        'label' => ucfirst($kategori)
      ])
      ->toArray();

    return Inertia::render('admin/posts/edit', [
      'post' => $post,
      'categories' => $categories
    ]);
  }

  public function update(Request $request, Post $post)
  {
    $validated = $request->validate([
      'judul' => 'required|string|max:255',
      'deskripsi' => 'required|string',
      'kategori' => 'required|string|max:255',
      'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $thumbnailPath = $post->thumbnail;

    if ($request->hasFile('thumbnail')) {
      if ($post->thumbnail) {
        Storage::disk('public')->delete($post->thumbnail);
      }

      $thumbnailPath = $request->file('thumbnail')->store('thumbnails/posts', 'public');
    }

    $validated['thumbnail'] = $thumbnailPath;
    $validated['tanggal'] = now()->toDateString();

    $post->update($validated);

    return redirect()->route('posts.index')
      ->with('success', 'Post updated successfully.');
  }

  public function destroy(Post $post)
  {
    if ($post->thumbnail) {
      Storage::disk('public')->delete($post->thumbnail);
    }
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
