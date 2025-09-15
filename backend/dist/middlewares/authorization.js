"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).send((0, response_1.buildResponseError)('Forbidden: You do not have permission to access this resource', 'Role not authorized'));
        }
        next();
    };
};
exports.default = authorizeRoles;
