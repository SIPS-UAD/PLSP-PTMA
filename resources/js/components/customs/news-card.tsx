import { formatDate } from '@/lib/utils';
import type { NewsData } from '@/types';

const NewsCard = ({ image_link, title, release_date }: NewsData) => {
    return (
        <div className="border-b-1 pb-2 sm:border-0">
            <div className="flex h-20 transform transition-transform duration-300 hover:-translate-y-0.5 sm:h-56 sm:flex-col md:h-64 xl:h-72">
                <img
                    src={image_link}
                    alt={title}
                    width={200}
                    height={200}
                    className="h-full w-1/3 min-w-1/3 rounded-lg object-cover sm:h-2/3 sm:w-full md:rounded-lg"
                />
                <div className="px-4 sm:px-0 sm:pt-2">
                    <p className="mb-1 text-sm text-gray-500">{String(formatDate(release_date))}</p>
                    <h3 className="text-base leading-5 font-semibold text-gray-800 md:text-lg line-clamp-2">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
