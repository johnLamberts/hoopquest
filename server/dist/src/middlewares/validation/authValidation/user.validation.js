"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUserValidation = void 0;
const validator_1 = __importDefault(require("../validator"));
const userSchema_validation_1 = __importDefault(require("./userSchema.validation"));
const signupUserValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_validation_1.default.signupUser, { ...req.body }, next);
};
exports.signupUserValidation = signupUserValidation;
//# sourceMappingURL=user.validation.js.map