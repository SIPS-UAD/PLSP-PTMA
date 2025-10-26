import { Button } from '@/components/ui/button';
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
import { Edit, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Comments',
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
}

interface CommentsProps {
    comments: {
        data: Comment[];
        links: any[];
        current_page: number;
        last_page: number;
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
            <Head title="Comments" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Comments</h1>
                    <Link href="/comments/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Comment
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Comment</TableHead>
                                <TableHead>Post</TableHead>
                                <TableHead>Author</TableHead>
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
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/comments/${comment.id_comment}/edit`}
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
            </div>
        </AppLayout>
    );
}
