import DetailLayout from '@/layouts/landingpage/detail-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { formatDate } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useMemo } from 'react';

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

interface StatusBadge {
  text: string;
  color: string;
}

const Index = ({ event }: PageProps) => {
  // Get event status based on date
  const getStatusBadge = (tanggal: string): StatusBadge => {
    const eventDate = new Date(tanggal);
    const now = new Date();

    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (eventDate > now) {
      return { text: 'Mendatang', color: 'bg-yellow-100 text-yellow-800' };
    } else if (eventDate.getTime() === now.getTime()) {
      return { text: 'Berlangsung', color: 'bg-green-100 text-green-800' };
    } else {
      return { text: 'Terselenggarakan', color: 'bg-blue-100 text-blue-800' };
    }
  };

  // Calculate status badge
  const statusBadge = useMemo(() => getStatusBadge(event.tanggal), [event.tanggal]);

  return (
    <LandingPageLayout>
      <DetailLayout section_title="Kegiatan">
        <section className="mx-auto max-w-6xl px-4 py-2 sm:px-2 md:py-2 lg:px-2">
          {/* Judul Kegiatan */}
          <h1 className="mb-4 text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
            {event.judul}
          </h1>

          {/* Metadata (Tanggal) */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6 md:text-base">
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2 font-semibold text-blue-600">Kegiatan</span>
              <span className="mx-2 text-gray-300">•</span>
              <span>{formatDate(event.tanggal)}</span>
            </div>
            <span className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap ${statusBadge.color}`}>
              {statusBadge.text}
            </span>
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
