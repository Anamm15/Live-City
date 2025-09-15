"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUIDWithPrefix = void 0;
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12);
const generateUUIDWithPrefix = (prefix) => `${prefix}-${nanoid()}`;
exports.generateUUIDWithPrefix = generateUUIDWithPrefix;
