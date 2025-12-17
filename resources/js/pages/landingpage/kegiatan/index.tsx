import NewsCard from '@/components/customs/news-card';
import SectionCardsLayout from '@/layouts/landingpage/section-cards-layout';
import Layout from '../../../layouts/landingpage/landingpage-layout';

interface Event {
  id_event: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  thumbnail?: string;
  created_at: string;
  slug: string;
}

interface PageProps {
  events: Event[];
}

const index = ({ events }: PageProps) => {
  return (
    <Layout>
      <SectionCardsLayout section_title="Kegiatan">
        {events.map((event) => (
          <NewsCard
            key={event.id_event}
            id={String(event.id_event)}
            image_link={
              event.thumbnail
                ? `/storage/${event.thumbnail}`
                : '/default-event.jpg'
            }
            title={event.judul}
            release_date={event.tanggal}
            content={event.deskripsi}
          />
        ))}
      </SectionCardsLayout>
    </Layout>
  );
};

export default index;
