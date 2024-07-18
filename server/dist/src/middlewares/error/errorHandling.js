"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlingMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res?.status(statusCode).send({
        data: null,
        success: false,
        error: true,
        message: error.message || "Internal Server Error",
        statusCode: statusCode,
        stack: process.env.NODE_ENV === "production" ? "" : error.stack,
    });
};
exports.default = errorHandlingMiddleware;
//# sourceMappingURL=errorHandling.js.map