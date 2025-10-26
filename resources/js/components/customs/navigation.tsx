'use client';
import { navigationsLink } from '@/lib/dataTypes';
import { login } from '@/routes';
import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed z-50 flex h-16 w-full items-center justify-center text-sm">
            <nav
                className={`relative container mx-2 flex h-12 items-center justify-between gap-1 rounded-xl border-1 border-white/40 px-2 backdrop-blur-md transition transition-discrete delay-50 duration-100 ease-in-out hover:opacity-100 ${
                    isAtTop || isMenuOpen || isScrolling
                        ? 'bg-linear-to-r from-blue-muhi to-green-muhi opacity-100'
                        : 'bg-black/15 hover:bg-linear-to-r hover:from-blue-muhi hover:to-green-muhi hover:opacity-100'
                }`}
            >
                {/* LEFT NAV */}
                <div className="flex">
                    <button onClick={toggleMenu} className="lg:hidden">
                        <HiMenu
                            color="white"
                            className="block size-8 transition delay-50 ease-in-out hover:scale-110 active:scale-95"
                        />
                    </button>
                    <div
                        ref={menuRef}
                        className={`absolute top-14 left-0 flex h-fit w-80 flex-col overflow-hidden rounded-xl border-1 border-white bg-gray-100 text-gray-800 shadow-md transition-all duration-300 ease-in-out sm:border-0 lg:static lg:w-auto lg:flex-row lg:items-center lg:gap-1 lg:overflow-visible lg:bg-transparent lg:text-white lg:shadow-none ${
                            isMenuOpen
                                ? isScrolling
                                    ? closeMenu()
                                    : 'visible opacity-100'
                                : 'invisible opacity-0 lg:visible lg:opacity-100'
                        }`}
                    >
                        {navigationsLink.map((nav) => (
                            <Link
                                href={nav.link}
                                key={nav.text}
                                onClick={closeMenu}
                                className="w-full px-2 py-3 text-start hover:bg-green-muhi hover:text-white active:bg-green-muhi active:text-white lg:rounded-xl lg:py-2 lg:text-center lg:text-nowrap lg:hover:bg-white/20"
                            >
                                {nav.text}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* RIGHT NAV */}
                <div>
                    <Link
                        href={login()}
                        className="mx-2 flex h-fit w-fit rounded-xl border-1 border-white bg-white/20 p-2 text-white transition delay-50 duration-75 ease-in-out hover:scale-105 active:scale-95"
                    >
                        LOGIN
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
