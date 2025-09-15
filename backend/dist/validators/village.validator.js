"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVillageSchema = exports.CreateVillageSchema = void 0;
const zod_1 = require("zod");
exports.CreateVillageSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nama tidak boleh kosong"),
    postalCode: zod_1.z.string().min(1, "Kode pos tidak boleh kosong"),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
});
exports.UpdateVillageSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nama tidak boleh kosong").optional(),
    postalCode: zod_1.z.string().min(1, "Kode pos tidak boleh kosong").optional(),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
});
