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
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Edit, Eye, Plus, Trash2, Users } from 'lucide-react';
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
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(`/events/${id}`);
        }
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
                                +2 from last month
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
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                Registered participants
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Events
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">
                                Events this week
                            </p>
                        </CardContent>
                    </Card>
                </div>

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
                            {events.data.map((event) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
