import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Mail, Calendar, Shield, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Manage User',
        href: '#',
    },
];

interface UserShowProps {
    user: User;
}

export default function UserShow({ user }: UserShowProps) {
    const [showResetPassword, setShowResetPassword] = useState(false);
    
    const { data: passwordData, setData: setPasswordData, post: postPassword, processing: processingPassword, errors: passwordErrors, reset: resetPassword } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        postPassword(`/users/${user.id_user}/reset-password`, {
            onSuccess: () => {
                setShowResetPassword(false);
                resetPassword();
            }
        });
    };

    const getRoleBadge = (role?: string) => {
        if (role === 'super_admin') {
            return <Badge className="bg-purple-500">Super Admin</Badge>;
        }
        if (role === 'admin') {
            return <Badge className="bg-blue-500">Admin</Badge>;
        }
        return <Badge variant="secondary">Member</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage User - ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/users">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-semibold">Manage User</h1>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* User Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                            <CardDescription>
                                View user account details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Name</Label>
                                <div className="flex items-center gap-2">
                                    <p className="text-base font-medium">{user.name}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Email</Label>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-base">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Role</Label>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    {getRoleBadge(user.role)}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Email Verified</Label>
                                <div className="flex items-center gap-2">
                                    {user.email_verified_at ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                            Not Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Member Since</Label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-base">{new Date(user.created_at).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Password Reset Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Password Management</CardTitle>
                            <CardDescription>
                                Reset user password
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    As an administrator, you can reset the user's password. 
                                    The user will be able to log in with the new password immediately.
                                </AlertDescription>
                            </Alert>

                            {!showResetPassword ? (
                                <Button 
                                    onClick={() => setShowResetPassword(true)}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Reset Password
                                </Button>
                            ) : (
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={passwordData.password}
                                            onChange={(e) => setPasswordData('password', e.target.value)}
                                            placeholder="Enter new password"
                                            required
                                        />
                                        {passwordErrors.password && (
                                            <p className="text-sm text-red-600">
                                                {passwordErrors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={passwordData.password_confirmation}
                                            onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                            placeholder="Confirm new password"
                                            required
                                        />
                                        {passwordErrors.password_confirmation && (
                                            <p className="text-sm text-red-600">
                                                {passwordErrors.password_confirmation}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button 
                                            type="submit" 
                                            disabled={processingPassword}
                                            className="flex-1"
                                        >
                                            Reset Password
                                        </Button>
                                        <Button 
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setShowResetPassword(false);
                                                resetPassword();
                                            }}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}