import { z } from 'zod';

export const CreateVillageSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    postalCode: z.string().min(1, "Kode pos tidak boleh kosong"),
    latitude: z.number(),
    longitude: z.number(),
});

export const UpdateVillageSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong").optional(),
    postalCode: z.string().min(1, "Kode pos tidak boleh kosong").optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
});

export type CreateVillageInput = z.infer<typeof CreateVillageSchema>;
export type UpdateVillageInput = z.infer<typeof UpdateVillageSchema>;