<?php

use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CapacitySlotController;
use App\Http\Controllers\Admin\MenuController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/two-factor-challenge', function () {
    return view('auth.two-factor-challenge');
})->name('two-factor.login');

Route::get('/two-factor-setup', function () {
    return view('auth.two-factor-setup');
})->name('two-factor.setup');

Route::middleware('owner')->prefix('admin')->name('admin.')->group(function (): void {
    Route::resource('branches', BranchController::class);
    Route::resource('menus', MenuController::class);
    // Parameter route disamakan dengan nama variabel di controller ($slot)
    // agar implicit model binding Laravel berjalan.
    Route::resource('capacity-slots', CapacitySlotController::class)
        ->parameters(['capacity-slots' => 'slot']);
});
