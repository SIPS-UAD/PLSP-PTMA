import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
  total: number;
  links: PaginationLink[];
  onPageChange?: (url: string | null) => void;
}

export default function Pagination({
  currentPage,
  lastPage,
  from,
  to,
  total,
  links,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (url: string | null) => {
    if (url) {
      if (onPageChange) {
        onPageChange(url);
      } else {
        router.get(url, {}, { preserveState: true, preserveScroll: true });
      }
    }
  };

  if (lastPage <= 1) {
    return null;
  }

  // Filter out previous/next links and any non-numeric labels
  const pageLinks = links.filter((link) => {
    const label = link.label.toLowerCase();
    return (
      label !== 'pagination.previous' &&
      label !== 'pagination.next' &&
      label !== '&laquo; previous' &&
      label !== 'next &raquo;' &&
      !label.includes('previous') &&
      !label.includes('next')
    );
  });

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Menampilkan {from} hingga {to} dari {total} hasil
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(links[0]?.url)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {pageLinks.map((link, index) => (
            <Button
              key={index}
              variant={link.active ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(link.url)}
              disabled={!link.url}
              className="min-w-[2.5rem]"
            >
              {link.label}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(links[links.length - 1]?.url)}
          disabled={currentPage === lastPage}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
