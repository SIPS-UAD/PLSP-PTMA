import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Building2, Users, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manajemen Anggota',
    href: '/members',
  },
  {
    title: 'Detail Anggota',
    href: '#',
  },
];

interface Member extends User {
  status: boolean;
  nama_ketua?: string;
  no_hp?: string;
}

interface MemberDetailProps {
  member: Member;
}

export default function MemberDetail({ member: initialMember }: MemberDetailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState<Member>(initialMember);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Detail Anggota - ${member.name}`} />

      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/members">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-semibold">{member.name}</h1>
              <p className="text-sm text-muted-foreground">
                Bergabung pada {new Date(member.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Main Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Status Alert */}
            {!member.status && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Anggota ini saat ini tidak aktif. Hubungi administrator untuk mengaktifkan kembali.
                </AlertDescription>
              </Alert>
            )}

            {/* Informasi Pribadi */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>
                  Detail identitas anggota
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
                    <p className="text-base font-medium">{member.name}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{member.email}</p>
                  </div>
                </div>

                {/* Nomor HP */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Nomor HP
                  </label>
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{member.no_hp || 'Tidak tersedia'}</p>
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
                    <p className="text-base">{member.nama_lsp || 'Tidak tersedia'}</p>
                  </div>
                </div>

                {/* Nama PTMA */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Nama PTMA
                  </label>
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{member.nama_ptma || 'Tidak tersedia'}</p>
                  </div>
                </div>

                {/* Nama Ketua */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Nama Ketua
                  </label>
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{member.nama_ketua || 'Tidak tersedia'}</p>
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
                <CardTitle>Status Anggota</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  {getStatusBadge(member.status)}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Role
                  </label>
                  {getRoleBadge(member.role)}
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
                      {new Date(member.created_at).toLocaleDateString('id-ID', {
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
                      {new Date(member.updated_at).toLocaleDateString('id-ID', {
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

        {/* Back Button */}
        <div className="flex justify-start">
          <Link href="/members">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Anggota
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );

  function getStatusBadge(status: boolean) {
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
  }

  function getRoleBadge(role?: string) {
    if (role === 'super_admin') {
      return <Badge className="bg-purple-500">Super Admin</Badge>;
    }
    if (role === 'admin') {
      return <Badge className="bg-blue-500">Admin</Badge>;
    }
    return <Badge variant="secondary">Anggota</Badge>;
  }
}