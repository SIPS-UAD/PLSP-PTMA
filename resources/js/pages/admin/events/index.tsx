import { useMemo, useState } from 'react';
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
import { Calendar, Edit, Eye, Plus, Trash2, Users, Upload, Search } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events Management',
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
        links: any[];
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
        if (!searchQuery.trim()) return events.data;
        const q = searchQuery.toLowerCase();
        return events.data.filter(
            (e) =>
                e.judul.toLowerCase().includes(q) ||
                e.deskripsi.toLowerCase().includes(q) ||
                formatDate(e.tanggal).toLowerCase().includes(q),
        );
    }, [events.data, searchQuery]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
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
            <Head title="Events Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Events
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{events.total}</div>
                            <p className="text-xs text-muted-foreground">
                                {upcomingCount} upcoming
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Upcoming Events
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Events on or after today
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                This Week
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{thisWeekCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Events in the current week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Events</CardTitle>
                                <CardDescription>
                                    Create, import, and manage events.
                                </CardDescription>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href="/events/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Event
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Search */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search events by title, description or date..."
                                    className="pl-10 pr-10"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map((event) => (
                                            <TableRow key={event.id_event}>
                                                <TableCell className="font-medium">
                                                    {event.judul}
                                                </TableCell>
                                                <TableCell className="max-w-md truncate">
                                                    {event.deskripsi}
                                                </TableCell>
                                                <TableCell>{formatDate(event.tanggal)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/events/${event.id_event}`}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/events/${event.id_event}/edit`}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(event.id_event)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                                No events found matching your search criteria.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Search results info */}
                        {searchQuery && (
                            <div className="mt-4 text-sm text-muted-foreground">
                                Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} matching "{searchQuery}"
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
