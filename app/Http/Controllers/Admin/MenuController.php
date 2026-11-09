<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MenuRequest;
use App\Models\Branch;
use App\Models\Menu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class MenuController extends Controller
{
    public function index(): View
    {
        $menus = Menu::query()->with('branch')->orderBy('name')->paginate(15);

        return view('admin.menus.index', compact('menus'));
    }

    public function create(): View
    {
        $branches = Branch::query()->orderBy('name')->get();

        return view('admin.menus.create', compact('branches'));
    }

    public function store(MenuRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['is_best_seller'] = $request->boolean('is_best_seller');
        $data['is_available'] = $request->boolean('is_available', true);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('menus', 'public');
        }

        $menu = Menu::create($data);

        return redirect()
            ->route('admin.menus.show', $menu)
            ->with('success', 'Menu berhasil ditambahkan.');
    }

    public function show(Menu $menu): View
    {
        $menu->load('branch');

        return view('admin.menus.show', compact('menu'));
    }

    public function edit(Menu $menu): View
    {
        $branches = Branch::query()->orderBy('name')->get();

        return view('admin.menus.edit', compact('menu', 'branches'));
    }

    public function update(MenuRequest $request, Menu $menu): RedirectResponse
    {
        $data = $request->validated();
        $data['is_best_seller'] = $request->boolean('is_best_seller');
        $data['is_available'] = $request->boolean('is_available');

        if ($request->hasFile('photo')) {
            if ($menu->photo !== null) {
                Storage::disk('public')->delete($menu->photo);
            }

            $data['photo'] = $request->file('photo')->store('menus', 'public');
        }

        $menu->update($data);

        return redirect()
            ->route('admin.menus.show', $menu)
            ->with('success', 'Menu berhasil diperbarui.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        if ($menu->photo !== null) {
            Storage::disk('public')->delete($menu->photo);
        }

        $menu->delete();

        return redirect()
            ->route('admin.menus.index')
            ->with('success', 'Menu berhasil dihapus.');
    }
}
