"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalNullable = void 0;
const optionalNullable = (schema) => schema.optional().transform((val) => val ?? null);
exports.optionalNullable = optionalNullable;
