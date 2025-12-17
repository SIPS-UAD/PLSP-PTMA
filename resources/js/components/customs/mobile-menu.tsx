import { navigationsLink } from '@/lib/navigation';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  expandedItems: Set<string>;
  onToggleExpanded: (itemText: string) => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  expandedItems,
  onToggleExpanded,
}: MobileMenuProps) => {
  const { auth } = usePage<SharedData>().props;

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="bg-opacity-50 absolute inset-0 bg-black transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="absolute inset-y-0 left-0 w-full transform overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
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
                      className="flex flex-1 items-center justify-between rounded-md px-4 py-3 text-left text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
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
                      className="flex-1 rounded-md px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
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
                        className="block rounded-md px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        {child.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Dashboard/Login Button - Mobile */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <Link
              href={getDashboardLink()}
              onClick={onClose}
              className="block w-full rounded-md bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 text-center text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-green-800"
            >
              {getAuthButtonText()}
            </Link>
          </div>

          {/* User Info - Only show when logged in */}
          {auth.user && (
            <div className="mt-4 rounded-md bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-600">Masuk sebagai:</p>
              <p className="text-base font-medium text-gray-900">
                {auth.user.name}
              </p>
              <p className="text-xs text-gray-500">{auth.user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
