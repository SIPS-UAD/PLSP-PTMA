import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

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

    return (
        <LandingPageLayout>
            <Head title="Profil Pengguna" />

            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Data Pengguna
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="rounded-full bg-green-500 px-6 py-2 text-sm font-semibold text-white">
                                    AKTIF
                                </span>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                >
                                    <button className="text-red-500 hover:text-red-700 font-medium">
                                        Keluar
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Card View */}
                        <Card className="shadow-lg">
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    {/* Nama */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Nama
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            {user?.name || '-'}
                                        </div>
                                    </div>

                                    {/* Nama LSP */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Nama LSP
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            {user?.nama_lsp || '-'}
                                        </div>
                                    </div>

                                    {/* Nama PTMA */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Nama PTMA
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            {user?.nama_ptma || '-'}
                                        </div>
                                    </div>

                                    {/* Nama Ketua */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Nama Ketua
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            {user?.nama_ketua || '-'}
                                        </div>
                                    </div>

                                    {/* Nomor Handphone */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Nomor Handphone
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            {user?.no_hp || '-'}
                                        </div>
                                    </div>

                                    {/* Alamat Surel */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Alamat Surel
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            {user?.email || '-'}
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="flex items-start">
                                        <div className="w-48 font-semibold text-gray-700">
                                            Password
                                        </div>
                                        <div className="flex-1 text-gray-600">
                                            *******
                                        </div>
                                    </div>

                                    {/* Edit Button */}
                                    <div className="flex justify-end pt-6 border-t">
                                        <Link href="/user/edit">
                                            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2">
                                                Edit
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
