import { z } from 'zod';

export const CreateUserSchema = z.object({
   nationalIdentityNumber: z.string().min(16, "Nomor identitas harus 16 karakter"),
   name: z.string().min(1, "Nama tidak boleh kosong"),
   email: z.string().email("Format email tidak valid").optional(),
   password: z.string().min(6, "Password minimal 6 karakter"),
   gender: z.enum(["MALE", "FEMALE"], "Jenis kelamin tidak valid"),
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
   religion: z.enum(['ISLAM', 'CHRISTIAN', 'CATHOLIC','HINDUISM', 'BUDDHISM', 'CONFUCIANISM', 'JUDAISM'], "Agama tidak valid"),
   maritalStatus: z.enum(["NEVER_MARRIED", "MARRIED", "DIVORCED", "WIDOWED"], "Status perkawinan tidak valid").optional(),
   education: z.enum(["NO_SCHOOLING", "ELEMENTARY", "MIDDLE_SCHOOL", "HIGH_SCHOOL", "DIPLOMA_3", "DIPLOMA_4", "BACHELOR", "MASTER", "DOCTORATE"], "Pendidikan tidak valid").optional(),
   job: z.enum(['ENTREPRENEUR', 'UNEMPLOYED', 'EMPLOYED', 'STUDENT', 'RETIRED', 'OTHER'], "Pekerjaan tidak valid").optional(),
   phoneNumber: z.string().min(1, "Nomor telepon tidak boleh kosong").optional(),
   family: z.object({ connect: z.object({ id: z.number() }) })
});

// Type untuk TypeScript otomatis dari schema
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
   nationalIdentityNumber: z.string().min(16, "Nomor identitas harus 16 karakter").optional(),
   name: z.string().min(1, "Nama tidak boleh kosong").optional(),
   email: z.string().email("Format email tidak valid").optional(),
   password: z.string().min(6, "Password minimal 6 karakter").optional(),
   gender: z.enum(["MALE", "FEMALE"], "Jenis kelamin tidak valid").optional(),
   birthday: z.date("Tanggal lahir tidak valid").optional(),
   birthplace: z.string().min(1, "Tempat lahir tidak boleh kosong").optional(),
   religion: z.enum(["ISLAM", "PROTESTAN", "KATOLIK", "HINDU", "BUDHA", "KONGHUCU"], "Agama tidak valid").optional(),
   maritalStatus: z.enum(["NEVER_MARRIED", "MARRIED", "DIVORCED", "WIDOWED"], "Status perkawinan tidak valid").optional(),
   education: z.enum(["NO_SCHOOLING", "ELEMENTARY", "MIDDLE_SCHOOL", "HIGH_SCHOOL", "DIPLOMA_3", "DIPLOMA_4", "BACHELOR", "MASTER", "DOCTORATE"], "Pendidikan tidak valid").optional(),
   job: z.enum(["UNEMPLOYED", "STUDENT", "EMPLOYED", "SELF_EMPLOYED", "RETIRED"], "Pekerjaan tidak valid").optional(),
   phoneNumber: z.string().min(1, "Nomor telepon tidak boleh kosong").optional(),
   family: z.object({ connect: z.object({ id: z.number() }) }).optional(),
});

// Type untuk TypeScript otomatis dari schema
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
