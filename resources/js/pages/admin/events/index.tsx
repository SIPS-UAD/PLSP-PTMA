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
import { formatDate } from '@/lib/dateFormat';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Edit, Eye, Plus, Search, Trash2, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manajemen Event',
    href: '/events',
  },
];

interface Event {
  id_event: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
}

interface EventsProps {
  events: {
    data: Event[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export default function EventsIndex({ events }: EventsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const now = useMemo(() => new Date(), []);
  const upcomingCount = useMemo(
    () =>
      events.data.filter((e) => {
        const d = new Date(e.tanggal);
        return d >= now;
      }).length,
    [events.data, now],
  );

  const thisWeekCount = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // start of week (Mon)
    start.setDate(diff);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return events.data.filter((e) => {
      const d = new Date(e.tanggal);
      return d >= start && d < end;
    }).length;
  }, [events.data]);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return events.data;
    return events.data.filter((e) => e.judul.toLowerCase().includes(q));
  }, [events.data, searchQuery]);

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      router.delete(`/events/${id}`);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Event" />

      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Event</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.total}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingCount} akan datang
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Event Mendatang
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <p className="text-xs text-muted-foreground">
                Event hari ini atau setelahnya
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Minggu Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisWeekCount}</div>
              <p className="text-xs text-muted-foreground">Event minggu ini</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Event</CardTitle>
                <CardDescription>
                  Buat dan kelola event Anda di sini.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/events/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Event
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari event berdasarkan judul..."
                  className="pr-10 pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <TableRow key={event.id_event}>
                        <TableCell className="font-medium">
                          {event.judul}
                        </TableCell>
                        <TableCell>{formatDate(event.tanggal)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2">
                            <Link href={`/events/${event.id_event}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                                Detail
                              </Button>
                            </Link>
                            <Link href={`/events/${event.id_event}/edit`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(event.id_event)}
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
                        colSpan={4}
                        className="py-6 text-center text-muted-foreground"
                      >
                        Tidak ada event yang ditemukan sesuai kriteria
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
                Ditemukan {filteredEvents.length} event yang sesuai dengan "
                {searchQuery}"
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
