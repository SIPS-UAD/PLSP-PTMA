import SectionTitle from '@/components/customs/section-title';
import { ReactNode } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const SectionCardsLayout = ({
    children,
    section_title,
}: {
    children: ReactNode;
    section_title: string;
}) => {
    return (
        <section className="container w-full content-center px-1 py-10 md:px-10">
            <SectionTitle section_title={section_title}>
                <FaRegNewspaper className="scale-150 text-green-muhi" />
            </SectionTitle>
            <div className="grid gap-2 pt-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
                {children}
            </div>
        </section>
    );
};

export default SectionCardsLayout;
