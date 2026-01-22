import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function UserProfile({
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
                    <div className="mx-auto max-w-4xl">
                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Edit Data Pengguna
                            </h1>
                        </div>

                        {/* Card Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen Profil</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Nama */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-lg font-medium"
                                        >
                                            Nama
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="col-span-2 rounded-lg border-2 border-gray-300 px-4 py-3"
                                        />
                                        {errors.name && (
                                            <p className="col-span-2 col-start-2 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Nama LSP */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="nama_lsp"
                                            className="text-lg font-medium"
                                        >
                                            Nama LSP
                                        </Label>
                                        <Input
                                            id="nama_lsp"
                                            type="text"
                                            value={data.nama_lsp}
                                            onChange={(e) =>
                                                setData('nama_lsp', e.target.value)
                                            }
                                            className="col-span-2 rounded-lg border-2 border-gray-300 px-4 py-3"
                                        />
                                        {errors.nama_lsp && (
                                            <p className="col-span-2 col-start-2 text-sm text-red-600">{errors.nama_lsp}</p>
                                        )}
                                    </div>

                                    {/* Nama PTMA */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="nama_ptma"
                                            className="text-lg font-medium"
                                        >
                                            Nama PTMA
                                        </Label>
                                        <Input
                                            id="nama_ptma"
                                            type="text"
                                            value={data.nama_ptma}
                                            onChange={(e) =>
                                                setData('nama_ptma', e.target.value)
                                            }
                                            className="col-span-2 rounded-lg border-2 border-gray-300 px-4 py-3"
                                        />
                                        {errors.nama_ptma && (
                                            <p className="col-span-2 col-start-2 text-sm text-red-600">{errors.nama_ptma}</p>
                                        )}
                                    </div>

                                    {/* Nama Ketua */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="nama_ketua"
                                            className="text-lg font-medium"
                                        >
                                            Nama Ketua
                                        </Label>
                                        <Input
                                            id="nama_ketua"
                                            type="text"
                                            value={data.nama_ketua}
                                            onChange={(e) =>
                                                setData('nama_ketua', e.target.value)
                                            }
                                            className="col-span-2 rounded-lg border-2 border-gray-300 px-4 py-3"
                                        />
                                        {errors.nama_ketua && (
                                            <p className="col-span-2 col-start-2 text-sm text-red-600">{errors.nama_ketua}</p>
                                        )}
                                    </div>

                                    {/* Nomor Handphone */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="no_hp"
                                            className="text-lg font-medium"
                                        >
                                            Nomor Handphone
                                        </Label>
                                        <Input
                                            id="no_hp"
                                            type="text"
                                            value={data.no_hp}
                                            onChange={(e) =>
                                                setData('no_hp', e.target.value)
                                            }
                                            className="col-span-2 rounded-lg border-2 border-gray-300 px-4 py-3"
                                        />
                                        {errors.no_hp && (
                                            <p className="col-span-2 col-start-2 text-sm text-red-600">{errors.no_hp}</p>
                                        )}
                                    </div>

                                    {/* Alamat Surel */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="email"
                                            className="text-lg font-medium"
                                        >
                                            Alamat Surel
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="col-span-2 rounded-lg border-2 border-gray-300 px-4 py-3"
                                        />
                                        {errors.email && (
                                            <p className="col-span-2 col-start-2 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="password"
                                            className="text-lg font-medium"
                                        >
                                            Password
                                        </Label>
                                        <div className="col-span-2 space-y-2">
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData('password', e.target.value)
                                                    }
                                                    placeholder="Password saat ini"
                                                    className="rounded-lg border-2 border-gray-300 px-4 py-3 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Diperlukan jika ingin mengubah password
                                            </p>
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password Baru */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="password_baru"
                                            className="text-lg font-medium"
                                        >
                                            Password Baru
                                        </Label>
                                        <div className="col-span-2 space-y-2">
                                            <div className="relative">
                                                <Input
                                                    id="password_baru"
                                                    type={showPasswordBaru ? 'text' : 'password'}
                                                    value={data.password_baru}
                                                    onChange={(e) =>
                                                        setData('password_baru', e.target.value)
                                                    }
                                                    placeholder="Password Baru"
                                                    className="rounded-lg border-2 border-gray-300 px-4 py-3 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswordBaru(!showPasswordBaru)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswordBaru ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Minimal 8 karakter
                                            </p>
                                            {errors.password_baru && (
                                                <p className="text-sm text-red-600">{errors.password_baru}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Verifikasi Password */}
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="text-lg font-medium"
                                        >
                                            Verifikasi Password
                                        </Label>
                                        <div className="col-span-2 space-y-2">
                                            <div className="relative">
                                                <Input
                                                    id="password_confirmation"
                                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                                    value={data.password_confirmation}
                                                    onChange={(e) =>
                                                        setData(
                                                            'password_confirmation',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Verifikasi Password"
                                                    className="rounded-lg border-2 border-gray-300 px-4 py-3 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswordConfirmation ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password_confirmation && (
                                                <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-3 pt-6 border-t">
                                        <Link href="/user/profile">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="px-8 py-3"
                                            >
                                                Batal
                                            </Button>
                                        </Link>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-lg bg-green-500 px-8 py-3 text-white hover:bg-green-600"
                                        >
                                            {processing ? 'Menyimpan...' : 'Simpan'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
