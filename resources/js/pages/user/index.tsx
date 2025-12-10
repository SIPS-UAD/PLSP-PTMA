import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LogOut, Search } from 'lucide-react';

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

            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
                {/* Kolom Pencarian */}
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto mb-12 max-w-4xl pl-40">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari"
                                className="w-full rounded-full border-2 border-gray-300 py-3 pl-12 focus:border-green-muhi focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Konten Utama */}
                    <div className="grid grid-cols-1 gap-8 lg:mx-auto lg:max-w-6xl lg:grid-cols-4">
                        {/* Sidebar Kiri - Info Pengguna */}
                        <div className="lg:col-span-1">
                            <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {user?.name}
                                    </h2>
                                </div>

                                {/* Daftar Detail Pengguna */}
                                <div className="space-y-2 border-t pt-4 text-sm text-gray-600">
                                    <div className="font-medium text-gray-700">
                                        {user?.nama_lsp}
                                    </div>
                                    <div>{user?.nama_ptma}</div>
                                    <div className="font-medium">
                                        {user?.no_hp}
                                    </div>
                                    <div className="font-medium">
                                        {user?.email}
                                    </div>
                                </div>

                                {/* Tombol Keluar */}
                                <div className="border-t pt-6">
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full"
                                    >
                                        <Button className="w-full rounded-full bg-gradient-to-r from-red-300 to-red-400 font-semibold text-gray-800 shadow-md hover:from-red-400 hover:to-red-500">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Keluar
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Konten Kanan - Kehadiran */}
                        <div className="lg:col-span-3">
                            {/* Header Kehadiran */}
                            <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-muhi to-green-muhi p-6 shadow-md">
                                <h3 className="text-lg font-semibold text-white">
                                    Kehadiran (Terakhir Diperbarui {lastUpdate})
                                </h3>
                            </div>

                            {/* Daftar Kehadiran */}
                            <div className="space-y-3">
                                {attendances.length > 0 ? (
                                    attendances.map((attendance) => (
                                        <div
                                            key={attendance.id}
                                            className="flex items-center justify-between rounded-lg border-l-4 border-green-muhi bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
                                        >
                                            <Button className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-2 font-semibold text-white shadow-md hover:from-green-600 hover:to-green-700">
                                                {attendance.status}
                                            </Button>
                                            <span className="font-medium text-gray-700">
                                                {attendance.event.title}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg bg-white p-8 text-center shadow-md">
                                        <p className="text-gray-500">
                                            Belum ada kehadiran.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
