import React from 'react';
import DetailLayout from '@/layouts/landingpage/detail-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { Link } from '@inertiajs/react'; // Opsional: jika ingin tombol kembali

const Index = () => {
    return (
        <LandingPageLayout>
            <DetailLayout section_title="Berita">
                {/* Container Utama: Membatasi lebar agar nyaman dibaca (max-w-3xl) dan sentering (mx-auto) */}
                <section className="max-w-6xl mx-auto px-4 sm:px-2 lg:px-2 py-2 md:py-2 ">
                    


                    {/* 2. Judul Berita */}
                    {/* Font besar, tebal, dan warna gelap agar kontras */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Tambang Timah Di Indonesia
                    </h1>

                    {/* 3. Metadata (Penulis & Tanggal) */}
                    {/* Flexbox untuk merapikan, warna abu-abu, dan garis pemisah di bawahnya */}
                    <div className="flex items-center text-sm md:text-base text-gray-500 mb-8 pb-6 border-b border-gray-200">
                        <span className="font-semibold text-blue-600 mr-2">Admin</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span>20 Agustus 2024</span>
                    </div>
                                        {/* 1. Gambar Utama */}
                    {/* Menggunakan aspect-ratio agar tidak gepeng, rounded corner, dan shadow */}
                    <div className="mb-8 md:mb-10 overflow-hidden rounded-2xl shadow-lg">
                        <img 
                            src="https://picsum.photos/seed/home/800/400" 
                            alt="Ilustrasi Tambang" 
                            className="w-full h-64 md:h-[450px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out" 
                        />
                    </div>

                    {/* 4. Isi Artikel */}
                    {/* text-lg (sedikit lebih besar), leading-relaxed (jarak antar baris lega), warna abu-abu tua */}
                    <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                        <p className="mb-6">
                            Tambang timah di Indonesia memiliki sejarah panjang dan
                            merupakan salah satu sektor penting dalam perekonomian negara.
                            Indonesia dikenal sebagai salah satu produsen timah terbesar di
                            dunia, dengan cadangan timah yang melimpah di berbagai wilayah.
                        </p>
                        <p>
                            Tambang timah utama di Indonesia terletak di Pulau Bangka dan
                            Belitung, yang telah menjadi pusat produksi timah sejak abad ke-19.
                            Eksplorasi dan pengelolaan sumber daya ini terus berkembang seiring 
                            dengan kemajuan teknologi pertambangan modern.
                        </p>
                    </article>

                    {/* 5. Tombol Kembali (Opsional Tambahan UX) */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <Link 
                            href="#" // Ganti dengan route list berita
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Daftar Berita
                        </Link>
                    </div>

                </section>
            </DetailLayout>
        </LandingPageLayout>
    );
};

export default Index;