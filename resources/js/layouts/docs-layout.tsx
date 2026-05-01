import { useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { show as docsShow } from '@/routes/docs';
import { DocsNavbar } from '@/components/docs-navbar';
import { DocsPageToc } from '@/components/docs-page-toc';
import { DocsContentContext } from '@/contexts/docs-context';
import { processContentHtml } from '@/lib/process-content';

interface DocsPage {
    title: string;
    slug: string;
    children?: DocsPage[];
}

function DocsNavItem({ page, currentPage, depth = 0 }: { page: DocsPage; currentPage: string | null; depth?: number }) {
    const hasChildren = page.children && page.children.length > 0;
    const isActive = currentPage === page.slug;

    return (
        <div className={depth > 0 ? 'ml-3' : ''}>
            {page.slug ? (
                <Link
                    href={docsShow(page.slug)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                    {page.title}
                </Link>
            ) : (
                <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {page.title}
                </span>
            )}

            {hasChildren && (
                <div className="mt-1 space-y-1">
                    {page.children!.map((child) => (
                        <DocsNavItem key={child.slug} page={child} currentPage={currentPage} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const { pages, currentPage, content } = usePage<{ pages: DocsPage[]; currentPage: string | null; content: string | null }>().props;

    const processedContent = useMemo(() => {
        if (!content) return '';
        return processContentHtml(content);
    }, [content]);

    return (
        <DocsContentContext.Provider value={processedContent}>
            <div className="flex min-h-screen w-full flex-col">
                <DocsNavbar />
                <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-8 md:flex-row">
                    <aside className="sticky top-14 w-full shrink-0 self-start md:w-64">
                        <nav className="max-h-[calc(100dvh-3.5rem)] space-y-0.5 overflow-y-auto pr-2">
                            {pages?.map((page) => (
                                <DocsNavItem key={page.slug || page.title} page={page} currentPage={currentPage} />
                            ))}
                        </nav>
                    </aside>

                    <main className="min-w-0 flex-1 overflow-x-auto">
                        {children}
                    </main>

                    <aside className="sticky top-14 hidden w-full shrink-0 self-start xl:block xl:w-64">
                        <DocsPageToc content={processedContent} />
                    </aside>
                </div>
            </div>
        </DocsContentContext.Provider>
    );
}
