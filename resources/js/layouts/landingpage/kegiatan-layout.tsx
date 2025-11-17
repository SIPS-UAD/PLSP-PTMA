import SectionTitle from '@/components/customs/section-title';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { formatDate } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { FaRegNewspaper } from 'react-icons/fa';
import { dummyNewsData } from '@/lib/newsData';

const KegiatanLayout = () => {
    return (
        <section className="container w-full content-center px-1 py-2">
            <SectionTitle section_title="Kegiatan">
                <FaRegNewspaper className="scale-150 text-green-muhi" />
            </SectionTitle>

            <div className="mt-4">
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full"
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {dummyNewsData.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="pl-4 basis-full"
                            >
                                <div className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-xl shadow-md">
                                    <img
                                        src={item.image_link}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                                    <div className="absolute right-0 bottom-0 left-0 flex flex-col items-center justify-end p-4 text-center text-white">
                                        <h1 className="mb-1 line-clamp-2 text-lg leading-snug font-bold">
                                            {item.title}
                                        </h1>
                                        <p className="text-xs font-medium text-gray-300">
                                            {formatDate(item.release_date)}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default KegiatanLayout;
