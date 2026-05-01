import { useMemo } from 'react';
import { slugify } from '@/lib/slugify';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface DocsPageTocProps {
    content: string;
}

export function DocsPageToc({ content }: DocsPageTocProps) {
    const headings = useMemo<TocItem[]>(() => {
        if (!content) {
return [];
}

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const elements = doc.querySelectorAll('h2, h3');

        return Array.from(elements).map((el) => {
            const text = el.textContent ?? '';
            const id = el.id || slugify(text);
            const level = el.tagName === 'H2' ? 2 : 3;

            return { id, text, level };
        });
    }, [content]);

    if (headings.length === 0) {
return null;
}

    return (
        <nav className="space-y-1">
            <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                On this page
            </span>
            {headings.map((heading) => (
                <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors text-slate-400 hover:bg-white/5 hover:text-white ${
                        heading.level === 3 ? 'ml-3' : ''
                    }`}
                >
                    {heading.text}
                </a>
            ))}
        </nav>
    );
}
