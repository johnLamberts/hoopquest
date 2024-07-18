"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customResponse = ({ data, success, error, message, statusCode, status, }) => {
    return {
        data,
        success,
        error,
        message,
        statusCode,
        status,
    };
};
exports.default = customResponse;
//# sourceMappingURL=custom-response.js.map