import SectionTitle from '@/components/customs/section-title';
import { ReactNode } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const DetailLayout = ({
    children,
    section_title,
}: {
    children: ReactNode;
    section_title: string;
}) => {
    return (
        <section className="container w-full content-center px-1 py-10 md:px-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-2 lg:px-2 py-2 md:py-2 ">
                <SectionTitle section_title={section_title}>
                    <FaRegNewspaper className="scale-150 text-green-muhi" />
                </SectionTitle>
            </div>
            <section className="flex flex-col gap-4 pt-2">{children}</section>
        </section>
    );
};

export default DetailLayout;
