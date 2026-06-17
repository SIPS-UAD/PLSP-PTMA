import SectionTitle from '@/components/customs/section-title';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const CardsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container w-full content-center px-1 py-2">
      <SectionTitle section_title="Berita">
        <FaRegNewspaper className="scale-150 text-green-muhi" />
      </SectionTitle>
      <div className="grid gap-2 pt-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [&>*:nth-child(n+5)]:hidden md:[&>*:nth-child(n+5)]:block md:[&>*:nth-child(n+7)]:hidden xl:[&>*:nth-child(n+7)]:block">
        {children}
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href="/berita"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
        >
          Lihat Semua Berita
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CardsLayout;
