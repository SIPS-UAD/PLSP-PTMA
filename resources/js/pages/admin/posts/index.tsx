import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { formatDate } from '@/lib/dateFormat';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
  ChevronDown,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manajemen Postingan',
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
    current_page: number;
    last_page: number;
  };
}

export default function PostsIndex({ posts }: PostsProps) {
  const [sortedPosts, setSortedPosts] = useState(posts.data);
  const [currentSort, setCurrentSort] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (category: string) => {
    setCurrentSort(category);
    if (category === 'all') {
      setSortedPosts(posts.data);
    } else {
      setSortedPosts(posts.data.filter((post) => post.kategori === category));
    }
  };

  const uniqueCategories = Array.from(
    new Set(posts.data.map((post) => post.kategori)),
  );

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      router.delete(`/posts/${id}`);
    }
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedPosts;
    return sortedPosts.filter((post) => post.judul.toLowerCase().includes(q));
  }, [sortedPosts, searchQuery]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Postingan" />

      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Postingan
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.data.length}</div>
              <p className="text-xs text-muted-foreground">
                +12 dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tampilan
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+180 minggu ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tingkat Engagement
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.5%</div>
              <p className="text-xs text-muted-foreground">
                +0.7% dari minggu lalu
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Postingan</CardTitle>
                <CardDescription>
                  Kelola dan atur postingan Anda di sini.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href="/posts/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Postingan
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari postingan berdasarkan judul..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        Kategori
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleSort('all')}>
                              Semua Kategori
                            </DropdownMenuItem>
                            {uniqueCategories.map((category) => (
                              <DropdownMenuItem
                                key={category}
                                onClick={() => handleSort(category)}
                              >
                                {category}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>Penulis</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
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
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                              Detail
                            </Button>
                          </Link>
                          <Link href={`/posts/${post.id_post}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.id_post)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Hapus
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
