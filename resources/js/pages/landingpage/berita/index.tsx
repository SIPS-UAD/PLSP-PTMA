import NewsCard from '@/components/customs/news-card';
import SectionCardsLayout from '@/layouts/landingpage/section-cards-layout';
import { dummyNewsData } from '@/lib/newsData';
import Layout from '../../../layouts/landingpage/landingpage-layout';

const page = () => {
    return (
        <Layout>
            <SectionCardsLayout section_title="Berita">
                {dummyNewsData.splice(0, 8).map((news) => (
                    <NewsCard
                        key={news.id}
                        id={news.id}
                        image_link={news.image_link}
                        title={news.title}
                        release_date={news.release_date}
                        content={news.content}
                    />
                ))}
            </SectionCardsLayout>
        </Layout>
    );
};

export default page;
