"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoute = void 0;
const custom_response_1 = __importDefault(require("../../utils/custom-response"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const message = "Welcome to HoopQuest API 👋🌎";
    res.send((0, custom_response_1.default)({
        data: null,
        success: true,
        error: false,
        message,
        statusCode: 200,
    }));
});
exports.HomeRoute = router;
//# sourceMappingURL=home.route.js.map