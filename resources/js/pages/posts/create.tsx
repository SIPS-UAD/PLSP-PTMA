import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
    {
        title: 'Create',
        href: '/posts/create',
    },
];

export default function PostsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        deskripsi: '',
        tanggal: '',
        kategori: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold">Create New Post</h1>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="judul">Title</Label>
                        <Input
                            id="judul"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            required
                        />
                        {errors.judul && (
                            <p className="text-sm text-red-600">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deskripsi">Description</Label>
                        <Textarea
                            id="deskripsi"
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            rows={6}
                            required
                        />
                        {errors.deskripsi && (
                            <p className="text-sm text-red-600">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tanggal">Date</Label>
                        <Input
                            id="tanggal"
                            type="date"
                            value={data.tanggal}
                            onChange={(e) => setData('tanggal', e.target.value)}
                            required
                        />
                        {errors.tanggal && (
                            <p className="text-sm text-red-600">
                                {errors.tanggal}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="kategori">Category</Label>
                        <Input
                            id="kategori"
                            value={data.kategori}
                            onChange={(e) =>
                                setData('kategori', e.target.value)
                            }
                            required
                        />
                        {errors.kategori && (
                            <p className="text-sm text-red-600">
                                {errors.kategori}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Create Post
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
