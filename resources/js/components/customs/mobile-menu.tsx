import { Link } from '@inertiajs/react';
import { navigationsLink } from '@/lib/navigation';
import { useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    expandedItems: Set<string>;
    onToggleExpanded: (itemText: string) => void;
}

const MobileMenu = ({ isOpen, onClose, expandedItems, onToggleExpanded }: MobileMenuProps) => {
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Menu Panel */}
            <div className="absolute inset-y-0 left-0 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                    <button
                        onClick={onClose}
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
                                            onClick={() => onToggleExpanded(item.text)}
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
                                            onClick={onClose}
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
                                                onClick={onClose}
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
    );
};

export default MobileMenu;
