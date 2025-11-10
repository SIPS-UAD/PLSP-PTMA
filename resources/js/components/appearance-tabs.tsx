import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'rounded-lg bg-neutral-100 p-4 text-sm text-neutral-600',
                className,
            )}
            {...props}
        >
            Light mode is always enabled for this application.
        </div>
    );
}
