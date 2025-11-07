import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
    {
        title: 'View',
        href: '#',
    },
];

interface Event {
    id_event: number;
    judul: string;
    deskripsi: string;
    tanggal: string;
}

interface EventShowProps {
    event: Event;
}

export default function EventShow({ event }: EventShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`View Event - ${event.judul}`} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/events">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-semibold">View Event</h1>
                    </div>
                    <Link href={`/events/${event.id_event}/edit`}>
                        <Button>Edit Event</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{event.judul}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Date:</span>
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                    {formatDate(event.tanggal)}
                                </span>
                            </div>
                        </div>

                        <div className="prose max-w-none dark:prose-invert">
                            <h3 className="text-base font-semibold">Description</h3>
                            <p className="whitespace-pre-line">{event.deskripsi}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}