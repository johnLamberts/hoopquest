"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchemaValidation = {
    signupUser: joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(30).required(),
        lastName: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref("password")),
        isVerified: joi_1.default.boolean(),
        isDeleted: joi_1.default.boolean(),
    }),
    validatedUserId: joi_1.default.object({
        userId: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$}/)
            .required(),
    }),
};
exports.default = userSchemaValidation;
//# sourceMappingURL=userSchema.validation.js.map