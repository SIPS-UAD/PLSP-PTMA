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
    title: 'Edit',
    href: '#',
  },
];

interface Event {
  id_event: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  thumbnail: string | null;
}

interface EventsEditProps {
  event: Event;
}

export default function EventsEdit({ event }: EventsEditProps) {
  const {
    data,
    setData,
    post: submit,
    processing,
    errors,
  } = useForm({
    judul: event.judul,
    deskripsi: event.deskripsi,
    tanggal: formatDateForInput(event.tanggal),
    thumbnail: null as File | null,
    _method: 'PUT',
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    event.thumbnail ? `/storage/${event.thumbnail}` : null,
  );

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
    submit(`/events/${event.id_event}`, {
      forceFormData: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Event" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold">Edit Event</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
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

          <div className="flex gap-2">
            <Button type="submit" disabled={processing}>
              {processing ? 'Updating...' : 'Update Event'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
