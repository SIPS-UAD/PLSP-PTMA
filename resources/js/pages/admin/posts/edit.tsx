import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
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
}

interface PostsEditProps {
    post: Post;
    categories: Category[];
}

export default function PostsEdit({ post, categories = [] }: PostsEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        judul: post.judul,
        deskripsi: post.deskripsi,
        kategori: post.kategori,
    });
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/posts/${post.id_post}`);
    };

    // Filter categories based on search
    const filteredCategories = categories.filter((category) =>
        category.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold">Edit Post</h1>

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
                            <p className="text-sm text-red-600">
                                {errors.judul}
                            </p>
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
                            <p className="text-sm text-red-600">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="kategori">Category</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
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
                                                <p className="text-muted-foreground mb-2">
                                                    No category found.
                                                </p>
                                                {searchValue && (
                                                    <Button
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
                            <p className="text-sm text-red-600">
                                {errors.kategori}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            Update Post
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
