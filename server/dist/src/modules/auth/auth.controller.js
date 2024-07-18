"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
class AuthController {
    static signup(req, res, next) {
        return auth_service_1.default.signup(req, res, next);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map