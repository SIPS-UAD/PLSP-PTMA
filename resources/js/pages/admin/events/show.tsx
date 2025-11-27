import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users } from 'lucide-react';
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

interface Registrant {
    id: number;
    nama: string;
    nama_lsp: string;
    nama_ptma: string;
    email: string;
    no_hp: string;
}

interface EventShowProps {
    event: Event;
    registrants: Registrant[];
}

export default function EventShow({ event, registrants = [] }: EventShowProps) {
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

                {/* Daftar Pendaftar Event */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <CardTitle>Event Registrants</CardTitle>
                            </div>
                            <Badge variant="secondary" className="text-sm">
                                {registrants.length} {registrants.length === 1 ? 'Registrant' : 'Registrants'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {registrants.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                                <p className="text-muted-foreground">No registrants yet</p>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">No</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>LSP</TableHead>
                                            <TableHead>PTMA</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {registrants.map((registrant, index) => (
                                            <TableRow key={registrant.id}>
                                                <TableCell className="font-medium">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {registrant.nama}
                                                </TableCell>
                                                <TableCell>{registrant.nama_lsp}</TableCell>
                                                <TableCell>{registrant.nama_ptma}</TableCell>
                                                <TableCell>{registrant.email}</TableCell>
                                                <TableCell>{registrant.no_hp}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}