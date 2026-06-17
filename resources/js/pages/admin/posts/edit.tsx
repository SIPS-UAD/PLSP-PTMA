import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown, ImageIcon, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Posts',
    href: '/posts',
  },
  {
    title: 'Edit',
    href: '#',
  },
];

interface Category {
  value: string;
  label: string;
}

interface Post {
  id_post: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: string;
  thumbnail: string | null;
}

interface PostsEditProps {
  post: Post;
  categories: Category[];
}

export default function PostsEdit({ post, categories = [] }: PostsEditProps) {
  const {
    data,
    setData,
    post: submit,
    processing,
    errors,
  } = useForm({
    judul: post.judul,
    deskripsi: post.deskripsi,
    kategori: post.kategori,
    thumbnail: null as File | null,
    _method: 'PUT',
  });
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    post.thumbnail ? `/storage/${post.thumbnail}` : null,
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
    submit(`/posts/${post.id_post}`, {
      forceFormData: true,
    });
  };

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Post" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold">Edit Post</h1>

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
              placeholder="Write your post description..."
            />
            {errors.deskripsi && (
              <p className="text-sm text-red-600">{errors.deskripsi}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="kategori">Category</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {data.kategori || 'Select or type category...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Type to search or create category..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <div className="py-6 text-center text-sm">
                        <p className="mb-2 text-muted-foreground">
                          No category found.
                        </p>
                        {searchValue && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setData('kategori', searchValue);
                              setOpen(false);
                              setSearchValue('');
                            }}
                          >
                            Create "{searchValue}"
                          </Button>
                        )}
                      </div>
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredCategories.map((category) => (
                        <CommandItem
                          key={category.value}
                          value={category.value}
                          onSelect={(currentValue) => {
                            setData('kategori', currentValue);
                            setOpen(false);
                            setSearchValue('');
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              data.kategori === category.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.kategori && (
              <p className="text-sm text-red-600">{errors.kategori}</p>
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
            {processing ? 'Updating...' : 'Update Post'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
