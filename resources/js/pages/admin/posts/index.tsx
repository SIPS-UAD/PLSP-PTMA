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
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
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
            <Head title="Posts" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Posts</h1>
                    <Link href="/posts/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Post
                        </Button>
                    </Link>
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
            </div>
        </AppLayout>
    );
}
