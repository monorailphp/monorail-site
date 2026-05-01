import { Link } from '@inertiajs/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

export function DocsNavbar() {
    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-white/10">
                        <AppLogoIcon className="size-4 fill-white" />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-white">Monorail</span>
                </Link>

                <nav className="ml-2 flex items-center gap-1">
                    <Link
                        href="/docs"
                        className="rounded-md px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        Docs
                    </Link>
                    <a
                        href="https://github.com/rocketphp/monorail"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        GitHub
                    </a>
                </nav>

                <div className="ml-auto">
                    <Button size="sm" asChild className="bg-white text-slate-950 hover:bg-slate-100">
                        <Link href="/docs/getting-started/installation">
                            Get Started
                            <ArrowRight className="ml-1 size-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}