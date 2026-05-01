export const sponsors = [
    { name: 'Sudeem', logo: '/sudeem/logo.png', url: 'https://sudeem.ai', domain: 'sudeem.ai' },
    { name: 'Lymonah', logo: '/lymonah/logo.png', url: 'https://lymonah.com', domain: 'lymonah.com' },
];

export function SponsorsList({ showLabel = true, variant = 'default' }: { showLabel?: boolean; variant?: 'default' | 'sidebar' }) {
    if (variant === 'sidebar') {
        return (
            <div className="flex flex-col gap-1">
                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Sponsored by
                </p>
                {sponsors.map((sponsor) => (
                    <a
                        key={sponsor.name}
                        href={sponsor.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/5"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/5">
                            <img src={sponsor.logo} alt={sponsor.name} className="h-6 w-6 object-contain" />
                        </div>
                        <span className="text-sm text-slate-400 transition-colors group-hover:text-slate-200">
                            {sponsor.domain}
                        </span>
                    </a>
                ))}
                <a
                    href="https://github.com/sponsors/maherelgamil"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-slate-600 transition-colors hover:bg-white/5 hover:text-slate-400"
                >
                    + Become a sponsor
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            {showLabel && (
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Sponsored by
                </h3>
            )}
            <div className="flex flex-wrap items-center justify-center gap-2">
            {sponsors.map((sponsor) => (
                <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-black/5"
                >
                    <img src={sponsor.logo} alt={sponsor.name} className="h-8 w-auto max-w-[100px] object-contain" />
                    <span className="text-base text-slate-500">{sponsor.domain}</span>
                </a>
            ))}
            <a
                href="https://github.com/sponsors/maherelgamil"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-4 py-3 text-base text-slate-400 transition-colors hover:bg-black/5 hover:text-slate-600"
            >
                + Become a sponsor
            </a>
            </div>
        </div>
    );
}
