import { z } from 'zod';

export const LoginSchema = z.object({
   email: z.string().email("Format email tidak valid"),
   password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof LoginSchema>;