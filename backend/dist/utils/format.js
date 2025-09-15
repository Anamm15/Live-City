"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.generateFilename = void 0;
const generateFilename = (type, id) => {
    const random = Math.random().toString(36).substring(2, 8);
    return `${type}-${id}-${Date.now()}-${random}`;
};
exports.generateFilename = generateFilename;
const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};
exports.formatDate = formatDate;
