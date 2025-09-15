"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResponseReportSchema = exports.UpdateReportSchema = exports.CreateReportSchema = void 0;
const zod_1 = require("zod");
const entity_constants_1 = require("../helpers/entity.constants");
exports.CreateReportSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul tidak boleh kosong"),
    description: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong"),
    category: zod_1.z.enum(entity_constants_1.ReportCategory, "Kategori tidak valid"),
});
exports.UpdateReportSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul tidak boleh kosong").optional(),
    description: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
    category: zod_1.z.enum(entity_constants_1.ReportCategory, "Kategori tidak valid").optional(),
});
exports.UpdateResponseReportSchema = zod_1.z.object({
    response: zod_1.z.string().min(1, "Respon tidak boleh kosong").optional(),
    status: zod_1.z.enum(entity_constants_1.ReportStatus).optional(),
});
