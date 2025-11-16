import SectionTitle from '@/components/customs/section-title';
import { ReactNode } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const CardsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className="container w-full content-center px-1 py-2">
            <SectionTitle section_title="Berita">
                <FaRegNewspaper className="scale-150 text-green-muhi" />
            </SectionTitle>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {children}
            </div>
        </section>
    );
};

export default CardsLayout;
