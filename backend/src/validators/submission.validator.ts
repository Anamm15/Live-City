import { z } from 'zod';
import { SubmissionCategory } from '../helpers/entity.constants';
import { SubmissionStatus } from '../generated/prisma';

export const CreateSubmissionSchema = z.object({
   title: z.string().min(1, "Judul tidak boleh kosong"),
   date: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const parsed = new Date(val);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      return val;
    },
    z.date({ message: "Tanggal lahir tidak valid" })
  ),
   category: z.enum(SubmissionCategory, "Kategori tidak valid"),
   description: z.string().min(1, "Deskripsi tidak boleh kosong"),
});

export const UpdateSubmissionSchema = z.object({
   title: z.string().min(1, "Judul tidak boleh kosong").optional(),
   date: z.date("Tanggal tidak valid").optional(),
   category: z.enum(SubmissionCategory, "Kategori tidak valid").optional(),
   status: z.enum(SubmissionStatus, "Status tidak valid").optional(),
   description: z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
});

export const UpdateSubmissionStatusSchema = z.object({
   status: z.enum(SubmissionStatus, "Status tidak valid"),
})

export type CreateSubmissionRequest = z.infer<typeof CreateSubmissionSchema>;
export type UpdateSubmissionRequest = z.infer<typeof UpdateSubmissionSchema>;
export type UpdateSubmissionStatusRequest = z.infer<typeof UpdateSubmissionStatusSchema>;