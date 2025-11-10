import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Comments',
        href: '/comments',
    },
    {
        title: 'Create',
        href: '/comments/create',
    },
];

interface Post {
    id_post: number;
    judul: string;
}

interface CommentsCreateProps {
    posts: Post[];
}

export default function CommentsCreate({ posts }: CommentsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        id_post: '',
        isi_komentar: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/comments');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Comment" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold">Create New Comment</h1>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="id_post">Post</Label>
                        <Select
                            value={data.id_post}
                            onValueChange={(value) => setData('id_post', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a post" />
                            </SelectTrigger>
                            <SelectContent>
                                {posts.map((post) => (
                                    <SelectItem
                                        key={post.id_post}
                                        value={post.id_post.toString()}
                                    >
                                        {post.judul}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.id_post && (
                            <p className="text-sm text-red-600">
                                {errors.id_post}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="isi_komentar">Comment</Label>
                        <Textarea
                            id="isi_komentar"
                            value={data.isi_komentar}
                            onChange={(e) =>
                                setData('isi_komentar', e.target.value)
                            }
                            rows={6}
                            required
                        />
                        {errors.isi_komentar && (
                            <p className="text-sm text-red-600">
                                {errors.isi_komentar}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Create Comment
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
