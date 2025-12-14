import {  tentangLink, sumberDayaLink } from '@/lib/navigation';
import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="flex flex-col bg-linear-to-r from-blue-muhi to-green-muhi px-5 pt-5 pb-4 text-sm text-white md:pt-10">
            {/* bungkus content */}
            <div
                id="container "
                className="flex w-full flex-col gap-3 self-center md:gap-5 xl:max-w-7xl"
            >
                {/* LOGO MUHAMMADIYAH */}
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xl font-bold md:text-2xl">
                            MUHAMMADIYAH
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="box-border rounded-xl border-1 bg-white/50 px-2 hover:scale-95">
                            A
                        </h1>
                        <h1 className="box-border rounded-xl border-1 bg-white/50 px-2 hover:scale-95">
                            B
                        </h1>
                        <h1 className="box-border rounded-xl border-1 bg-white/50 px-2 hover:scale-95">
                            C
                        </h1>
                    </div>
                </div>

                {/* LINE BREAK */}
                <hr />

                {/* KONTEN FOOTER */}
                <div id="contents_footer" className="flex flex-wrap">
                    <div
                        id="kontak"
                        className="mt-8 basis-1/2 md:basis-1/3 xl:basis-1/4"
                    >
                        <h1 className="mb-2 font-bold">KONTAK KAMI</h1>
                        <div className="flex flex-col gap-1 pl-2">
                            <h1 className="mx-1 mr-2 box-border w-fit border-b-1 border-transparent pt-1">Alamat <br/> Jl. Brawijaya No.89, Menayu Kidul, Tirtonirmolo, Kasihan, Bantul, Daerah Istimewa Yogyakarta 55181</h1>
                            <h1 className="mx-1 mr-2 box-border w-fit border-b-1 border-transparent pt-1">Telepon <br/> +62-274-376336, (0274) 4221040</h1>
                            <h1 className="mx-1 mr-2 box-border w-fit border-b-1 border-transparent pt-1">Email <br/> hibahpenelitian@muhammadiyah.id</h1>
                        </div>
                    </div>
                    <div
                        id="tentang"
                        className="mt-8 basis-1/2 md:basis-1/3 xl:basis-1/4"
                    >
                        <h1 className="mb-2 font-bold">TENTANG KAMI </h1>
                        <div className="flex flex-col gap-1 pl-2">
                            {tentangLink.map((nav) => (
                                <Link
                                    className="mx-1 box-border w-fit border-b-1 border-transparent pt-1 hover:border-white"
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
                        className="mt-8 basis-1/2 md:basis-1/3 xl:basis-1/4"
                    >
                        <h1 className="mb-2 font-bold">SUMBER DAYA</h1>
                        <div className="flex flex-col gap-1 pl-2">
                            {sumberDayaLink.map((nav) => (
                                <Link
                                    className="mx-1 box-border w-fit border-b-1 border-transparent pt-1 hover:border-white"
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
                <div className="mt-10 text-center opacity-70">
                    <h1>© Muhammadiyah 2025</h1>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
