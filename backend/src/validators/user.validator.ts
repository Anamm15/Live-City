import { z } from 'zod';
import { optionalNullable } from '../utils/zod';
import { Education, Gender, MaritalStatus, Occupation, Religion } from '../helpers/entity.constants';

export const CreateUserSchema = z.object({
   nationalIdentityNumber: z.string().min(16, "Nomor identitas harus 16 karakter"),
   name: z.string().min(1, "Nama tidak boleh kosong"),
   email: optionalNullable(z.string().email("Format email tidak valid")),
   password: z.string().min(6, "Password minimal 6 karakter"),
   gender: z.enum(Gender, "Jenis kelamin tidak valid"),
   birthday: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const parsed = new Date(val);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      return val;
    },
    z.date({ message: "Tanggal lahir tidak valid" })
  ),
   birthplace: z.string().min(1, "Tempat lahir tidak boleh kosong"),
   religion: z.enum(Religion, "Agama tidak valid"),
   maritalStatus: optionalNullable(z.enum(MaritalStatus, "Status perkawinan tidak valid")),
   education: optionalNullable(z.enum(Education, "Pendidikan tidak valid")),
   job: optionalNullable(z.enum(Occupation, "Pekerjaan tidak valid")),
   phoneNumber: optionalNullable(z.string().min(1, "Nomor telepon tidak boleh kosong")),
   family: z.object({ connect: z.object({ id: z.number() }) })
});

export const UpdateUserSchema = z.object({
   nationalIdentityNumber: z.string().min(16, "Nomor identitas harus 16 karakter").optional(),
   name: z.string().min(1, "Nama tidak boleh kosong").optional(),
   email: z.string().email("Format email tidak valid").optional(),
   password: z.string().min(6, "Password minimal 6 karakter").optional(),
   gender: z.enum(Gender, "Jenis kelamin tidak valid").optional(),
   birthday: z.date("Tanggal lahir tidak valid").optional(),
   birthplace: z.string().min(1, "Tempat lahir tidak boleh kosong").optional(),
   religion: z.enum(Religion, "Agama tidak valid").optional(),
   maritalStatus: z.enum(MaritalStatus, "Status perkawinan tidak valid").optional(),
   education: z.enum(Education, "Pendidikan tidak valid").optional(),
   job: z.enum(Occupation, "Pekerjaan tidak valid").optional(),
   phoneNumber: z.string().min(1, "Nomor telepon tidak boleh kosong").optional(),
   family: z.object({ connect: z.object({ id: z.number() }) }).optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
