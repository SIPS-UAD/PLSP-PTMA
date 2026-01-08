import NewsCard from '@/components/customs/news-card';
import Layout from '@/layouts/landingpage/landingpage-layout';
import SectionCardsLayout from '@/layouts/landingpage/section-cards-layout';

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

const Page = ({ posts }: PageProps) => {
  console.log(`data:`, posts);
  return (
    <Layout>
      <SectionCardsLayout section_title="Proses Lisensi BNSP">
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
          />
        ))}
      </SectionCardsLayout>
    </Layout>
  );
};

export default Page;
