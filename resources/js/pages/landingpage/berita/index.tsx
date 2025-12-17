import NewsCard from '@/components/customs/news-card';
import SectionCardsLayout from '@/layouts/landingpage/section-cards-layout';
import Layout from '../../../layouts/landingpage/landingpage-layout';

interface Post {
  id_post: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: string;
  thumbnail?: string;
  created_at: string;
  slug: string;
}

interface PageProps {
  posts: Post[];
}

const page = ({ posts }: PageProps) => {
  return (
    <Layout>
      <SectionCardsLayout section_title="Berita">
        {posts.map((post) => (
          <NewsCard
            key={post.id_post}
            id={String(post.id_post)}
            image_link={
              post.thumbnail
                ? `/storage/${post.thumbnail}`
                : '/default-image.jpg'
            }
            title={post.judul}
            release_date={post.tanggal}
            content={post.deskripsi}
            slug={post.slug}
            type="berita"
          />
        ))}
      </SectionCardsLayout>
    </Layout>
  );
};

export default page;
