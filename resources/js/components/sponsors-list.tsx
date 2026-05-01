export const sponsors = [
    { name: 'Sudeem', logo: '/sudeem/logo.png', url: 'https://sudeem.ai', domain: 'sudeem.ai' },
    { name: 'Lymonah', logo: '/lymonah/logo.png', url: 'https://lymonah.com', domain: 'lymonah.com' },
];

export function SponsorsList({ showLabel = true }: { showLabel?: boolean }) {
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
