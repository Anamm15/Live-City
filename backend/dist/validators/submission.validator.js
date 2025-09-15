"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubmissionStatusSchema = exports.UpdateSubmissionSchema = exports.CreateSubmissionSchema = void 0;
const zod_1 = require("zod");
const entity_constants_1 = require("../helpers/entity.constants");
exports.CreateSubmissionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul tidak boleh kosong"),
    date: zod_1.z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
            const parsed = new Date(val);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return val;
    }, zod_1.z.date({ message: "Tanggal lahir tidak valid" })),
    category: zod_1.z.enum(entity_constants_1.SubmissionCategory, "Kategori tidak valid"),
    description: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong"),
});
exports.UpdateSubmissionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul tidak boleh kosong").optional(),
    date: zod_1.z.date("Tanggal tidak valid").optional(),
    category: zod_1.z.enum(entity_constants_1.SubmissionCategory, "Kategori tidak valid").optional(),
    status: zod_1.z.enum(entity_constants_1.SubmissionStatus, "Status tidak valid").optional(),
    description: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
});
exports.UpdateSubmissionStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(entity_constants_1.SubmissionStatus, "Status tidak valid"),
});
