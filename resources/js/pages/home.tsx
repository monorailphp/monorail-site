import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Github, Layers, LayoutDashboard, MonitorSmartphone, Puzzle } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

function Navbar() {
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

function CodeBlock() {
    return (
        <pre className="overflow-x-auto text-sm leading-relaxed">
            <code>
                <span className="text-slate-500">{'<?php\n\n'}</span>
                <span className="text-violet-400">{'class '}</span>
                <span className="text-sky-300">{'UserResource '}</span>
                <span className="text-violet-400">{'extends '}</span>
                <span className="text-sky-300">{'Resource\n'}</span>
                <span className="text-slate-300">{'{\n'}</span>
                <span className="text-slate-500">{'    protected static '}</span>
                <span className="text-violet-400">{'string '}</span>
                <span className="text-slate-300">{'$model = '}</span>
                <span className="text-sky-300">{'User'}</span>
                <span className="text-slate-300">{'::class;\n\n'}</span>

                <span className="text-slate-500">{'    public static function '}</span>
                <span className="text-amber-300">{'table'}</span>
                <span className="text-slate-300">{'('}</span>
                <span className="text-sky-300">{'Table '}</span>
                <span className="text-slate-300">{'$table): '}</span>
                <span className="text-sky-300">{'Table\n'}</span>
                <span className="text-slate-300">{'    {\n'}</span>
                <span className="text-slate-500">{'        return '}</span>
                <span className="text-slate-300">{'$table\n'}</span>
                <span className="text-slate-300">{'            ->'}</span>
                <span className="text-amber-300">{'columns'}</span>
                <span className="text-slate-300">{'([\n'}</span>

                <span className="text-slate-300">{'                '}</span>
                <span className="text-sky-300">{'TextColumn'}</span>
                <span className="text-slate-300">{'::make('}</span>
                <span className="text-emerald-400">{`'name'`}</span>
                <span className="text-slate-300">{')->'}</span>
                <span className="text-amber-300">{'searchable'}</span>
                <span className="text-slate-300">{'(),\n'}</span>

                <span className="text-slate-300">{'                '}</span>
                <span className="text-sky-300">{'TextColumn'}</span>
                <span className="text-slate-300">{'::make('}</span>
                <span className="text-emerald-400">{`'email'`}</span>
                <span className="text-slate-300">{')->'}</span>
                <span className="text-amber-300">{'copyable'}</span>
                <span className="text-slate-300">{'(),\n'}</span>

                <span className="text-slate-300">{'                '}</span>
                <span className="text-sky-300">{'BadgeColumn'}</span>
                <span className="text-slate-300">{'::make('}</span>
                <span className="text-emerald-400">{`'role'`}</span>
                <span className="text-slate-300">{')->'}</span>
                <span className="text-amber-300">{'colors'}</span>
                <span className="text-slate-300">{'([...]),\n'}</span>

                <span className="text-slate-300">{'                '}</span>
                <span className="text-sky-300">{'TextColumn'}</span>
                <span className="text-slate-300">{'::make('}</span>
                <span className="text-emerald-400">{`'created_at'`}</span>
                <span className="text-slate-300">{')->'}</span>
                <span className="text-amber-300">{'since'}</span>
                <span className="text-slate-300">{'(),\n'}</span>

                <span className="text-slate-300">{'            ])\n'}</span>
                <span className="text-slate-300">{'            ->'}</span>
                <span className="text-amber-300">{'filters'}</span>
                <span className="text-slate-300">{'([\n'}</span>
                <span className="text-slate-300">{'                '}</span>
                <span className="text-sky-300">{'SelectFilter'}</span>
                <span className="text-slate-300">{'::make('}</span>
                <span className="text-emerald-400">{`'role'`}</span>
                <span className="text-slate-300">{')->'}</span>
                <span className="text-amber-300">{'options'}</span>
                <span className="text-slate-300">{'([...]),\n'}</span>
                <span className="text-slate-300">{'            ]);\n'}</span>
                <span className="text-slate-300">{'    }\n'}</span>
                <span className="text-slate-300">{'}'}</span>
            </code>
        </pre>
    );
}

function AdminMockup() {
    const users = [
        { name: 'Alice Martin', email: 'alice@acme.com', role: 'Admin', date: '2d ago' },
        { name: 'Bob Chen', email: 'bob@acme.com', role: 'User', date: '5d ago' },
        { name: 'Carol Diaz', email: 'carol@acme.com', role: 'User', date: '1w ago' },
    ];

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-900 text-xs">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-slate-700 bg-slate-800 px-3 py-2">
                <div className="size-2.5 rounded-full bg-red-500/70" />
                <div className="size-2.5 rounded-full bg-yellow-500/70" />
                <div className="size-2.5 rounded-full bg-green-500/70" />
                <div className="mx-3 flex-1 rounded bg-slate-700 px-2 py-0.5 text-center text-slate-500">
                    myapp.test/admin/users
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-36 shrink-0 border-r border-slate-700 bg-slate-800/60 p-2">
                    <div className="mb-3 flex items-center gap-1.5 px-1">
                        <div className="flex size-4 items-center justify-center rounded bg-emerald-500/20">
                            <AppLogoIcon className="size-2.5 fill-emerald-400" />
                        </div>
                        <span className="text-[10px] font-semibold text-white">Admin</span>
                    </div>
                    <div className="space-y-0.5">
                        <div className="rounded bg-slate-700 px-2 py-1 text-slate-300">Dashboard</div>
                        <div className="rounded bg-emerald-500/20 px-2 py-1 font-medium text-emerald-400">Users</div>
                        <div className="rounded px-2 py-1 text-slate-400">Posts</div>
                        <div className="rounded px-2 py-1 text-slate-400">Settings</div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col overflow-hidden p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <div className="font-semibold text-white">Users</div>
                            <div className="text-slate-500">3 team members</div>
                        </div>
                        <button className="rounded bg-emerald-500 px-2 py-1 font-medium text-white">+ New User</button>
                    </div>

                    {/* Filter bar */}
                    <div className="mb-2 flex gap-1.5">
                        <div className="flex-1 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-500">
                            Search users...
                        </div>
                        <div className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-400">
                            Role ▾
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded border border-slate-700">
                        <div className="grid grid-cols-4 border-b border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-400">
                            <div>Name</div>
                            <div>Email</div>
                            <div>Role</div>
                            <div>Joined</div>
                        </div>
                        {users.map((u, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-4 border-b border-slate-700/50 px-3 py-2 last:border-0 hover:bg-slate-800/50"
                            >
                                <div className="font-medium text-white">{u.name}</div>
                                <div className="text-slate-400">{u.email}</div>
                                <div>
                                    <span
                                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${u.role === 'Admin' ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-700 text-slate-300'}`}
                                    >
                                        {u.role}
                                    </span>
                                </div>
                                <div className="text-slate-500">{u.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const primitives = [
    {
        icon: Layers,
        name: 'Panel',
        description: 'The top-level container. Configure routes, branding, middleware, and resource discovery in one place.',
    },
    {
        icon: LayoutDashboard,
        name: 'Resource',
        description: 'An Eloquent model bound to a full CRUD interface: table, form, policies, and relation managers.',
    },
    {
        icon: MonitorSmartphone,
        name: 'Page',
        description: 'The unit of routing. Every screen — list, edit, custom — is a Page subclass with full lifecycle control.',
    },
    {
        icon: Puzzle,
        name: 'Widget',
        description: 'Dashboard tiles for stats, charts, recent records, and activity feeds. Drop them anywhere.',
    },
];

const features = [
    {
        name: 'Tables',
        description: 'Sortable, filterable, searchable columns. Bulk actions, inline editing, and pagination built in.',
    },
    {
        name: 'Forms',
        description: 'Fields, sections, tabs, repeaters, and wizard steps: all defined in PHP, rendered in React.',
    },
    {
        name: 'Authorization',
        description: 'Policy-gated resources, pages, and actions. Gates integrate directly with Laravel policies.',
    },
    {
        name: 'Notifications',
        description: 'Server-rendered toasts and flash messages. Trigger from any controller or queued job.',
    },
    {
        name: 'Global Search',
        description: 'Cross-resource search with configurable scorers. Keyboard-first, with a ⌘K shortcut.',
    },
    {
        name: 'i18n & RTL',
        description: 'Translation strings, locale switching, and full right-to-left layout support out of the box.',
    },
];

export default function Home() {
    return (
        <>
            <Head title="Monorail — Admin panels for Laravel + Inertia + React" />

            <Navbar />

            {/* Hero */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pt-14 text-center">
                {/* Background grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Glow */}
                <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="relative z-10 max-w-4xl">
                    <div className="mb-8 flex justify-center">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                            <AppLogoIcon className="size-9 fill-white" />
                        </div>
                    </div>

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                        Admin panels for Laravel + Inertia + React
                    </div>

                    <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Define in PHP.
                        <br />
                        <span className="text-emerald-400">Render in React.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                        Build admin panels as PHP classes. Monorail serializes them to UI schemas, delivers them via
                        Inertia.js, and React renders the result. No TypeScript schemas to duplicate, no frontend wiring
                        to maintain.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button size="lg" asChild className="bg-emerald-500 text-white hover:bg-emerald-400">
                            <Link href="/docs/getting-started/installation">
                                Get Started
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                            <Link href="/docs">
                                <BookOpen className="mr-2 size-4" />
                                Read the Docs
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-slate-300">
                        <span className="text-slate-500">$</span>
                        composer require monorail/monorail
                    </div>
                </div>

                {/* Scroll indicator — smooth float, hidden on reduced motion */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 motion-safe:animate-float">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </section>

            {/* Code demo */}
            <section className="bg-slate-950 px-6 pb-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            One PHP class. A full React admin UI.
                        </h2>
                        <p className="mt-2 text-slate-400">Define it in PHP. Inertia ships it. React renders it.</p>
                    </div>

                    <div className="grid overflow-hidden rounded-xl border border-slate-800 bg-slate-900 lg:grid-cols-2">
                        {/* PHP code */}
                        <div className="border-b border-slate-800 p-6 lg:border-b-0 lg:border-r">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="size-2.5 rounded-full bg-red-500/70" />
                                <div className="size-2.5 rounded-full bg-yellow-500/70" />
                                <div className="size-2.5 rounded-full bg-green-500/70" />
                                <span className="ml-2 text-xs text-slate-500">UserResource.php</span>
                            </div>
                            <CodeBlock />
                        </div>

                        {/* UI output */}
                        <div className="flex flex-col p-6">
                            <div className="mb-3 text-xs text-slate-500">Rendered UI</div>
                            <div className="flex-1">
                                <AdminMockup />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Primitives — numbered spec list, no cards */}
            <section className="bg-background px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-14">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Four primitives. Every screen.</h2>
                        <p className="mt-3 text-lg text-muted-foreground">
                            Everything in Monorail is composed from four building blocks.
                        </p>
                    </div>

                    <div className="divide-y divide-border">
                        {primitives.map((p, i) => (
                            <div key={p.name} className="flex items-start gap-8 py-8">
                                <div className="w-7 shrink-0 pt-0.5 font-mono text-sm tabular-nums text-muted-foreground/40">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-10">
                                    <div className="flex w-32 shrink-0 items-center gap-2">
                                        <p.icon className="size-[15px] shrink-0 text-muted-foreground" />
                                        <span className="text-sm font-semibold text-foreground">{p.name}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features — definition list, no cards */}
            <section className="bg-muted px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-14">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Everything an admin panel needs.
                        </h2>
                        <p className="mt-3 text-lg text-muted-foreground">Batteries included, all server-driven.</p>
                    </div>

                    <dl className="divide-y divide-border">
                        {features.map((f) => (
                            <div
                                key={f.name}
                                className="grid grid-cols-[140px_1fr] items-baseline gap-8 py-5 sm:grid-cols-[180px_1fr]"
                            >
                                <dt className="text-sm font-semibold text-foreground">{f.name}</dt>
                                <dd className="text-sm leading-relaxed text-muted-foreground">{f.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Why SDUI — numbered steps with dividers, no cards */}
            <section className="bg-background px-6 py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Why Server-Driven UI?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        You define panels, resources, tables, and forms as PHP classes. Monorail serializes those
                        definitions and Inertia.js delivers them to React as props. No duplicated TypeScript, no split
                        mental model. PHP stays the single source of truth.
                    </p>

                    <div className="mt-12 flex flex-col divide-y divide-border text-left sm:flex-row sm:divide-x sm:divide-y-0">
                        <div className="flex-1 py-8 sm:py-0 sm:pr-8">
                            <div className="mb-3 font-mono text-xs text-muted-foreground/40">01</div>
                            <div className="mb-2 text-sm font-semibold text-foreground">PHP stays the authority</div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Panels, resources, columns, fields: all PHP classes. Zero TypeScript schemas to keep in sync.
                            </p>
                        </div>
                        <div className="flex-1 py-8 sm:py-0 sm:px-8">
                            <div className="mb-3 font-mono text-xs text-muted-foreground/40">02</div>
                            <div className="mb-2 text-sm font-semibold text-foreground">Inertia as the bridge</div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                The server serializes UI schemas as JSON props. Inertia delivers them on every navigation.
                                No API layer needed.
                            </p>
                        </div>
                        <div className="flex-1 py-8 sm:py-0 sm:pl-8">
                            <div className="mb-3 font-mono text-xs text-muted-foreground/40">03</div>
                            <div className="mb-2 text-sm font-semibold text-foreground">React does the rendering</div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Components are real React: full ecosystem access, custom renderers, and proper SPA behavior.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Link
                            href="/docs/advanced/server-driven-ui"
                            className="text-sm font-medium text-primary hover:opacity-80"
                        >
                            Read the SDUI concept guide →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Install CTA */}
            <section className="bg-slate-950 px-6 py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Ready to build?</h2>
                    <p className="mt-3 text-slate-400">One package install away from a fully-featured admin panel.</p>

                    <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-mono text-base text-slate-300">
                        <span className="text-slate-500">$</span>
                        composer require monorail/monorail
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button size="lg" asChild className="bg-emerald-500 text-white hover:bg-emerald-400">
                            <Link href="/docs/getting-started/installation">
                                Installation Guide
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                            <Link href="/docs/getting-started/quick-start">Quick Start</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded bg-white/10">
                            <AppLogoIcon className="size-3.5 fill-white" />
                        </div>
                        <span className="text-sm font-semibold text-white">Monorail</span>
                        <span className="text-slate-700">/</span>
                        <span className="text-sm text-slate-500">Server-Driven UI for Laravel</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <Link href="/docs" className="hover:text-slate-300">
                            Docs
                        </Link>
                        <a
                            href="https://github.com/rocketphp/monorail"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 hover:text-slate-300"
                        >
                            <Github className="size-3.5" />
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
