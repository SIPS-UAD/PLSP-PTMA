import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navigationsLink } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { Link } from '@inertiajs/react';
import React from 'react';
import AppLogoIcon from '../app-logo-icon';

export function NavBar() {
    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <AppLogoIcon className="size-6 text-blue-muhi" />
                        <span className="hidden font-bold text-blue-muhi sm:inline-block">
                            PLSP PTMA
                        </span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navigationsLink.map((nav) => (
                                <NavigationMenuItem key={nav.text}>
                                    {nav.children ? (
                                        <>
                                            <NavigationMenuTrigger className="bg-transparent text-blue-muhi hover:bg-accent/50 focus:bg-accent/50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                                {nav.text}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] lg:w-[300px]">
                                                    {nav.children.map(
                                                        (child) => (
                                                            <ListItem
                                                                key={child.text}
                                                                href={
                                                                    child.link
                                                                }
                                                                title={
                                                                    child.text
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link
                                            href={nav.link}
                                            legacyBehavior
                                            passHref
                                        >
                                            <NavigationMenuLink
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    'bg-transparent text-blue-muhi hover:bg-accent/50 focus:bg-accent/50',
                                                )}
                                            >
                                                {nav.text}
                                            </NavigationMenuLink>
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="ml-4 flex items-center gap-2">
                        <Link
                            href={login()}
                            className="font-semibold text-green-muhi transition-colors hover:text-green-muhi/80"
                        >
                            LOGIN
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        'block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';

export default NavBar;
