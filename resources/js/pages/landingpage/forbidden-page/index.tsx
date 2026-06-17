import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, LockKeyhole, LogIn } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <>
      <Head title="Diperlukan Login" />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <LockKeyhole className="h-10 w-10 text-blue-600" />
            </div>

            {/* Heading */}
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Anda Perlu Login
            </h1>

            {/* Description */}
            <p className="mb-8 leading-relaxed text-gray-600">
              Anda harus login terlebih dahulu untuk mengakses halaman ini.
              Silakan masuk untuk melanjutkan atau buat akun jika Anda belum
              memilikinya.
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
              >
                <LogIn className="h-5 w-5" />
                Masuk
              </Link>

              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200"
              >
                <ArrowLeft className="h-5 w-5" />
                Kembali ke Beranda
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 underline hover:text-blue-700"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Sesi Anda mungkin telah habis atau Anda belum login.
          </p>
        </div>
      </div>
    </>
  );
}
