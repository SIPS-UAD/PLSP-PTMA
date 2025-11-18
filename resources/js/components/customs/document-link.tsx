import { Link } from '@inertiajs/react';
import {
    IoDocumentAttachOutline,
    IoDocumentLockOutline,
} from 'react-icons/io5';

const DocumentLink = ({ document_link }: { document_link: string }) => {
    return (
        <Link className="mx-2 rounded-sm bg-green-200 p-2 text-green-muhi flex items-center gap-2 hover:-translate-y-0.5 transition-all">
            <IoDocumentAttachOutline className='scale-120'/>
            <IoDocumentLockOutline className='scale-120 hidden'/>
            <h1 className='font-medium'>{document_link}</h1>
        </Link>
    );
};

export default DocumentLink;
