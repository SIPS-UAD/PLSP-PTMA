import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FileText, Search, Upload, Plus, Edit, Trash2, Users, TrendingUp } from 'lucide-react';
import { useState, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts Management',
        href: '/posts',
    },
];

interface Post {
    id_post: number;
    judul: string;
    deskripsi: string;
    tanggal: string;
    kategori: string;
    user: {
        name: string;
    };
}

interface PostsProps {
    posts: {
        data: Post[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

export default function PostsIndex({ posts }: PostsProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedPosts, setSortedPosts] = useState(posts.data);
    const [currentSort, setCurrentSort] = useState('all');

    // Filter posts based on search query and category
    const filteredPosts = useMemo(() => {
        let result = posts.data;

        // Apply category filter
        if (currentSort !== 'all') {
            result = result.filter((post) => post.kategori === currentSort);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.judul.toLowerCase().includes(query) ||
                    post.deskripsi.toLowerCase().includes(query) ||
                    post.kategori.toLowerCase().includes(query) ||
                    post.user.name.toLowerCase().includes(query)
            );
        }

        return result;
    }, [posts.data, searchQuery, currentSort]);

    const handleSort = (category: string) => {
        setCurrentSort(category);
        if (category === 'all') {
            setSortedPosts(posts.data);
        } else {
            setSortedPosts(
                posts.data.filter((post) => post.kategori === category)
            );
        }
    };

    const uniqueCategories = Array.from(
        new Set(posts.data.map((post) => post.kategori))
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${id}`);
        }
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Posts
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{posts.data.length}</div>
                            <p className="text-xs text-muted-foreground">
                                +12 from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Views
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2,350</div>
                            <p className="text-xs text-muted-foreground">
                                +180 this week
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Engagement Rate
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.5%</div>
                            <p className="text-xs text-muted-foreground">
                                +0.7% from last week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Posts</CardTitle>
                                <CardDescription>
                                    Manage and organize your posts here.
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Link href="/posts/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Post
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Search */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search posts by title, description, category, or author..."
                                    className="pl-10 pr-10"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category Filter Buttons */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            <Button
                                variant={currentSort === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleSort('all')}
                            >
                                All
                            </Button>
                            {uniqueCategories.map((category) => (
                                <Button
                                    key={category}
                                    variant={currentSort === category ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSort(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* Table */}
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPosts.length > 0 ? (
                                        filteredPosts.map((post) => (
                                            <TableRow key={post.id_post}>
                                                <TableCell className="font-medium">
                                                    {post.judul}
                                                </TableCell>
                                                <TableCell className="max-w-md truncate">
                                                    {post.deskripsi}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700">
                                                        {post.kategori}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{post.user.name}</TableCell>
                                                <TableCell>
                                                    {new Date(post.tanggal).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/posts/${post.id_post}/edit`}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(post.id_post)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                                No posts found matching your search criteria.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Search results info */}
                        {searchQuery && (
                            <div className="mt-4 text-sm text-muted-foreground">
                                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
