import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useDocsContent } from '@/contexts/docs-context';
import { DocsNavbar } from '@/components/docs-navbar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from 'react';

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
