<?php

use App\Http\Controllers\DocsController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::get('/docs', [DocsController::class, 'index'])->name('docs');
Route::get('/docs/{slug}', [DocsController::class, 'show'])->where('slug', '.*')->name('docs.show');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });
