import SectionTitle from '@/components/customs/section-title';
import { ReactNode } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const CardsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className="container w-full content-center px-1 py-2">
            <SectionTitle section_title="Berita">
                <FaRegNewspaper className="scale-150 text-green-muhi" />
            </SectionTitle>
            <div className="grid gap-2 pt-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [&>*:nth-child(n+5)]:hidden xl:[&>*:nth-child(n+5)]:block md:[&>*:nth-child(n+7)]:block">
                {children}
            </div>
        </section>
    );
};

export default CardsLayout;
