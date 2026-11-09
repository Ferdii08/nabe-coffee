<?php

namespace App\Http\Requests\Admin;

use App\Models\Menu;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Form mengirim tag sebagai teks dipisah koma; skema resmi (1.1)
     * menyimpan tags sebagai JSON (array). Ubah dulu sebelum validasi.
     */
    protected function prepareForValidation(): void
    {
        $tags = $this->input('tags');

        if (is_string($tags)) {
            $this->merge([
                'tags' => array_values(array_filter(array_map(
                    fn (string $tag): string => trim($tag),
                    explode(',', $tags)
                ))),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * Kategori mengikuti enum resmi (1.1): coffee, non_coffee,
     * heavy_meal, snack.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'branch_id' => ['required', 'exists:branches,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(Menu::CATEGORIES)],
            'price' => ['required', 'integer', 'min:0'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:100'],
            'is_best_seller' => ['sometimes', 'boolean'],
            'is_available' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'branch_id.required' => 'Cabang wajib dipilih.',
            'branch_id.exists' => 'Cabang yang dipilih tidak ditemukan.',
            'name.required' => 'Nama menu wajib diisi.',
            'name.max' => 'Nama menu maksimal 255 karakter.',
            'category.required' => 'Kategori menu wajib dipilih.',
            'category.in' => 'Kategori menu harus salah satu dari: kopi, non-kopi, makanan berat, atau camilan.',
            'price.required' => 'Harga menu wajib diisi.',
            'price.integer' => 'Harga menu harus berupa angka.',
            'price.min' => 'Harga menu tidak boleh kurang dari 0.',
            'photo.image' => 'Foto menu harus berupa gambar.',
            'photo.max' => 'Ukuran foto menu maksimal 2 MB.',
            'tags.array' => 'Tag menu harus berupa daftar tag.',
            'tags.*.max' => 'Setiap tag menu maksimal 100 karakter.',
            'is_best_seller.boolean' => 'Penanda terlaris harus berupa ya atau tidak.',
            'is_available.boolean' => 'Penanda ketersediaan harus berupa ya atau tidak.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'branch_id' => 'cabang',
            'name' => 'nama menu',
            'category' => 'kategori',
            'price' => 'harga',
            'photo' => 'foto menu',
            'tags' => 'tag',
            'is_best_seller' => 'terlaris',
            'is_available' => 'ketersediaan',
        ];
    }
}
