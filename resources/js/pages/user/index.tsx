import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { Head } from '@inertiajs/react';
import { LogOut, Search } from 'lucide-react';

interface UserProfile {
    name: string;
    organization?: string;
    position?: string;
    phone?: string;
    email?: string;
    password?: string;
}

interface UserProfileProps {
    user: UserProfile;
}

export default function UserProfile({ user }: UserProfileProps) {
    return (
        <LandingPageLayout>
            <Head title="User Profile" />

            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
                {/* Search Bar */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto mb-12 pl-40">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-12 py-3 rounded-full border-2 border-gray-300 focus:border-green-muhi focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:max-w-6xl lg:mx-auto">
                        {/* Left Sidebar - User Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {'Muhammad Achmad Machad'}
                                    </h2>
                                </div>

                                {/* User Details List */}
                                <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                                    <div className="font-medium text-gray-700">
                                        {'LSP Ahmad Machad'}
                                    </div>
                                    <div>
                                        {'PTMA Ahmad Machad'}
                                    </div>
                                    <div>{'LSP Ahmad'}</div>
                                    <div>Ketua Ahmad</div>
                                    <div className="font-medium">
                                        {'08943274274273423'}
                                    </div>
                                    <div className="font-medium">
                                        {'ahmad123@gmail.com'}
                                    </div>
                                    <div>**************</div>
                                </div>

                                {/* Logout Button */}
                                <div className="pt-6 border-t">
                                    <Button
                                        className="w-full rounded-full bg-gradient-to-r from-red-300 to-red-400 text-gray-800 hover:from-red-400 hover:to-red-500 font-semibold shadow-md"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Attendances */}
                        <div className="lg:col-span-3">
                            {/* Attendances Header */}
                            <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-muhi to-green-muhi p-6 shadow-md">
                                <h3 className="font-semibold text-white text-lg">
                                    Attendances (Last Update 20-11-2025)
                                </h3>
                            </div>

                            {/* Attendances List */}
                            <div className="space-y-3">
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-muhi"
                                    >
                                        <Button
                                            className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-2 text-white hover:from-green-600 hover:to-green-700 font-semibold shadow-md"
                                        >
                                            Attending
                                        </Button>
                                        <span className="text-gray-700 font-medium">Judul Event</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
