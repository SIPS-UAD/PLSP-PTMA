import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { ChevronDown, Edit, Eye, FileText, Plus, Search, Trash2, TrendingUp, Upload, Users } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    const [sortedPosts, setSortedPosts] = useState(posts.data);
    const [currentSort, setCurrentSort] = useState('all');

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
                                <Button variant="outline">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import
                                </Button>
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
                        {/* Search and Filter */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search posts..."
                                    className="pl-10"
                                />
                            </div>
                        </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        Category
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuItem
                                                    onClick={() => handleSort('all')}
                                                >
                                                    All Categories
                                                </DropdownMenuItem>
                                                {uniqueCategories.map((category) => (
                                                    <DropdownMenuItem
                                                        key={category}
                                                        onClick={() =>
                                                            handleSort(category)
                                                        }
                                                    >
                                                        {category}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedPosts.map((post) => (
                                <TableRow key={post.id_post}>
                                    <TableCell className="font-medium">
                                        {post.judul}
                                    </TableCell>
                                    <TableCell>{post.kategori}</TableCell>
                                    <TableCell>{post.user.name}</TableCell>
                                    <TableCell>{formatDate(post.tanggal)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/posts/${post.id_post}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link
                                                href={`/posts/${post.id_post}/edit`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(post.id_post)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}
