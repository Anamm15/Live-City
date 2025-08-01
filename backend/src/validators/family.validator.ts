import { z } from 'zod';
import { EconomicStatus } from '../helpers/entity.constants';

export const CreateFamilySchema = z.object({
   familyNumber: z.string().min(1, "Nomor keluarga tidak boleh kosong"),
   headFamily: z.string().min(1, "Nama kepala keluarga tidak boleh kosong"),
   address: z.string().min(1, "Alamat tidak boleh kosong"),
   economicStatus: z.enum(EconomicStatus, "Status ekonomi tidak valid"),
});

export const UpdateFamilySchema = z.object({
   id: z.number().optional(),
   familyNumber: z.string().min(1, "Nomor keluarga tidak boleh kosong").optional(),
   headFamily: z.string().min(1, "Nama kepala keluarga tidak boleh kosong").optional(),
   address: z.string().min(1, "Alamat tidak boleh kosong").optional(),
   economicStatus: z.enum(EconomicStatus, "Status ekonomi tidak valid").optional(),
});

export type CreateFamilyInput = z.infer<typeof CreateFamilySchema>;
export type UpdateFamilyInput = z.infer<typeof UpdateFamilySchema>;
