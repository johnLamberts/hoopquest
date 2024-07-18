"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
function notFoundMiddleware(req, res, next) {
    next((0, http_errors_1.default)(404, `Route - ${req.originalUrl} not found!`));
}
exports.notFoundMiddleware = notFoundMiddleware;
exports.default = notFoundMiddleware;
//# sourceMappingURL=notFound.js.map