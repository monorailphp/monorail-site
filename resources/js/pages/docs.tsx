import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { DocsNavbar } from '@/components/docs-navbar';
import { useDocsContent } from '@/contexts/docs-context';
import 'prismjs/themes/prism-tomorrow.css';

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
