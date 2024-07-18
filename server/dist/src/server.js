"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("@/configs");
const app_1 = __importDefault(require("./app"));
const console_1 = __importDefault(require("console"));
const startServer = async () => {
    try {
        const conn = await (0, configs_1.connectDB)(process.env.NODE_ENV === "test"
            ? configs_1.environmentConfig.TEST_ENV_DATABASE_URI
            : configs_1.environmentConfig.DATABASE_URI, process.env.NODE_ENV === "test"
            ? configs_1.environmentConfig.TEST_ENV_DATABASE_NAME
            : configs_1.environmentConfig.DATABASE_NAME);
        const PORT = parseInt(`${process.env.PORT}`, 10) || 8667;
        app_1.default.listen(PORT, () => console_1.default.log(`Server is running at http://localhost:${PORT}`.bg_green.green));
        console_1.default.log(`MongoDB database connection established successfully to... ${process.env.NODE_ENV === "test"
            ? configs_1.environmentConfig.TEST_ENV_DATABASE_NAME
            : configs_1.environmentConfig.DATABASE_NAME}`.cyan.underline);
    }
    catch (err) {
        console_1.default.error(err);
        process.exit(1);
    }
};
startServer();
exports.default = app_1.default;
//# sourceMappingURL=server.js.map