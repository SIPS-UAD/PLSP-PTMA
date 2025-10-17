"use client";
import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { navigationsLink } from "@/lib/dataTypes";

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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="z-50 flex h-16 fixed w-full items-center justify-center text-sm">
      <nav
        className={`border-1 border-white/40 backdrop-blur-md transition justify-between transition-discrete flex items-center gap-1 container  h-12 relative px-2 rounded-xl mx-2 hover:opacity-100 delay-50 duration-100  ease-in-out
          ${
            isAtTop || isMenuOpen || isScrolling
              ? "opacity-100 bg-linear-to-r from-blue-muhi to-green-muhi "
              : "bg-black/15  hover:opacity-100 hover:bg-linear-to-r hover:from-blue-muhi hover:to-green-muhi"
          }`}
      >
        {/* LEFT NAV */}
        <div className="flex ">
          <button onClick={toggleMenu} className="lg:hidden ">
            <HiMenu
              color="white"
              className="block  transition delay-50 ease-in-out size-8 hover:scale-110 active:scale-95"
            />
          </button>
          <div
            ref={menuRef}
            className={`border-white border-1 sm:border-0 shadow-md lg:shadow-none absolute top-14 left-0 bg-gray-100   text-gray-800 lg:text-white rounded-xl h-fit w-80 flex flex-col overflow-hidden transition-all duration-300 ease-in-out lg:static lg:flex-row lg:items-center lg:w-auto lg:bg-transparent lg:overflow-visible lg:gap-1
            ${
              isMenuOpen
                ? isScrolling
                  ? closeMenu()
                  : "opacity-100 visible"
                : "opacity-0 invisible lg:opacity-100 lg:visible"
            }
          `}
          >
            {navigationsLink.map((nav) => (
              <Link
                href={nav.link}
                key={nav.text}
                onClick={closeMenu}
                className=" lg:py-2 py-3 px-2  hover:bg-green-muhi hover:text-white  lg:hover:bg-white/20 lg:rounded-xl text-start w-full lg:text-center lg:text-nowrap  active:bg-green-muhi active:text-white"
              >
                {nav.text}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT NAV */}
        <div>
          <Link
            href="/user"
            className=" bg-white/20 hover:scale-105 h-fit mx-2 p-2 rounded-xl w-fit flex text-white transition ease-in-out duration-75 delay-50 active:scale-95 border-1 border-white"
          >
            LOGIN
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
