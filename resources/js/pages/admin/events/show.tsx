import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users } from 'lucide-react';
import { useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Event',
    href: '/events',
  },
  {
    title: 'Lihat',
    href: '#',
  },
];

interface Event {
  id_event: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  status?: 'mendatang' | 'berlangsung' | 'terselenggarakan';
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
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'mendatang':
        return <Badge className="bg-yellow-100 text-yellow-800">Mendatang</Badge>;
      case 'berlangsung':
        return <Badge className="bg-green-100 text-green-800">Berlangsung</Badge>;
      case 'terselenggarakan':
        return <Badge className="bg-blue-100 text-blue-800">Terselenggarakan</Badge>;
      default:
        return <Badge variant="secondary">Tidak Diketahui</Badge>;
    }
  };

  // Calculate status if not provided
  const eventStatus = useMemo(() => {
    if (event.status) return event.status;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.tanggal);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate > today) {
      return 'mendatang';
    } else if (eventDate.getTime() === today.getTime()) {
      return 'berlangsung';
    } else {
      return 'terselenggarakan';
    }
  }, [event.tanggal, event.status]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Lihat Event - ${event.judul}`} />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/events">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Lihat Event</h1>
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
                <span className="font-semibold">Tanggal:</span>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/10 ring-inset">
                  {formatDate(event.tanggal)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                {getStatusBadge(eventStatus)}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold">Deskripsi</h3>
              <div
                className="prose dark:prose-invert max-w-none [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_div[data-align='center']]:text-center [&_div[data-align='left']]:text-left [&_div[data-align='right']]:text-right [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img[data-align='center']]:mx-auto [&_img[data-align='left']]:mr-auto [&_img[data-align='right']]:ml-auto [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: event.deskripsi }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Registrants Section */}
        {registrants.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Daftar Peserta ({registrants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>No. HP</TableHead>
                      <TableHead>LSP</TableHead>
                      <TableHead>PTMA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrants.map((registrant) => (
                      <TableRow key={registrant.id}>
                        <TableCell className="font-medium">
                          {registrant.nama}
                        </TableCell>
                        <TableCell>{registrant.email}</TableCell>
                        <TableCell>{registrant.no_hp}</TableCell>
                        <TableCell>{registrant.nama_lsp}</TableCell>
                        <TableCell>{registrant.nama_ptma}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
