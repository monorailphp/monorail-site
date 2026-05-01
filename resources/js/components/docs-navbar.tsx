import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

export function DocsNavbar() {
    const { auth, currentTeam } = usePage().props;
    const dashboardUrl = currentTeam ? dashboard(currentTeam.slug) : '/';

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
            <div className="mx-auto flex h-14 items-center px-4 md:max-w-7xl">
                <Link
                    href={dashboardUrl}
                    prefetch
                    className="flex items-center space-x-2"
                >
                    <AppLogo />
                    <span className="text-slate-600">/</span>
                    <span className="text-sm font-semibold text-white">Docs</span>
                </Link>

                <div className="ml-auto">
                    {auth.user ? (
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={dashboardUrl} className="hidden sm:flex">
                                <ArrowLeft className="mr-1 size-4" />
                                Back to app
                            </Link>
                        </Button>
                    ) : (
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={dashboardUrl} className="hidden sm:flex">
                                Home
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
