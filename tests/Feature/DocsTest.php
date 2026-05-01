<?php

test('docs index page renders successfully', function () {
    $response = $this->get(route('docs'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('pages')
        ->has('currentPage')
        ->has('currentPageTitle')
        ->has('content')
    );
});

test('docs show page renders a markdown file', function () {
    $response = $this->get(route('docs.show', ['slug' => 'README']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('pages')
        ->has('currentPage')
        ->has('currentPageTitle')
        ->has('content')
        ->where('currentPage', 'README')
        ->where('currentPageTitle', 'Monorail Documentation')
    );
});

test('docs show page renders nested markdown files', function () {
    $response = $this->get(route('docs.show', ['slug' => 'getting-started/installation']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('pages')
        ->has('currentPage')
        ->has('currentPageTitle')
        ->has('content')
        ->where('currentPage', 'getting-started/installation')
    );
});

test('docs show page returns 404 for missing file', function () {
    $response = $this->get(route('docs.show', ['slug' => 'non-existent-file']));

    $response->assertNotFound();
});

test('docs show page blocks path traversal attempts', function () {
    $response = $this->get(route('docs.show', ['slug' => '../../.env']));

    $response->assertNotFound();
});

test('docs show page blocks nested path traversal attempts', function () {
    $response = $this->get(route('docs.show', ['slug' => 'getting-started/../../config/database']));

    $response->assertNotFound();
});
