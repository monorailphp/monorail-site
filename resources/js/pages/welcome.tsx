import { Head, Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { show as docsShow } from '@/routes/docs';
import { login, register } from '@/routes';

const features = [
    {
        title: 'Resources',
        description:
            'Declarative CRUD with auto-generated list, create, edit, and view pages. Bind an Eloquent model and get a full admin panel.',
    },
    {
        title: 'Tables & Forms',
        description:
            '12+ field types, sortable and filterable tables, sections, tabs, and server-side validation — all configured in PHP.',
    },
    {
        title: 'Auth & Authorization',
        description:
            'Panel-level authentication with login, registration, email verification, and two-factor auth. Policy-gated at every level.',
    },
];

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<{ auth: { user: { name: string } | null } }>().props;

    return (
        <>
            <Head title="Monorail — Admin Panels for Laravel" />
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
                        <div className="flex items-center gap-2">
                            <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                                <AppLogoIcon className="size-4 fill-current text-primary-foreground" />
                            </div>
                            <span className="text-sm font-semibold">Monorail</span>
                        </div>

                        <nav className="ml-8 hidden items-center gap-6 sm:flex">
                            <Link
                                href={docsShow('README')}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Docs
                            </Link>
                            <a
                                href="https://github.com/monorail/monorail"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                GitHub
                            </a>
                        </nav>

                        <div className="ml-auto flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild size="sm">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={login()}>Sign in</Link>
                                    </Button>
                                    {canRegister && (
                                        <Button asChild size="sm">
                                            <Link href={register()}>Get started</Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section className="flex flex-col items-center px-4 py-24 text-center">
                    <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                        Server-Driven UI for Laravel
                    </div>
                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight lg:text-6xl">
                        Admin panels for Laravel,
                        <br />
                        <span className="text-primary">without the frontend</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                        The server emits complete UI schemas as JSON. React renders them deterministically. One source of truth, in PHP.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href={docsShow('README')}>Read the docs →</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <a href="https://github.com/monorail/monorail" target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                </section>

                {/* Features */}
                <section className="border-t border-border bg-muted/30 px-4 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 md:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                    <h3 className="font-semibold">{feature.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick start */}
                <section className="px-4 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">One command to get started</h2>
                                <p className="mt-4 text-muted-foreground">
                                    Install the package, scaffold a panel, generate a resource from an Eloquent model — and you have a fully functional admin panel.
                                </p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href={docsShow('getting-started/quick-start')}>Read the Quick Start →</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e] text-sm">
                                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                                    <div className="size-3 rounded-full bg-red-500/70" />
                                    <div className="size-3 rounded-full bg-yellow-500/70" />
                                    <div className="size-3 rounded-full bg-green-500/70" />
                                    <span className="ml-2 text-xs text-white/40">terminal</span>
                                </div>
                                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/90">
                                    <code>{`composer require monorail/monorail

php artisan monorail:make-panel Admin

php artisan monorail:make-resource Post`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-border px-4 py-8">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex size-5 items-center justify-center rounded bg-primary">
                                <AppLogoIcon className="size-3 fill-current text-primary-foreground" />
                            </div>
                            <span>Monorail</span>
                        </div>
                        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                            <Link href={docsShow('README')} className="transition-colors hover:text-foreground">
                                Docs
                            </Link>
                            <a
                                href="https://github.com/monorail/monorail"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-foreground"
                            >
                                GitHub
                            </a>
                            <Link href={docsShow('contributing')} className="transition-colors hover:text-foreground">
                                Contributing
                            </Link>
                        </nav>
                    </div>
                </footer>
            </div>
        </>
    );
}
