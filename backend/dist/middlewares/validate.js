"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const message_constants_1 = require("../helpers/message.constants");
const response_1 = require("../utils/response");
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errorsString = result.error.issues
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join('; ');
        return res.status(400).send((0, response_1.buildResponseError)(errorsString, message_constants_1.CommonMessage.INVALID_REQUEST_DATA));
    }
    req.body = result.data;
    next();
};
exports.validate = validate;
