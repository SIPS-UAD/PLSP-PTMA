import { navigationsLink } from '@/lib/navigation';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import MobileMenu from './mobile-menu';

const NavBar = () => {
    const { auth } = usePage<SharedData>().props;
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // 2. Buat Ref untuk menyimpan timer
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 3. Fungsi Logic Hover: Hapus timer jika mouse masuk kembali
    const handleMouseEnter = (text: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpenDropdown(text);
    };

    // 4. Fungsi Logic Leave: Beri jeda sebelum menutup (biar gak langsung ilang)
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (!mobileMenuOpen) {
            setExpandedItems(new Set());
        }
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setExpandedItems(new Set());
    };

    const toggleExpanded = (itemText: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemText)) {
                newSet.delete(itemText);
            } else {
                newSet.add(itemText);
            }
            return newSet;
        });
    };

    // Determine dashboard link based on user role
    const getDashboardLink = () => {
        if (!auth.user) {
            return '/login';
        }
        return auth.user.role === 'admin' || auth.user.role === 'super_admin'
            ? '/dashboard'
            : '/user-dashboard';
    };

    const getAuthButtonText = () => {
        return auth.user ? 'DASHBOARD' : 'LOGIN';
    };

    return (
        <>
            <nav className="nav-gradient-border fixed top-0 right-0 left-0 z-40 bg-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/plsp-ptma-logo.svg"
                                    alt="PLSP-PTMA"
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden items-center space-x-1 lg:flex">
                            {navigationsLink.map((item) => (
                                <div
                                    key={item.text}
                                    className="relative"
                                    onMouseEnter={() =>
                                        item.children &&
                                        handleMouseEnter(item.text)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.children ? (
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                        >
                                            <span>{item.text}</span>
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.link}
                                            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                        >
                                            <span>{item.text}</span>
                                        </Link>
                                    )}

                                    {/* Desktop Dropdown Menu */}
                                    {item.children &&
                                        openDropdown === item.text && (
                                            <div className="absolute top-full left-0 z-50 mt-1 w-56 rounded-md bg-white py-1 shadow-lg">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.text}
                                                        href={child.link}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {child.text}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            ))}
                            <Link
                                href={getDashboardLink()}
                                className="ml-10 flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                            >
                                {getAuthButtonText()}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={closeMobileMenu}
                expandedItems={expandedItems}
                onToggleExpanded={toggleExpanded}
            />
        </>
    );
};

export default NavBar;
