<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;
use League\CommonMark\GithubFlavoredMarkdownConverter;

class DocsController extends Controller
{
    public function index(): Response
    {
        $docsPath = config('docs.path');

        if (! is_dir($docsPath)) {
            return Inertia::render('docs', [
                'pages' => [],
                'currentPage' => null,
                'content' => null,
            ]);
        }

        $pages = $this->getPages($docsPath);
        $firstPage = $this->findFirstPage($pages);

        if ($firstPage === null) {
            return Inertia::render('docs', [
                'pages' => [],
                'currentPage' => null,
                'content' => null,
            ]);
        }

        return $this->show($firstPage['slug']);
    }

    public function show(string $slug): Response
    {
        if (str_contains($slug, '..')) {
            abort(404);
        }

        $docsPath = config('docs.path');
        $filePath = $docsPath.'/'.$slug.'.md';

        if (! file_exists($filePath)) {
            abort(404);
        }

        $converter = new GithubFlavoredMarkdownConverter([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);

        $markdown = file_get_contents($filePath);
        $html = $converter->convert($markdown)->getContent();

        return Inertia::render('docs', [
            'pages' => $this->getPages($docsPath),
            'currentPage' => $slug,
            'currentPageTitle' => $this->extractTitle($filePath),
            'content' => $html,
        ]);
    }

    /**
     * @return array<int, array{title: string, slug: string, children?: array}>
     */
    private function getPages(string $docsPath): array
    {
        if (! is_dir($docsPath)) {
            return [];
        }

        $navPath = $docsPath.'/nav.json';
        if (file_exists($navPath)) {
            return $this->getPagesFromNav($docsPath, $navPath);
        }

        return $this->getPagesFromFilesystem($docsPath);
    }

    /**
     * @return array<int, array{title: string, slug: string, children?: array}>
     */
    private function getPagesFromNav(string $docsPath, string $navPath): array
    {
        $nav = json_decode(file_get_contents($navPath), true);

        if (! is_array($nav) || ! isset($nav['sections'])) {
            return $this->getPagesFromFilesystem($docsPath);
        }

        $pages = [];

        foreach ($nav['sections'] as $section) {
            $children = [];

            foreach ($section['items'] as $item) {
                if (is_string($item)) {
                    $itemPath = $docsPath.'/'.$item.'.md';
                    $children[] = [
                        'title' => file_exists($itemPath) ? $this->extractTitle($itemPath) : $this->humanize(basename($item)),
                        'slug' => $item,
                    ];
                } elseif (is_array($item) && isset($item['title'])) {
                    $children[] = [
                        'title' => $item['title'],
                        'slug' => $item['slug'] ?? '',
                    ];
                }
            }

            if (! empty($children)) {
                $pages[] = [
                    'title' => $section['title'],
                    'slug' => '',
                    'children' => $children,
                ];
            }
        }

        return $pages;
    }

    /**
     * @return array<int, array{title: string, slug: string, children?: array}>
     */
    private function getPagesFromFilesystem(string $docsPath): array
    {
        $pages = [];
        $dirs = [];

        foreach (File::directories($docsPath) as $dir) {
            $dirName = basename($dir);
            $children = [];

            foreach (File::files($dir) as $file) {
                if ($file->getExtension() !== 'md') {
                    continue;
                }

                $children[] = [
                    'title' => $this->extractTitle($file->getPathname()),
                    'slug' => $dirName.'/'.$file->getFilenameWithoutExtension(),
                ];
            }

            if (! empty($children)) {
                $dirs[] = [
                    'title' => $this->humanize($dirName),
                    'slug' => '',
                    'children' => $children,
                ];
            }
        }

        foreach (File::files($docsPath) as $file) {
            if ($file->getExtension() !== 'md') {
                continue;
            }

            $pages[] = [
                'title' => $this->extractTitle($file->getPathname()),
                'slug' => $file->getFilenameWithoutExtension(),
            ];
        }

        return array_merge($pages, $dirs);
    }

    /**
     * @param  array<int, array{title: string, slug: string, children?: array}>  $pages
     */
    private function findFirstPage(array $pages): ?array
    {
        foreach ($pages as $page) {
            if (! empty($page['slug'])) {
                return $page;
            }

            if (! empty($page['children'])) {
                $firstChild = $this->findFirstPage($page['children']);
                if ($firstChild !== null) {
                    return $firstChild;
                }
            }
        }

        return null;
    }

    private function extractTitle(string $filePath): string
    {
        $content = file_get_contents($filePath);

        if (preg_match('/^#\s+(.+)$/m', $content, $matches)) {
            return trim($matches[1]);
        }

        return pathinfo($filePath, PATHINFO_FILENAME);
    }

    private function humanize(string $value): string
    {
        return ucwords(str_replace(['-', '_'], ' ', $value));
    }
}
