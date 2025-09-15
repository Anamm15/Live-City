"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFacilitySchema = exports.CreateFacilitySchema = void 0;
const zod_1 = require("zod");
exports.CreateFacilitySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nama tidak boleh kosong"),
    description: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong"),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
    buildDate: zod_1.z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
            const parsed = new Date(val);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return val;
    }, zod_1.z.date({ message: "Tanggal lahir tidak valid" })),
});
exports.UpdateFacilitySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nama tidak boleh kosong").optional(),
    description: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
    buildDate: zod_1.z.date("Tanggal tidak valid").optional(),
});
