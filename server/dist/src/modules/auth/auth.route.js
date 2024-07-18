"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authValidation_1 = require("@/middlewares/validation/authValidation");
const router = express_1.default.Router();
router.post("/signup", auth_controller_1.default.signup, authValidation_1.signupUserValidation);
exports.AuthRoute = router;
//# sourceMappingURL=auth.route.js.map