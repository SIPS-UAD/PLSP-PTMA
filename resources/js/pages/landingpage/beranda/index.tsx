import DocumentLink from '@/components/customs/document-link';
import NewsCard from '@/components/customs/news-card';
import Welcome from '@/components/customs/welcome';
import CardsLayout from '@/layouts/landingpage/cards-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import MaterialsLayout from '@/layouts/landingpage/materials-layout';
import { dummyNewsData } from '@/lib/newsData';

const page = () => {
    return (
        <LandingPageLayout>
            <section className="container flex h-auto flex-col items-center pt-6 xl:px-20">
                <Welcome />
                {/* main content */}
                <section className="container mt-2 flex flex-col gap-1 xl:flex-row">
                    {/* aside content */}

                    {/* content news section  */}
                    <section className="xl:w-3/4">
                        {/* header news section  */}
                        <div className="h-30 bg-blue-200">dd</div>
                        {/* card container section */}
                        <CardsLayout>
                            {dummyNewsData.map((news) => (
                                <NewsCard
                                    key={news.id}
                                    id={news.id}
                                    image_link={news.image_link}
                                    title={news.title}
                                    release_date={news.release_date}
                                    content={news.content}
                                />
                            ))}
                        </CardsLayout>
                    </section>
                    <aside className="flex flex-col px-1 md:flex-row xl:block xl:w-1/4 xl:px-3">
                        <MaterialsLayout>
                            <DocumentLink />
                            <DocumentLink />
                        </MaterialsLayout>
                        <MaterialsLayout>
                            <DocumentLink />
                            <DocumentLink />
                        </MaterialsLayout>
                    </aside>
                </section>
            </section>
        </LandingPageLayout>
    );
};

export default page;
