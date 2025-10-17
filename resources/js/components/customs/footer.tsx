import React from "react";
import { navigationsLink } from "@/lib/dataTypes";
import {Link} from "@inertiajs/react"

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-blue-muhi to-green-muhi text-white text-sm pt-5 pb-4  px-5 flex flex-col md:pt-10">
      {/* bungkus content */}
      <div
        id="container "
        className=" flex flex-col gap-3 w-full xl:max-w-7xl self-center md:gap-5"
      >
        {/* LOGO MUHAMMADIYAH */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">MUHAMMADIYAH</h1>
          </div>
          <div className="flex  items-center gap-3">
            <h1 className="bg-white/50 px-2 rounded-xl border-1 box-border hover:scale-95">
              A
            </h1>
            <h1 className="bg-white/50 px-2 rounded-xl border-1 box-border hover:scale-95">
              B
            </h1>
            <h1 className="bg-white/50 px-2 rounded-xl border-1 box-border hover:scale-95">
              C
            </h1>
          </div>
        </div>

        {/* LINE BREAK */}
        <hr />

        {/* KONTEN FOOTER */}
        <div id="contents_footer" className="flex flex-wrap">
          <div
            id="shortlink"
            className="mt-8 basis-1/2 md:basis-1/3 xl:basis-1/4 "
          >
            <h1 className="font-bold mb-2">AKSI CEPAT</h1>
            <div className="flex flex-col pl-2 gap-1">
              {navigationsLink.map((nav) => (
                <Link
                  className="border-b-1 border-transparent hover:border-white box-border mx-1 pt-1 w-fit"
                  key={nav.text}
                  href={nav.link}
                >
                  {nav.text}
                </Link>
              ))}
            </div>
          </div>
          <div
            id="tentang"
            className="mt-8 basis-1/2  md:basis-1/3 xl:basis-1/4 "
          >
            <h1 className="font-bold mb-2">TENTANG KAMI </h1>
            <div className="flex flex-col pl-2 gap-1 ">
              {navigationsLink.map((nav) => (
                <Link
                  className="border-b-1 border-transparent hover:border-white box-border mx-1 pt-1 w-fit"
                  key={nav.text}
                  href={nav.link}
                >
                  {nav.text}
                </Link>
              ))}
            </div>
          </div>
          <div
            id="pengaturan"
            className="mt-8 basis-1/2 md:basis-1/3 xl:basis-1/4 "
          >
            <h1 className="font-bold mb-2">PERATURAN</h1>
            <div className="flex flex-col pl-2 gap-1">
              {navigationsLink.map((nav) => (
                <Link
                  className="border-b-1 border-transparent hover:border-white box-border mx-1 pt-1 w-fit"
                  key={nav.text}
                  href={nav.link}
                >
                  {nav.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* JEJAK */}
        <div className=" text-center mt-10 opacity-70">
          <h1>© Muhammadiyah 2025</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
