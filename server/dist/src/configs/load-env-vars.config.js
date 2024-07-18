"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development",
});
exports.environmentConfig = {
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    DATABASE_URI: process.env.DATABASE_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    TEST_ENV_DATABASE_URI: process.env.TEST_ENV_DATABASE_URI,
    TEST_ENV_DATABASE_NAME: process.env.TEST_ENV_DATABASE_NAME,
};
//# sourceMappingURL=load-env-vars.config.js.map