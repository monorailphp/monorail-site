import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { DocsNavbar } from '@/components/docs-navbar';
import { useDocsContent } from '@/contexts/docs-context';
import 'prismjs/themes/prism-tomorrow.css';

const sponsors = [
    { name: 'Sudeem', logo: '/sudeem/logo.png', url: '#' },
    { name: 'Lymonah', logo: '/lymonah/logo.png', url: '#' },
];

interface PageProps {
    currentPageTitle: string | null;
}

export default function Docs() {
    const { currentPageTitle } = usePage<PageProps>().props;
    const processedContent = useDocsContent();

    useEffect(() => {
        Prism.highlightAll();
    }, [processedContent]);

    return (
        <>
            <Head title={currentPageTitle ?? 'Documentation'} />
            <DocsNavbar />
            <main className="pt-14">
                <section className="py-12 border-b border-slate-800">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Sponsored by</h2>
                        <div className="flex flex-wrap justify-center gap-8">
                            {sponsors.map((sponsor) => (
                                <a
                                    key={sponsor.name}
                                    href={sponsor.url}
                                    className="flex items-center justify-center h-16 px-6 py-3 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-full w-auto max-w-[120px] object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
                {processedContent ? (
                    <article
                        className="prose prose-invert prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                ) : (
                    <p className="text-slate-400">No documentation available.</p>
                )}
            </main>
        </>
    );
}
