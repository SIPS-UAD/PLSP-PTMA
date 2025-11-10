import { useCallback } from 'react';

export type Appearance = 'light';

export function initializeTheme() {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
}

export function useAppearance() {
    const updateAppearance = useCallback((mode: Appearance) => {
        // Dark mode support has been removed; this is a no-op.
    }, []);

    return { appearance: 'light', updateAppearance } as const;
}
