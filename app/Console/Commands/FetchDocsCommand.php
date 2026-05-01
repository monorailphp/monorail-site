<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
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
}
