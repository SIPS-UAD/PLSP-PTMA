import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
    {
        title: 'View',
        href: '#',
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

interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`View Post - ${post.judul}`} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/posts">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-semibold">View Post</h1>
                    </div>
                    <Link href={`/posts/${post.id_post}/edit`}>
                        <Button>Edit Post</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{post.judul}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Author:</span>
                                <span>{post.user.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Category:</span>
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {post.kategori}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Date:</span>
                                <span>{formatDate(post.tanggal)}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none dark:prose-invert">
                            <h3 className="text-base font-semibold">Description</h3>
                            <p className="whitespace-pre-line">{post.deskripsi}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}