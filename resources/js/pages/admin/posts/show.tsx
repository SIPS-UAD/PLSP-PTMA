import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/dateFormat';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Postingan',
    href: '/posts',
  },
  {
    title: 'Lihat',
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
      <Head title={`Lihat Postingan - ${post.judul}`} />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/posts">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Lihat Postingan</h1>
          </div>
          <Link href={`/posts/${post.id_post}/edit`}>
            <Button>Edit Postingan</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{post.judul}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Penulis:</span>
                <span>{post.user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Kategori:</span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                  {post.kategori}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Tanggal:</span>
                <span>{formatDate(post.tanggal)}</span>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold">Deskripsi</h3>
              <div
                className="prose dark:prose-invert max-w-none [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_div[data-align='center']]:text-center [&_div[data-align='left']]:text-left [&_div[data-align='right']]:text-right [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img[data-align='center']]:mx-auto [&_img[data-align='left']]:mr-auto [&_img[data-align='right']]:ml-auto [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: post.deskripsi }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
