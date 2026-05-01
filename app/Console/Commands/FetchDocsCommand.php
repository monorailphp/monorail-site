<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'docs:fetch')]
class FetchDocsCommand extends Command
{
    protected $signature = 'docs:fetch
                            {--tag=main : The Git tag or branch to fetch docs from}
                            {--repo=monorailphp/monorail : The GitHub repository}
                            {--path=docs : The path within the repository to fetch}';

    protected $description = 'Fetch documentation markdown files from the GitHub repository and save them to storage';

    public function handle(): int
    {
        $repo = $this->option('repo');
        $tag = $this->option('tag');
        $path = $this->option('path');

        $this->info("Fetching docs from {$repo}@{$tag}/{$path}...");

        $disk = Storage::build([
            'driver' => 'local',
            'root' => storage_path('app/docs'),
        ]);

        $disk->makeDirectory($tag);
        $downloaded = 0;

        $this->fetchDirectory($repo, $tag, $path, $tag, $disk, $downloaded);

        $this->info("Downloaded {$downloaded} file(s) to storage/app/docs/{$tag}");

        $this->updateDocsConfig($tag);

        $this->generateLlmTxtFiles();

        return self::SUCCESS;
    }

    private function fetchDirectory(string $repo, string $tag, string $repoPath, string $storagePath, $disk, int &$downloaded): void
    {
        $response = Http::withHeaders([
            'Accept' => 'application/vnd.github.v3+json',
            'User-Agent' => 'monorail-site-docs-fetcher',
        ])->get("https://api.github.com/repos/{$repo}/contents/{$repoPath}", [
            'ref' => $tag,
        ]);

        if (! $response->successful()) {
            $this->error("GitHub API error for {$repoPath}: {$response->status()}");

            return;
        }

        $items = $response->json();

        if (! is_array($items)) {
            $this->warn("Invalid response for {$repoPath}");

            return;
        }

        foreach ($items as $item) {
            if ($item['type'] === 'dir') {
                $subRepoPath = $item['path'];
                $subStoragePath = $storagePath.'/'.$item['name'];
                $disk->makeDirectory($subStoragePath);
                $this->fetchDirectory($repo, $tag, $subRepoPath, $subStoragePath, $disk, $downloaded);
            } elseif ($item['type'] === 'file' && (str_ends_with($item['name'], '.md') || $item['name'] === 'nav.json')) {
                $this->info("Downloading {$item['path']}...");

                $content = Http::withHeaders([
                    'Accept' => 'application/vnd.github.v3.raw',
                ])->get($item['download_url'])->body();

                $disk->put($storagePath.'/'.$item['name'], $content);
                $downloaded++;
            }
        }
    }

    private function updateDocsConfig(string $tag): void
    {
        $configPath = config_path('docs.php');
        $content = file_get_contents($configPath);

        $newPath = "storage_path('app/docs/{$tag}')";
        $content = preg_replace(
            "/'path'\s*=>\s*[^,]+,/",
            "'path' => {$newPath},",
            $content
        );

        file_put_contents($configPath, $content);

        $this->info("Updated config/docs.php to use tag: {$tag}");
    }

    private function generateLlmTxtFiles(): void
    {
        $docsPath = config('docs.path');
        $navPath = $docsPath.'/nav.json';
        $publicPath = public_path();

        $this->info('Generating llms.txt...');
        file_put_contents("{$publicPath}/llms.txt", $this->generateLlmIndex($docsPath, $navPath));

        $this->info('Generating llms-full.txt...');
        file_put_contents("{$publicPath}/llms-full.txt", $this->generateLlmFull($docsPath, $navPath));
    }

    private function generateLlmIndex(string $docsPath, string $navPath): string
    {
        $pages = $this->getPagesFromNav($docsPath, $navPath);

        $lines = [];
        $lines[] = '# Monorail';
        $lines[] = '> Server-Driven UI framework for Laravel + Inertia.js + React';
        $lines[] = '';
        $lines[] = '## Documentation';
        $lines[] = '';

        foreach ($pages as $page) {
            if (! empty($page['children'])) {
                $lines[] = "### {$page['title']}";
                $lines[] = '';

                foreach ($page['children'] as $child) {
                    $url = "https://monorail.dev/docs/{$child['slug']}";
                    $lines[] = "- [{$child['title']}]({$url})";
                }

                $lines[] = '';
            } elseif (! empty($page['slug'])) {
                $url = "https://monorail.dev/docs/{$page['slug']}";
                $lines[] = "- [{$page['title']}]({$url})";
                $lines[] = '';
            }
        }

        return implode("\n", $lines);
    }

    private function generateLlmFull(string $docsPath, string $navPath): string
    {
        $pages = $this->getPagesFromNav($docsPath, $navPath);

        $content = [];
        $content[] = '# Monorail Documentation';
        $content[] = '';
        $content[] = '> Server-Driven UI framework for Laravel + Inertia.js + React';
        $content[] = '';
        $content[] = 'Full documentation for Monorail, a server-driven admin panel builder for Laravel.';
        $content[] = '';
        $content[] = '---';
        $content[] = '';

        foreach ($pages as $page) {
            if (! empty($page['children'])) {
                foreach ($page['children'] as $child) {
                    $filePath = $docsPath."/{$child['slug']}.md";

                    if (! file_exists($filePath)) {
                        continue;
                    }

                    $markdown = file_get_contents($filePath);
                    $title = $this->extractTitle($markdown) ?: $child['title'];

                    $content[] = "## {$title}";
                    $content[] = '';
                    $content[] = $markdown;
                    $content[] = '';
                    $content[] = '---';
                    $content[] = '';
                }
            } elseif (! empty($page['slug'])) {
                $filePath = $docsPath."/{$page['slug']}.md";

                if (! file_exists($filePath)) {
                    continue;
                }

                $markdown = file_get_contents($filePath);
                $title = $this->extractTitle($markdown) ?: $page['title'];

                $content[] = "## {$title}";
                $content[] = '';
                $content[] = $markdown;
                $content[] = '';
                $content[] = '---';
                $content[] = '';
            }
        }

        return implode("\n", $content);
    }

    /**
     * @return array<int, array{title: string, slug: string, children?: array}>
     */
    private function getPagesFromNav(string $docsPath, string $navPath): array
    {
        if (! file_exists($navPath)) {
            return $this->getPagesFromFilesystem($docsPath);
        }

        $nav = json_decode(file_get_contents($navPath), true);

        if (! is_array($nav) || ! isset($nav['sections'])) {
            return $this->getPagesFromFilesystem($docsPath);
        }

        $pages = [];

        foreach ($nav['sections'] as $section) {
            $children = [];

            foreach ($section['items'] as $item) {
                if (is_string($item)) {
                    $itemPath = $docsPath."/{$item}.md";
                    $children[] = [
                        'title' => file_exists($itemPath) ? $this->extractTitle(file_get_contents($itemPath)) : $this->humanize(basename($item)),
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

        foreach (File::directories($docsPath) as $dir) {
            $dirName = basename($dir);
            $children = [];

            foreach (File::files($dir) as $file) {
                if ($file->getExtension() !== 'md') {
                    continue;
                }

                $markdown = file_get_contents($file->getPathname());
                $children[] = [
                    'title' => $this->extractTitle($markdown) ?: $this->humanize($file->getFilenameWithoutExtension()),
                    'slug' => $dirName.'/'.$file->getFilenameWithoutExtension(),
                ];
            }

            if (! empty($children)) {
                $pages[] = [
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

            $markdown = file_get_contents($file->getPathname());
            $pages[] = [
                'title' => $this->extractTitle($markdown) ?: $this->humanize($file->getFilenameWithoutExtension()),
                'slug' => $file->getFilenameWithoutExtension(),
            ];
        }

        return $pages;
    }

    private function extractTitle(string $markdown): ?string
    {
        if (preg_match('/^#\s+(.+)$/m', $markdown, $matches)) {
            return trim($matches[1]);
        }

        return null;
    }

    private function humanize(string $value): string
    {
        return ucwords(str_replace(['-', '_'], ' ', $value));
    }
}
