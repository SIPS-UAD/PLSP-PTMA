import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import {
  AlertCircle,
  CheckCircle,
  Eye,
  MessageSquare,
  Search,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manajemen Komentar',
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
    id_post: number;
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filter comments based on search query (search in comment content only)
  const filteredComments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return comments.data;
    return comments.data.filter((comment) =>
      comment.isi_komentar.toLowerCase().includes(q),
    );
  }, [comments.data, searchQuery]);

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      router.delete(`/comments/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Komentar" />

      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Komentar
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comments.total}</div>
              <p className="text-xs text-muted-foreground">
                +5 baru sejak minggu lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Menunggu Review
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Perlu moderasi</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tingkat Engagement
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">Interaksi positif</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Komentar</CardTitle>
                <CardDescription>
                  Kelola dan moderasi komentar pengguna di semua postingan
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari komentar berdasarkan isi..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Komentar</TableHead>
                    <TableHead>Postingan</TableHead>
                    <TableHead>Penulis</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                      <TableRow key={comment.id_comment}>
                        <TableCell className="max-w-md truncate">
                          {comment.isi_komentar}
                        </TableCell>
                        <TableCell className="font-medium">
                          {comment.post.judul}
                        </TableCell>
                        <TableCell>{comment.user.name}</TableCell>
                        <TableCell>
                          {new Date(comment.created_at).toLocaleDateString(
                            'id-ID',
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/posts/${comment.post.id_post}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                                Lihat
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(comment.id_comment)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-6 text-center text-muted-foreground"
                      >
                        Tidak ada komentar yang ditemukan sesuai kriteria
                        pencarian.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Search results info */}
            {searchQuery && (
              <div className="mt-4 text-sm text-muted-foreground">
                Ditemukan {filteredComments.length} komentar yang sesuai dengan
                "{searchQuery}"
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
