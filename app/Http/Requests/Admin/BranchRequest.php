<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class BranchRequest extends FormRequest
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
     * Nama kolom mengikuti skema resmi (1.1): opens_at, closes_at, maps_url.
     * Alamat dan nomor WhatsApp admin nullable di skema resmi.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'opens_at' => ['required', 'date_format:H:i'],
            'closes_at' => ['required', 'date_format:H:i'],
            'admin_whatsapp' => ['nullable', 'string', 'max:20'],
            'telegram_chat_id' => ['nullable', 'string', 'max:255'],
            'pic_email' => ['nullable', 'email', 'max:255'],
            'maps_url' => ['nullable', 'url', 'max:1000'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $opening = $this->input('opens_at');
            $closing = $this->input('closes_at');

            if (! is_string($opening) || ! is_string($closing)) {
                return;
            }

            // Jam tutup 00:00 berarti tengah malam (24:00), bukan awal hari.
            $openingMinutes = $this->toMinutes($opening);
            $closingMinutes = $closing === '00:00' ? 24 * 60 : $this->toMinutes($closing);

            if ($openingMinutes >= $closingMinutes) {
                $validator->errors()->add('closes_at', 'Jam tutup harus setelah jam buka.');
            }
        });
    }

    private function toMinutes(string $time): int
    {
        [$hour, $minute] = explode(':', $time);

        return ((int) $hour * 60) + (int) $minute;
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama cabang wajib diisi.',
            'name.max' => 'Nama cabang maksimal 255 karakter.',
            'address.max' => 'Alamat cabang maksimal 500 karakter.',
            'opens_at.required' => 'Jam buka wajib diisi.',
            'opens_at.date_format' => 'Jam buka harus dalam format jam:menit, contoh 07:00.',
            'closes_at.required' => 'Jam tutup wajib diisi.',
            'closes_at.date_format' => 'Jam tutup harus dalam format jam:menit, contoh 22:00.',
            'admin_whatsapp.max' => 'Nomor WhatsApp admin maksimal 20 karakter.',
            'telegram_chat_id.max' => 'ID chat Telegram maksimal 255 karakter.',
            'pic_email.email' => 'Email penanggung jawab harus berupa alamat email yang valid.',
            'pic_email.max' => 'Email penanggung jawab maksimal 255 karakter.',
            'maps_url.url' => 'Tautan Google Maps harus berupa URL yang valid.',
            'maps_url.max' => 'Tautan Google Maps maksimal 1000 karakter.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'nama cabang',
            'address' => 'alamat',
            'opens_at' => 'jam buka',
            'closes_at' => 'jam tutup',
            'admin_whatsapp' => 'nomor WhatsApp admin',
            'telegram_chat_id' => 'ID chat Telegram',
            'pic_email' => 'email penanggung jawab',
            'maps_url' => 'tautan Google Maps',
        ];
    }
}
