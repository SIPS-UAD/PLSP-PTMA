import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ImageIcon, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Events',
    href: '/events',
  },
  {
    title: 'Create',
    href: '/events/create',
  },
];

export default function EventsCreate() {
  const { data, setData, post, processing, errors } = useForm({
    judul: '',
    deskripsi: '',
    tanggal: '',
    thumbnail: null as File | null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('thumbnail', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setData('thumbnail', null);
    setThumbnailPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/events', {
      forceFormData: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Event" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold">Create New Event</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-6 shadow-md p-5 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="judul">Title</Label>
            <Input
              id="judul"
              value={data.judul}
              onChange={(e) => setData('judul', e.target.value)}
              required
            />
            {errors.judul && (
              <p className="text-sm text-red-600">{errors.judul}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Description</Label>
            <RichTextEditor
              value={data.deskripsi}
              onChange={(value) => setData('deskripsi', value)}
              placeholder="Write your event description..."
            />
            {errors.deskripsi && (
              <p className="text-sm text-red-600">{errors.deskripsi}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tanggal">Date</Label>
            <Input
              id="tanggal"
              type="date"
              value={data.tanggal}
              onChange={(e) => setData('tanggal', e.target.value)}
              required
            />
            {errors.tanggal && (
              <p className="text-sm text-red-600">{errors.tanggal}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            {thumbnailPreview ? (
              <div className="relative inline-block">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="h-32 w-auto rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={removeThumbnail}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  onChange={handleThumbnailChange}
                  className="cursor-pointer"
                />
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            {errors.thumbnail && (
              <p className="text-sm text-red-600">{errors.thumbnail}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Max file size: 2MB. Supported formats: JPG, PNG, GIF
            </p>
          </div>

          <Button type="submit" disabled={processing}>
            {processing ? 'Creating...' : 'Create Event'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
