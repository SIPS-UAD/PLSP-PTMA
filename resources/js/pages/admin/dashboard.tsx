import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PenSquare, CalendarPlus, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    latestPosts: {
        id_post: number;
        judul: string;
        tanggal: string;
    }[];
    latestEvents: {
        id_event: number;
        judul: string;
        tanggal: string;
    }[];
}

export default function Dashboard({ latestPosts, latestEvents }: DashboardProps) {
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Combine posts and events into one array
    const combinedItems = [
        ...latestPosts.map(post => ({
            ...post,
            type: 'post',
            id: post.id_post
        })),
        ...latestEvents.map(event => ({
            ...event,
            type: 'event',
            id: event.id_event
        }))
    ].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

    // Pagination logic
    const totalPages = Math.ceil(combinedItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = combinedItems.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Post</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                            <PenSquare className="h-12 w-12 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                Create and publish new posts to share information with your audience
                            </p>
                            <Link href="/posts/create">
                                <Button>
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Create Post
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Event</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                            <CalendarPlus className="h-12 w-12 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                Schedule and manage new events for your organization
                            </p>
                            <Link href="/events/create">
                                <Button>
                                    <CalendarPlus className="mr-2 h-4 w-4" />
                                    Create Event
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Show</span>
                            <Select
                                value={itemsPerPage.toString()}
                                onValueChange={(value) => {
                                    setItemsPerPage(Number(value));
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">entries</span>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((item) => (
                                <TableRow key={`${item.type}-${item.id}`}>
                                    <TableCell className="font-medium">
                                        {item.judul}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                            item.type === 'post' 
                                            ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10' 
                                            : 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/10'
                                        }`}>
                                            {item.type === 'post' ? 'Post' : 'Event'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{formatDate(item.tanggal)}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/${item.type}s/${item.id}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                > 
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </Button>
                                            </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between px-4 py-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {startIndex + 1} to {Math.min(endIndex, combinedItems.length)} of{' '}
                            {combinedItems.length} entries
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
