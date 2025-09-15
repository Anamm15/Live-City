"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewsReactionSchema = exports.CreateNewsCommentSchema = exports.UpdateNewsSchema = exports.CreateNewsSchema = void 0;
const zod_1 = require("zod");
exports.CreateNewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul tidak boleh kosong"),
    date: zod_1.z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
            const parsed = new Date(val);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return val;
    }, zod_1.z.date({ message: "Tanggal lahir tidak valid" })),
    content: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong"),
});
exports.UpdateNewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul tidak boleh kosong").optional(),
    date: zod_1.z.date("Tanggal tidak valid").optional(),
    content: zod_1.z.string().min(1, "Deskripsi tidak boleh kosong").optional(),
});
exports.CreateNewsCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Komentar tidak boleh kosong"),
});
exports.CreateNewsReactionSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    newsId: zod_1.z.number(),
});
