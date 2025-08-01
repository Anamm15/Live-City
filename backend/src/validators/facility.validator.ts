import { z } from 'zod';

export const CreateFacilitySchema = z.object({
   name: z.string().min(1, "Nama tidak boleh kosong"),
   description: z.string().min(1, "Deskripsi tidak boleh kosong"),
   latitude: z.number(),
   longitude: z.number(),
   buildDate: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const parsed = new Date(val);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      return val;
    },
    z.date({ message: "Tanggal lahir tidak valid" })
  ),
});

export const UpdateFacilitySchema = z.object({
   name: z.string().min(1, "Nama tidak boleh kosong").optional(),
   description: z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
   latitude: z.number().optional(),
   longitude: z.number().optional(),
   buildDate: z.date("Tanggal tidak valid").optional(),
});

export type CreateFacilityInput = z.infer<typeof CreateFacilitySchema>;
export type UpdateFacilityInput = z.infer<typeof UpdateFacilitySchema>;