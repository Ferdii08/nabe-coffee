<?php

namespace App\Http\Requests\Admin;

use App\Models\CapacitySlot;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CapacitySlotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * Kolom kuota mengikuti skema resmi (1.1): max_quota.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'branch_id' => ['required', 'exists:branches,id'],
            'date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i', 'before:end_time'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'max_quota' => ['required', 'integer', 'min:1'],
            'estimated_walk_in' => ['sometimes', 'integer', 'min:0'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if (! $this->filled(['branch_id', 'date', 'start_time', 'end_time'])) {
                return;
            }

            // Kombinasi cabang + tanggal + jam harus unik (sesuai unique
            // di migration resmi). TIME() dipakai agar '09:00' dari form
            // sama dengan '09:00:00' yang tersimpan di kolom time.
            $slot = $this->route('slot');

            $query = CapacitySlot::query()
                ->where('branch_id', $this->input('branch_id'))
                ->whereDate('date', $this->input('date'))
                ->whereRaw('TIME(start_time) = ?', [$this->toSeconds($this->input('start_time'))])
                ->whereRaw('TIME(end_time) = ?', [$this->toSeconds($this->input('end_time'))]);

            if ($slot instanceof CapacitySlot) {
                $query->where('id', '!=', $slot->id);
            }

            if ($query->exists()) {
                $validator->errors()->add('branch_id', 'Kuota untuk cabang, tanggal, dan jam ini sudah ada.');
            }
        });
    }

    private function toSeconds(mixed $time): mixed
    {
        if (is_string($time) && preg_match('/^\d{2}:\d{2}$/', $time) === 1) {
            return $time.':00';
        }

        return $time;
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'branch_id.required' => 'Cabang wajib dipilih.',
            'branch_id.exists' => 'Cabang yang dipilih tidak ditemukan.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
            'start_time.required' => 'Jam mulai wajib diisi.',
            'start_time.date_format' => 'Jam mulai harus dalam format jam:menit, contoh 09:00.',
            'start_time.before' => 'Jam mulai harus sebelum jam selesai.',
            'end_time.required' => 'Jam selesai wajib diisi.',
            'end_time.date_format' => 'Jam selesai harus dalam format jam:menit, contoh 12:00.',
            'end_time.after' => 'Jam selesai harus setelah jam mulai.',
            'max_quota.required' => 'Kapasitas maksimal wajib diisi.',
            'max_quota.integer' => 'Kapasitas maksimal harus berupa angka.',
            'max_quota.min' => 'Kapasitas maksimal minimal 1.',
            'estimated_walk_in.integer' => 'Estimasi walk-in harus berupa angka.',
            'estimated_walk_in.min' => 'Estimasi walk-in tidak boleh kurang dari 0.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'branch_id' => 'cabang',
            'date' => 'tanggal',
            'start_time' => 'jam mulai',
            'end_time' => 'jam selesai',
            'max_quota' => 'kapasitas maksimal',
            'estimated_walk_in' => 'estimasi walk-in',
        ];
    }
}
