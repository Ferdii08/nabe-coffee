<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CapacitySlotRequest;
use App\Models\Branch;
use App\Models\CapacitySlot;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class CapacitySlotController extends Controller
{
    public function index(): View
    {
        $slots = CapacitySlot::query()
            ->with('branch')
            ->orderBy('date')
            ->orderBy('start_time')
            ->paginate(15);

        return view('admin.capacity-slots.index', compact('slots'));
    }

    public function create(): View
    {
        $branches = Branch::query()->orderBy('name')->get();

        return view('admin.capacity-slots.create', compact('branches'));
    }

    public function store(CapacitySlotRequest $request): RedirectResponse
    {
        $slot = CapacitySlot::create($request->validated());

        return redirect()
            ->route('admin.capacity-slots.show', $slot)
            ->with('success', 'Kuota berhasil ditambahkan.');
    }

    public function show(CapacitySlot $slot): View
    {
        $slot->load('branch');

        return view('admin.capacity-slots.show', compact('slot'));
    }

    public function edit(CapacitySlot $slot): View
    {
        $branches = Branch::query()->orderBy('name')->get();

        return view('admin.capacity-slots.edit', compact('slot', 'branches'));
    }

    public function update(CapacitySlotRequest $request, CapacitySlot $slot): RedirectResponse
    {
        $slot->update($request->validated());

        return redirect()
            ->route('admin.capacity-slots.show', $slot)
            ->with('success', 'Kuota berhasil diperbarui.');
    }

    public function destroy(CapacitySlot $slot): RedirectResponse
    {
        $slot->delete();

        return redirect()
            ->route('admin.capacity-slots.index')
            ->with('success', 'Kuota berhasil dihapus.');
    }
}
