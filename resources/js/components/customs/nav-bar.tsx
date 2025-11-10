import { Link } from '@inertiajs/react';
import { navigationsLink } from '@/lib/navigation';
import { useState, useEffect } from 'react';

const NavBar = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

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

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                PLSP-PTMA
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navigationsLink.map((item) => (
                                <div
                                    key={item.text}
                                    className="relative"
                                    onMouseEnter={() => item.children && setOpenDropdown(item.text)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={item.link}
                                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1"
                                    >
                                        <span>{item.text}</span>
                                        {item.children && (
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
                                        )}
                                    </Link>

                                    {/* Desktop Dropdown Menu */}
                                    {item.children && openDropdown === item.text && (
                                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-50">
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
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
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

            {/* Full Screen Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={closeMobileMenu}
                        aria-hidden="true"
                    />

                    {/* Menu Panel */}
                    <div className="absolute inset-y-0 left-0 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
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
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Items */}
                        <div className="px-4 py-4">
                            {navigationsLink.map((item) => {
                                const isExpanded = expandedItems.has(item.text);
                                const hasChildren = item.children && item.children.length > 0;

                                return (
                                    <div key={item.text} className="mb-1">
                                        {/* Parent Item */}
                                        <div className="flex items-center justify-between">
                                            {hasChildren ? (
                                                <button
                                                    onClick={() => toggleExpanded(item.text)}
                                                    className="flex-1 text-left px-4 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between"
                                                >
                                                    <span>{item.text}</span>
                                                    <svg
                                                        className={`h-5 w-5 transition-transform ${
                                                            isExpanded ? 'rotate-180' : ''
                                                        }`}
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
                                                    onClick={closeMobileMenu}
                                                    className="flex-1 px-4 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                                >
                                                    {item.text}
                                                </Link>
                                            )}
                                        </div>

                                        {/* Children Items */}
                                        {hasChildren && isExpanded && (
                                            <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                                                {item.children?.map((child) => (
                                                    <Link
                                                        key={child.text}
                                                        href={child.link}
                                                        onClick={closeMobileMenu}
                                                        className="block px-4 py-2.5 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >
                                                        {child.text}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;
