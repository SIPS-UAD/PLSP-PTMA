import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Mail, Phone, Building2, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Attendance {
    id: number;
    status: string;
    event: {
        id_event: number;
        title: string;
        date: string;
    };
}

interface UserProfileProps {
    attendances: Attendance[];
    lastUpdate: string;
}

export default function UserProfile({
    attendances,
    lastUpdate,
}: UserProfileProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // Function to get status badge based on user status
    const getStatusBadge = (status?: boolean) => {
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
    };

    return (
        <LandingPageLayout>
            <Head title="Profil Pengguna" />

            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold">
                                    {user?.name}
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Bergabung pada {new Date(user?.created_at || '').toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                            >
                                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                    Keluar
                                </Button>
                            </Link>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Left Column - Main Information */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Informasi Pribadi */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informasi Pribadi</CardTitle>
                                        <CardDescription>
                                            Detail identitas pengguna
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Nama */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Nama Lengkap
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-base font-medium">{user?.name || '-'}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Email
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-base">{user?.email || '-'}</p>
                                            </div>
                                        </div>

                                        {/* Nomor HP */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Nomor Handphone
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-base">{user?.no_hp || '-'}</p>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Password
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <p className="text-base">*******</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Informasi Organisasi */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informasi Organisasi</CardTitle>
                                        <CardDescription>
                                            Detail lembaga dan organisasi
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Nama LSP */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Nama Lembaga Sertifikasi Profesi (LSP)
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-base">{user?.nama_lsp || '-'}</p>
                                            </div>
                                        </div>

                                        {/* Nama PTMA */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Nama PTMA
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-base">{user?.nama_ptma || '-'}</p>
                                            </div>
                                        </div>

                                        {/* Nama Ketua */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Nama Ketua
                                            </label>
                                            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-base">{user?.nama_ketua || '-'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Status & Meta Information */}
                            <div className="space-y-6">
                                {/* Status Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Status Pengguna</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Status
                                            </label>
                                            {getStatusBadge(user?.status)}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Role
                                            </label>
                                            <Badge variant="secondary">Member</Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Waktu Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informasi Waktu</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Bergabung
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">
                                                    {new Date(user?.created_at || '').toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Terakhir Diperbarui
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">
                                                    {new Date(user?.updated_at || '').toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="mt-6 flex justify-start">
                            <Link href="/user/edit">
                                <Button className="bg-green-500 hover:bg-green-600 text-white">
                                    Edit Profil
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
