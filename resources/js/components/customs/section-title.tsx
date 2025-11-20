import { ReactNode } from 'react';

const SectionTitle = ({
    section_title,
    children,
}: {
    section_title: string;
    children: ReactNode;
}) => {
    return (
        <div className="ml-2 flex items-center gap-2 pb-2 text-center">
            {children}
            <h2 className="text-base font-semibold text-gray-600 sm:text-xl">
                {section_title}
            </h2>
        </div>
    );
};

export default SectionTitle;
