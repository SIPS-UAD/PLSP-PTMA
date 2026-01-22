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
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Search, CheckCircle, XCircle, Mail, Users as UsersIcon, Power } from 'lucide-react';
import { useState, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manajemen Anggota',
    href: '/members',
  },
];

interface Member extends User {
  status: boolean;
  nama_ketua?: string;
  no_hp?: string;
}

interface MembersProps {
  members: {
    data: Member[];
    current_page: number;
    last_page: number;
    total: number;
  };
  stats: {
    totalMembers: number;
    aktifCount: number;
    tidakAktifCount: number;
  };
}

export default function MembersIndex({ members, stats }: MembersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'aktif' | 'tidak aktif'>('all');
  const [membersList, setMembersList] = useState(members.data);
  const [isLoading, setIsLoading] = useState<number | null>(null);

  // Filter members based on search query and status
  const filteredMembers = useMemo(() => {
    let result = membersList;

    // Filter by search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(q) ||
          member.email.toLowerCase().includes(q),
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      const isActive = filterStatus === 'aktif';
      result = result.filter((member) => member.status === isActive);
    }

    return result;
  }, [membersList, searchQuery, filterStatus]);

  const handleAktifkan = (memberId: number) => {
    setIsLoading(memberId);
    router.patch(
      `/members/${memberId}/aktifkan`,
      {},
      {
        onSuccess: () => {
          setMembersList((prevList) =>
            prevList.map((member) =>
              member.id_user === memberId
                ? { ...member, status: true }
                : member,
            ),
          );
          setIsLoading(null);
        },
        onError: () => {
          setIsLoading(null);
          alert('Gagal mengaktifkan anggota. Silakan coba lagi.');
        },
      },
    );
  };

  const handleNonaktifkan = (memberId: number) => {
    if (confirm('Apakah Anda yakin ingin menonaktifkan anggota ini?')) {
      setIsLoading(memberId);
      router.patch(
        `/members/${memberId}/nonaktifkan`,
        {},
        {
          onSuccess: () => {
            setMembersList((prevList) =>
              prevList.map((member) =>
                member.id_user === memberId
                  ? { ...member, status: false }
                  : member,
              ),
            );
            setIsLoading(null);
          },
          onError: () => {
            setIsLoading(null);
            alert('Gagal menonaktifkan anggota. Silakan coba lagi.');
          },
        },
      );
    }
  };

  function getStatusBadge(status: boolean) {
    if (status) {
      return (
        <Badge className="flex w-fit items-center gap-1 bg-green-50 text-green-700 ring-1 ring-green-600/10 ring-inset">
          <CheckCircle className="h-3 w-3" />
          Aktif
        </Badge>
      );
    }
    return (
      <Badge className="flex w-fit items-center gap-1 bg-red-50 text-red-700 ring-1 ring-red-600/10 ring-inset">
        <XCircle className="h-3 w-3" />
        Tidak Aktif
      </Badge>
    );
  }

  function getRoleBadge(role?: string) {
    if (role === 'super_admin') {
      return <Badge className="bg-purple-500">Super Admin</Badge>;
    }
    if (role === 'admin') {
      return <Badge className="bg-blue-500">Admin</Badge>;
    }
    return <Badge variant="secondary">Anggota</Badge>;
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Anggota" />

      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Anggota
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                Total anggota terdaftar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktif
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.aktifCount}</div>
              <p className="text-xs text-muted-foreground">
                Anggota aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tidak Aktif
              </CardTitle>
              <Power className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tidakAktifCount}</div>
              <p className="text-xs text-muted-foreground">
                Anggota tidak aktif
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Anggota</CardTitle>
                <CardDescription>
                  Kelola status keaktifan anggota
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari anggota berdasarkan nama atau email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                >
                  Semua Anggota
                </Button>
                <Button
                  variant={filterStatus === 'aktif' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('aktif')}
                >
                  Aktif
                </Button>
                <Button
                  variant={filterStatus === 'tidak aktif' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('tidak aktif')}
                >
                  Tidak Aktif
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Bergabung</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id_user}>
                        <TableCell className="font-medium">
                          {member.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {member.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(member.status)}
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(member.role)}
                        </TableCell>
                        <TableCell>
                          {new Date(member.created_at).toLocaleDateString(
                            'id-ID',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {/* Show Aktifkan button only if status is false (tidak aktif) */}
                            {!member.status && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleAktifkan(member.id_user)}
                                disabled={isLoading === member.id_user}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                {isLoading === member.id_user ? 'Memproses...' : 'Aktifkan'}
                              </Button>
                            )}

                            {/* Show Nonaktifkan button only if status is true (aktif) */}
                            {member.status && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleNonaktifkan(member.id_user)}
                                disabled={isLoading === member.id_user}
                              >
                                <Power className="mr-1 h-4 w-4" />
                                {isLoading === member.id_user ? 'Memproses...' : 'Nonaktifkan'}
                              </Button>
                            )}

                            {/* Detail button always shown */}
                            <Link href={`/members/${member.id_user}`}>
                              <Button size="sm" variant="outline">
                                Detail
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Tidak ada anggota yang ditemukan sesuai dengan pencarian Anda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Search results info */}
            {searchQuery && (
              <div className="mt-4 text-sm text-muted-foreground">
                Menemukan {filteredMembers.length} anggota{filteredMembers.length !== 1 ? 's' : ''} yang cocok dengan "{searchQuery}"
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}