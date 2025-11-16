import NewsCard from '@/components/customs/news-card';
import Welcome from '@/components/customs/welcome';
import CardsLayout from '@/layouts/landingpage/cards-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { dummyNewsData } from '@/lib/newsData';

const page = () => {
    return (
        <LandingPageLayout>
            <section className="container h-auto pt-6 flex flex-col items-center xl:px-20">
                <Welcome />
                {/* main content */}
                <section className="flex container mt-2 gap-1">
                    {/* aside content */}

                    {/* content news section  */}
                    <section className='xl:w-3/4 '>
                        {/* header news section  */}
                        <div className='bg-blue-200 h-30'>dd</div>
                        {/* card container section */}
                        <CardsLayout>
                            {dummyNewsData.map((news) => (
                                <NewsCard
                                    key={news.title}
                                    image_link={news.image_link}
                                    title={news.title}
                                    release_date={news.release_date}
                                    content={news.content}
                                />
                            ))}
                        </CardsLayout>
                    </section>
                    <aside className='bg-green-200 xl:w-1/4 hidden xl:block'>dfd</aside>
                </section>
            </section>
        </LandingPageLayout>
    );
};

export default page;
