import SectionTitle from '@/components/customs/section-title';
import { ReactNode } from 'react';
import { IoBookOutline } from 'react-icons/io5';

const MaterialsLayout = ({
    children,
    section_title,
}: {
    children: ReactNode;
    section_title: string;
}) => {
    return (
        <div className="my-3 w-full rounded-sm md:mx-2 xl:mx-0">
            <SectionTitle section_title={section_title}>
                <IoBookOutline className="scale-120 text-green-muhi" />
            </SectionTitle>
            <div className="flex flex-col gap-1 pt-1">{children}</div>
        </div>
    );
};

export default MaterialsLayout;
