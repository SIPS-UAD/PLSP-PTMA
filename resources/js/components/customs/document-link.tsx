import { Link } from '@inertiajs/react';
import {
    IoDocumentAttachOutline,
    IoDocumentLockOutline,
} from 'react-icons/io5';

const DocumentLink = ({ document_link, nav_link }: { document_link: string, nav_link: string }) => {
    return (
        <Link href={nav_link} className="mx-2 rounded-sm bg-slate-100 p-2 text-slate-500 flex items-center gap-2 hover:bg-slate-300  transition-all">
            <IoDocumentAttachOutline className='scale-120'/>
            <IoDocumentLockOutline className='scale-120 hidden'/>
            <h1 className='font-medium'>{document_link}</h1>
        </Link>
    );
};

export default DocumentLink;
