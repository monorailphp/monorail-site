export const sponsors = [
    { name: 'Sudeem', logo: '/sudeem/logo.png', url: 'https://sudeem.ai', domain: 'sudeem.ai' },
    { name: 'Lymonah', logo: '/lymonah/logo.png', url: 'https://lymonah.com', domain: 'lymonah.com' },
];

export function SponsorsList({ showLabel = true }: { showLabel?: boolean }) {
    return (
        <div className="space-y-1">
            {showLabel && (
                <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Sponsored by
                </span>
            )}
            {sponsors.map((sponsor) => (
                <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                >
                    <img src={sponsor.logo} alt={sponsor.name} className="h-6 w-auto max-w-[80px] object-contain" />
                    <span className="text-sm text-slate-400">{sponsor.domain}</span>
                </a>
            ))}
            <a
                href="https://github.com/sponsors/maherelgamil"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-400"
            >
                + Become a sponsor
            </a>
        </div>
    );
}
