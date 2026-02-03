import { login } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Mail, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import CardLayout from '@/layouts/card-layout';

export default function RegisterPending() {
    return (
        <CardLayout>
            <Head title="Menunggu Aktivasi" />
            <Card className="rounded-xl">
                <CardHeader className="px-10 pt-8 pb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">
                        Pendaftaran Berhasil!
                    </CardTitle>
                    <CardDescription className="mt-2">
                        Akun Anda telah berhasil dibuat
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-10 pb-8">
                    <div className="space-y-6">
                        <div className="rounded-lg bg-blue-50 p-4">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-blue-600 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <p className="text-sm font-medium text-blue-900">
                                        Menunggu Persetujuan Admin
                                    </p>
                                    <p className="text-sm text-blue-700">
                                        Akun Anda saat ini sedang dalam proses verifikasi. 
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <span className="text-muted-foreground">
                                    Data pendaftaran telah tersimpan
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                                <span className="text-muted-foreground">
                                    Menunggu aktivasi dari admin
                                </span>
                            </div>
                        </div>
                        <Link href={login()}>
                            <Button className="w-full bg-blue-muhi hover:bg-blue-muhi/90">
                                Kembali ke Halaman Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </CardLayout>
    );
}