import { z } from 'zod';
import { ReportCategory, ReportStatus } from '../helpers/entity.constants';

export const CreateReportSchema = z.object({
   title: z.string().min(1, "Judul tidak boleh kosong"),
   description: z.string().min(1, "Deskripsi tidak boleh kosong"),
   category: z.enum(ReportCategory, "Kategori tidak valid"),
});

export const UpdateReportSchema = z.object({
   title: z.string().min(1, "Judul tidak boleh kosong").optional(),
   description: z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
   category: z.enum(ReportCategory, "Kategori tidak valid").optional(),
});

export const UpdateResponseReportSchema = z.object({
   response: z.string().min(1, "Respon tidak boleh kosong").optional(),
   status: z.enum(ReportStatus).optional(),
});

export type CreateReportInput = z.infer<typeof CreateReportSchema>;
export type UpdateReportInput = z.infer<typeof UpdateReportSchema>;
export type UpdateResponseReportInput = z.infer<typeof UpdateResponseReportSchema>;