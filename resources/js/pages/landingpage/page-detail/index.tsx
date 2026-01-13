import DetailLayout from '@/layouts/landingpage/detail-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';

interface Post {
  id_post: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: string;
  slug: string;
  created_at: string;
}

interface PageProps {
  posts: Post[];
  sectionTitle: string;
}

const Page = ({ posts, sectionTitle }: PageProps) => {
  console.log(posts);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <LandingPageLayout>
      <DetailLayout section_title={sectionTitle}>
        <section className="container mx-auto max-w-6xl space-y-12 px-4 py-2 sm:px-2 md:py-2 lg:px-2">
          {posts.map((post) => (
            <article
              key={post.id_post}
              className="border-b border-gray-200 pb-10 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl leading-tight font-bold text-gray-900 md:text-3xl lg:text-4xl">
                {post.judul}
              </h2>

              <div className="mb-8 flex items-center border-b border-gray-100 pb-4 text-sm text-gray-500 md:text-base">
                <span className="mr-2 font-semibold text-blue-600">Admin</span>
                <span className="mx-2 text-gray-300">•</span>
                <span>{formatDate(post.created_at)}</span>
              </div>

              <div className="prose prose-lg max-w-none text-justify leading-relaxed text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: post.deskripsi }} />
              </div>
            </article>
          ))}
        </section>
      </DetailLayout>
    </LandingPageLayout>
  );
};

export default Page;
