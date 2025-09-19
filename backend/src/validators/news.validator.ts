import { z } from "zod";

export const CreateNewsSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  date: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const parsed = new Date(val);
      return isNaN(parsed.getTime()) ? undefined : parsed;
    }
    return val;
  }, z.date({ message: "Tanggal lahir tidak valid" })),
  content: z.string().min(1, "Deskripsi tidak boleh kosong"),
});

export const UpdateNewsSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong").optional(),
  date: z
    .preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        const parsed = new Date(val);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      return val;
    }, z.date({ message: "Tanggal lahir tidak valid" }))
    .optional(),
  content: z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
});

export const CreateNewsCommentSchema = z.object({
  content: z.string().min(1, "Komentar tidak boleh kosong"),
});

export const CreateNewsReactionSchema = z.object({
  userId: z.number(),
  newsId: z.number(),
});

export type CreateNewsInput = z.infer<typeof CreateNewsSchema>;
export type UpdateNewsInput = z.infer<typeof UpdateNewsSchema>;
export type CreateNewsCommentInput = z.infer<typeof CreateNewsCommentSchema>;
export type CreateNewsReactionInput = z.infer<typeof CreateNewsReactionSchema>;
