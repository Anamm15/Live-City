"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFamilySchema = exports.CreateFamilySchema = void 0;
const zod_1 = require("zod");
const entity_constants_1 = require("../helpers/entity.constants");
exports.CreateFamilySchema = zod_1.z.object({
    familyNumber: zod_1.z.string().min(1, "Nomor keluarga tidak boleh kosong"),
    headFamily: zod_1.z.string().min(1, "Nama kepala keluarga tidak boleh kosong"),
    address: zod_1.z.string().min(1, "Alamat tidak boleh kosong"),
    economicStatus: zod_1.z.enum(entity_constants_1.EconomicStatus, "Status ekonomi tidak valid"),
});
exports.UpdateFamilySchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    familyNumber: zod_1.z.string().min(1, "Nomor keluarga tidak boleh kosong").optional(),
    headFamily: zod_1.z.string().min(1, "Nama kepala keluarga tidak boleh kosong").optional(),
    address: zod_1.z.string().min(1, "Alamat tidak boleh kosong").optional(),
    economicStatus: zod_1.z.enum(entity_constants_1.EconomicStatus, "Status ekonomi tidak valid").optional(),
});
