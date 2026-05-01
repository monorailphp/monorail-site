import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useDocsContent } from '@/contexts/docs-context';

interface PageProps {
    currentPageTitle: string | null;
}

export default function Docs() {
    const { currentPageTitle } = usePage<PageProps>().props;
    const processedContent = useDocsContent();

    return (
        <>
            <Head title={currentPageTitle ?? 'Documentation'} />
            {processedContent ? (
                <article
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                />
            ) : (
                <p className="text-muted-foreground">No documentation available.</p>
            )}
        </>
    );
}
