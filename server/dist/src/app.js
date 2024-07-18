"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_ts_1 = __importDefault(require("colors.ts"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("./modules/route"));
const notFound_1 = __importDefault(require("./middlewares/error/notFound"));
const errorHandling_1 = __importDefault(require("./middlewares/error/errorHandling"));
colors_ts_1.default?.enable();
dotenv_1.default.config();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
(0, route_1.default)(app);
app.use(errorHandling_1.default);
app.use(notFound_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map