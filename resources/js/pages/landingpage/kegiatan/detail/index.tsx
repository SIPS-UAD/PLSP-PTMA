import DetailLayout from '@/layouts/landingpage/detail-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { formatDate } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface Event {
  id_event: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  thumbnail?: string;
  created_at: string;
  slug: string;
}

interface PageProps {
  event: Event;
}

const Index = ({ event }: PageProps) => {
  return (
    <LandingPageLayout>
      <DetailLayout section_title="Kegiatan">
        <section className="mx-auto max-w-6xl px-4 py-2 sm:px-2 md:py-2 lg:px-2">
          {/* Judul Kegiatan */}
          <h1 className="mb-4 text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
            {event.judul}
          </h1>

          {/* Metadata (Tanggal) */}
          <div className="mb-8 flex items-center border-b border-gray-200 pb-6 text-sm text-gray-500 md:text-base">
            <span className="mr-2 font-semibold text-blue-600">Kegiatan</span>
            <span className="mx-2 text-gray-300">•</span>
            <span>{formatDate(event.tanggal)}</span>
          </div>

          {/* Gambar Utama */}
          <div className="mb-8 overflow-hidden rounded-2xl shadow-lg md:mb-10">
            <img
              src={
                event.thumbnail
                  ? `/storage/${event.thumbnail}`
                  : '/default-event.jpg'
              }
              alt={event.judul}
              className="h-64 w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105 md:h-[450px]"
            />
          </div>

          {/* Deskripsi Kegiatan */}
          <article className="prose prose-lg max-w-none leading-relaxed text-gray-700">
            <div
              className="[&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: event.deskripsi }}
            />
          </article>

          {/* Tombol Kembali */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              href="/kegiatan"
              className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Daftar Kegiatan
            </Link>
          </div>
        </section>
      </DetailLayout>
    </LandingPageLayout>
  );
};

export default Index;
