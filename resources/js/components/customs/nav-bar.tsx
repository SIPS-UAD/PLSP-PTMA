import { Link } from '@inertiajs/react';
import { navigationsLink } from '@/lib/navigation';
import { useState } from 'react';

const NavBar = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                            PLSP-PTMA
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigationsLink.map((item) => (
                            <div
                                key={item.text}
                                className="relative"
                                onMouseEnter={() => item.children && setOpenDropdown(item.text)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.link}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {item.text}
                                </Link>

                                {/* Dropdown Menu */}
                                {item.children && openDropdown === item.text && (
                                    <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.text}
                                                href={child.link}
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                {child.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setOpenDropdown(openDropdown ? null : 'mobile')}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
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
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {openDropdown === 'mobile' && (
                    <div className="md:hidden py-2">
                        {navigationsLink.map((item) => (
                            <div key={item.text}>
                                <Link
                                    href={item.link}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    {item.text}
                                </Link>
                                {item.children && (
                                    <div className="pl-6">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.text}
                                                href={child.link}
                                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                {child.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
