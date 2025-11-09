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
import {
    MessageSquare,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    AlertCircle,
    CheckCircle,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Comments Management',
        href: '/comments',
    },
];

interface Comment {
    id_comment: number;
    isi_komentar: string;
    user: {
        name: string;
    };
    post: {
        judul: string;
    };
    status?: 'pending' | 'approved' | 'spam';
    created_at: string;
}

interface CommentsProps {
    comments: {
        data: Comment[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function CommentsIndex({ comments }: CommentsProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(`/comments/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Comments Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Comments
                            </CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {comments.total}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +5 new since last week
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Review
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                Needs moderation
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Engagement Rate
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">98%</div>
                            <p className="text-xs text-muted-foreground">
                                Positive interactions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Comments</CardTitle>
                                <CardDescription>
                                    Manage and moderate user comments across all posts
                                </CardDescription>
                            </div>
                            <Link href="/comments/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Comment
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Search and Filter */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search comments..."
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline" className="flex gap-2">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                        </div>

                        {/* Table */}
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Comment</TableHead>
                                        <TableHead>Post</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {comments.data.map((comment) => (
                                        <TableRow key={comment.id_comment}>
                                            <TableCell className="max-w-md truncate">
                                                {comment.isi_komentar}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {comment.post.judul}
                                            </TableCell>
                                            <TableCell>{comment.user.name}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                        comment.status ===
                                                        'approved'
                                                            ? 'bg-green-50 text-green-700'
                                                            : comment.status ===
                                                              'spam'
                                                            ? 'bg-red-50 text-red-700'
                                                            : 'bg-yellow-50 text-yellow-700'
                                                    }`}
                                                >
                                                    {comment.status || 'pending'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    comment.created_at,
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/comments/${comment.id_comment}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                comment.id_comment,
                                                            )
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
