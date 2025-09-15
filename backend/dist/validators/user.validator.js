"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const zod_2 = require("../utils/zod");
const entity_constants_1 = require("../helpers/entity.constants");
exports.CreateUserSchema = zod_1.z.object({
    nationalIdentityNumber: zod_1.z.string().min(16, "Nomor identitas harus 16 karakter"),
    name: zod_1.z.string().min(1, "Nama tidak boleh kosong"),
    email: (0, zod_2.optionalNullable)(zod_1.z.string().email("Format email tidak valid")),
    password: zod_1.z.string().min(6, "Password minimal 6 karakter"),
    gender: zod_1.z.enum(entity_constants_1.Gender, "Jenis kelamin tidak valid"),
    birthday: zod_1.z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
            const parsed = new Date(val);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return val;
    }, zod_1.z.date({ message: "Tanggal lahir tidak valid" })),
    birthplace: zod_1.z.string().min(1, "Tempat lahir tidak boleh kosong"),
    religion: zod_1.z.enum(entity_constants_1.Religion, "Agama tidak valid"),
    maritalStatus: (0, zod_2.optionalNullable)(zod_1.z.enum(entity_constants_1.MaritalStatus, "Status perkawinan tidak valid")),
    education: (0, zod_2.optionalNullable)(zod_1.z.enum(entity_constants_1.Education, "Pendidikan tidak valid")),
    job: (0, zod_2.optionalNullable)(zod_1.z.enum(entity_constants_1.Occupation, "Pekerjaan tidak valid")),
    phoneNumber: (0, zod_2.optionalNullable)(zod_1.z.string().min(1, "Nomor telepon tidak boleh kosong")),
    family: zod_1.z.object({ connect: zod_1.z.object({ id: zod_1.z.number() }) })
});
exports.UpdateUserSchema = zod_1.z.object({
    nationalIdentityNumber: zod_1.z.string().min(16, "Nomor identitas harus 16 karakter").optional(),
    name: zod_1.z.string().min(1, "Nama tidak boleh kosong").optional(),
    email: zod_1.z.string().email("Format email tidak valid").optional(),
    password: zod_1.z.string().min(6, "Password minimal 6 karakter").optional(),
    gender: zod_1.z.enum(entity_constants_1.Gender, "Jenis kelamin tidak valid").optional(),
    birthday: zod_1.z.date("Tanggal lahir tidak valid").optional(),
    birthplace: zod_1.z.string().min(1, "Tempat lahir tidak boleh kosong").optional(),
    religion: zod_1.z.enum(entity_constants_1.Religion, "Agama tidak valid").optional(),
    maritalStatus: zod_1.z.enum(entity_constants_1.MaritalStatus, "Status perkawinan tidak valid").optional(),
    education: zod_1.z.enum(entity_constants_1.Education, "Pendidikan tidak valid").optional(),
    job: zod_1.z.enum(entity_constants_1.Occupation, "Pekerjaan tidak valid").optional(),
    phoneNumber: zod_1.z.string().min(1, "Nomor telepon tidak boleh kosong").optional(),
    family: zod_1.z.object({ connect: zod_1.z.object({ id: zod_1.z.number() }) }).optional(),
});
