import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id_user: number;
    name: string;
    email: string;
    nama_lsp?: string;
    nama_ptma?: string;
    no_hp?: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    role: 'member' | 'admin' | 'super_admin'; 
    [key: string]: unknown;
}

export type NavLink = {
    link: string;
    text: string;
    children?: NavLink[];
};

export type Card = {
    title: string;
    imageUrl: string;
    date: string;
};

export type NewsData = {
    id: string;
    image_link: string;
    title: string;
    release_date: string;
    content: string;
};
