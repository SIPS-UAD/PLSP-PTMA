import DetailLayout from '@/layouts/landingpage/detail-layout';
import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import { Link } from '@inertiajs/react'; // Opsional: jika ingin tombol kembali

interface Post {
  id: number;
  judul: string;
  slug: string;
  deskripsi: string;
  thumbnail: string | null;
  kategori: string;
  created_at: string;
  updated_at: string;
}

interface IndexProps {
  post: Post;
}

const Index = ({ post }: IndexProps) => {
  // Format tanggal
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
      <DetailLayout section_title="Berita">
        {/* Container Utama: Membatasi lebar agar nyaman dibaca (max-w-3xl) dan sentering (mx-auto) */}
        <section className="mx-auto max-w-6xl px-4 py-2 sm:px-2 md:py-2 lg:px-2">
          {/* 2. Judul Berita */}
          {/* Font besar, tebal, dan warna gelap agar kontras */}
          <h1 className="mb-4 text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
            {post.judul}
          </h1>

          {/* 3. Metadata (Penulis & Tanggal) */}
          {/* Flexbox untuk merapikan, warna abu-abu, dan garis pemisah di bawahnya */}
          <div className="mb-8 flex items-center border-b border-gray-200 pb-6 text-sm text-gray-500 md:text-base">
            <span className="mr-2 font-semibold text-blue-600">Admin</span>
            <span className="mx-2 text-gray-300">•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
          {/* 1. Gambar Utama */}
          {/* Menggunakan aspect-ratio agar tidak gepeng, rounded corner, dan shadow */}

          {/* 4. Isi Artikel */}
          {/* text-lg (sedikit lebih besar), leading-relaxed (jarak antar baris lega), warna abu-abu tua */}
          <article className="prose prose-lg max-w-none text-justify leading-relaxed text-gray-700">
            <div
              className="prose dark:prose-invert max-w-none [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_div[data-align='center']]:text-center [&_div[data-align='left']]:text-left [&_div[data-align='right']]:text-right [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img[data-align='center']]:mx-auto [&_img[data-align='left']]:mr-auto [&_img[data-align='right']]:ml-auto [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.deskripsi }}
            />
          </article>

          {/* 5. Tombol Kembali (Opsional Tambahan UX) */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              href={'/berita'}
              className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Daftar Berita
            </Link>
          </div>
        </section>
      </DetailLayout>
    </LandingPageLayout>
  );
};

export default Index;
