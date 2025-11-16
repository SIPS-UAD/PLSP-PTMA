import SectionTitle from '@/components/customs/section-title';
import { ReactNode } from 'react';
import { IoBookOutline } from 'react-icons/io5';

const MaterialsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-red-100 my-3 rounded-sm w-full md:mx-2 xl:mx-0'>
            <SectionTitle section_title="Materi">
                <IoBookOutline />
            </SectionTitle>
            {children}
        </div>
    );
};

export default MaterialsLayout;
