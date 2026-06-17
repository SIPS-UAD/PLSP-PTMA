import DocumentLink from '@/components/customs/document-link';
import NewsCard from '@/components/customs/news-card';
import Welcome from '@/components/customs/welcome';
import CardsLayout from '@/layouts/landingpage/cards-layout';
import KegiatanLayout from '@/layouts/landingpage/kegiatan-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import MaterialsLayout from '@/layouts/landingpage/materials-layout';
import { Head } from '@inertiajs/react';

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
  posts: Post[];
  events: Event[];
}

const Page = ({ posts, events }: PageProps) => {
  return (
    <LandingPageLayout>
      <Head title="Beranda" />

      <section className="mx-auto flex h-auto w-full max-w-7xl flex-col items-center px-5 pt-6 sm:px-6 lg:px-8">
        <Welcome />

        <section className="mt-2 flex w-full flex-col gap-1 xl:flex-row">
          <section className="xl:w-3/4">
            <KegiatanLayout events={events} />

            <CardsLayout>
              {posts.map((post) => (
                <NewsCard
                  key={post.id_post}
                  id={post.id_post}
                  image_link={
                    post.thumbnail
                      ? `/storage/${post.thumbnail}`
                      : '/default-image.jpg'
                  }
                  title={post.judul}
                  release_date={post.created_at}
                  content={post.deskripsi}
                  slug={post.slug}
                  type="berita"
                />
              ))}
            </CardsLayout>
          </section>

          <aside className="flex flex-col px-1 md:flex-row xl:block xl:w-1/4 xl:px-3">
            <MaterialsLayout section_title="Materi">
              <DocumentLink document_link="Materi Internal" nav_link="/materi/internalisasi" />
              <DocumentLink document_link="Materi Pelatihan Asesor" nav_link="/materi/pelatihan-asesor" />
              <DocumentLink document_link="Materi Penyusunan Dokumen" nav_link="/materi/penyusunan-dokumen" />
            </MaterialsLayout>

            {/* <MaterialsLayout section_title="Dokumen">
              <DocumentLink document_link="Dokumen Internal" nav_link="/dokumen/internal" />
              <DocumentLink document_link="Dokumen Eksternal" nav_link="/dokumen/eksternal" />
            </MaterialsLayout> */}
          </aside>
        </section>
      </section>
    </LandingPageLayout>
  );
};

export default Page;
