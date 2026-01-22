import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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

export default function UserProfileEdit({
    attendances,
    lastUpdate,
}: UserProfileProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordBaru, setShowPasswordBaru] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || '',
        nama_lsp: user?.nama_lsp || '',
        nama_ptma: user?.nama_ptma || '',
        nama_ketua: user?.nama_ketua || '',
        no_hp: user?.no_hp || '',
        email: user?.email || '',
        password: '',
        password_baru: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put('/user/profile', {
            preserveScroll: true,
            onSuccess: () => {
                // Reset password fields after successful update
                setData({
                    ...data,
                    password: '',
                    password_baru: '',
                    password_confirmation: '',
                });
            },
        });
    };

    return (
        <LandingPageLayout>
            <Head title="Edit Profil" />

            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold">
                                    Edit Profil
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Perbarui informasi profil Anda
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
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
                                                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                                                    Nama Lengkap
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="rounded-lg"
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-red-600">{errors.name}</p>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="rounded-lg"
                                                />
                                                {errors.email && (
                                                    <p className="text-sm text-red-600">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Nomor HP */}
                                            <div className="space-y-2">
                                                <Label htmlFor="no_hp" className="text-sm font-medium text-muted-foreground">
                                                    Nomor Handphone
                                                </Label>
                                                <Input
                                                    id="no_hp"
                                                    type="text"
                                                    value={data.no_hp}
                                                    onChange={(e) => setData('no_hp', e.target.value)}
                                                    className="rounded-lg"
                                                />
                                                {errors.no_hp && (
                                                    <p className="text-sm text-red-600">{errors.no_hp}</p>
                                                )}
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
                                                <Label htmlFor="nama_lsp" className="text-sm font-medium text-muted-foreground">
                                                    Nama Lembaga Sertifikasi Profesi (LSP)
                                                </Label>
                                                <Input
                                                    id="nama_lsp"
                                                    type="text"
                                                    value={data.nama_lsp}
                                                    onChange={(e) => setData('nama_lsp', e.target.value)}
                                                    className="rounded-lg"
                                                />
                                                {errors.nama_lsp && (
                                                    <p className="text-sm text-red-600">{errors.nama_lsp}</p>
                                                )}
                                            </div>

                                            {/* Nama PTMA */}
                                            <div className="space-y-2">
                                                <Label htmlFor="nama_ptma" className="text-sm font-medium text-muted-foreground">
                                                    Nama PTMA
                                                </Label>
                                                <Input
                                                    id="nama_ptma"
                                                    type="text"
                                                    value={data.nama_ptma}
                                                    onChange={(e) => setData('nama_ptma', e.target.value)}
                                                    className="rounded-lg"
                                                />
                                                {errors.nama_ptma && (
                                                    <p className="text-sm text-red-600">{errors.nama_ptma}</p>
                                                )}
                                            </div>

                                            {/* Nama Ketua */}
                                            <div className="space-y-2">
                                                <Label htmlFor="nama_ketua" className="text-sm font-medium text-muted-foreground">
                                                    Nama Ketua
                                                </Label>
                                                <Input
                                                    id="nama_ketua"
                                                    type="text"
                                                    value={data.nama_ketua}
                                                    onChange={(e) => setData('nama_ketua', e.target.value)}
                                                    className="rounded-lg"
                                                />
                                                {errors.nama_ketua && (
                                                    <p className="text-sm text-red-600">{errors.nama_ketua}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Column - Password Section */}
                                <div className="space-y-6">
                                    {/* Ubah Password */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Ubah Password</CardTitle>
                                            <CardDescription>
                                                Kosongkan jika tidak ingin mengubah
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Password Saat Ini */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                                                    Password Saat Ini
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        placeholder="Masukkan password saat ini"
                                                        className="rounded-lg pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                                {errors.password && (
                                                    <p className="text-sm text-red-600">{errors.password}</p>
                                                )}
                                            </div>

                                            {/* Password Baru */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password_baru" className="text-sm font-medium text-muted-foreground">
                                                    Password Baru
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password_baru"
                                                        type={showPasswordBaru ? 'text' : 'password'}
                                                        value={data.password_baru}
                                                        onChange={(e) => setData('password_baru', e.target.value)}
                                                        placeholder="Masukkan password baru"
                                                        className="rounded-lg pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswordBaru(!showPasswordBaru)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        {showPasswordBaru ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Minimal 8 karakter
                                                </p>
                                                {errors.password_baru && (
                                                    <p className="text-sm text-red-600">{errors.password_baru}</p>
                                                )}
                                            </div>

                                            {/* Konfirmasi Password */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation" className="text-sm font-medium text-muted-foreground">
                                                    Konfirmasi Password
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password_confirmation"
                                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        placeholder="Ulangi password baru"
                                                        className="rounded-lg pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        {showPasswordConfirmation ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                                {errors.password_confirmation && (
                                                    <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-start gap-3">
                                <Link href="/user/profile">
                                    <Button
                                        type="button"
                                        variant="outline"
                                    >
                                        Batal
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
