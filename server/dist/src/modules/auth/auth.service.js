"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const http_errors_1 = __importStar(require("http-errors"));
const custom_response_1 = __importDefault(require("@/utils/custom-response"));
class AuthService {
    static async signup(req, res, next) {
        const { email, password, firstName, lastName, confirmPassword, gender } = req.body;
        try {
            const isEmailExit = await user_model_1.default.findOne({
                email,
            });
            console.log(isEmailExit);
            if (isEmailExit) {
                return next((0, http_errors_1.default)(409, `Email address ${email} is already exists, please pick a different one.`));
            }
            const data = {
                user: {
                    email,
                    firstName,
                    lastName,
                },
            };
            const newUser = new user_model_1.default({
                email,
                password,
                firstName,
                lastName,
                confirmPassword,
            });
            const user = await newUser.save();
            return res.status(201).json((0, custom_response_1.default)({
                data,
                success: true,
                error: false,
                message: "Auth signup is success. an Email with verficiation",
                statusCode: 201,
            }));
        }
        catch (err) {
            console.log(err);
            return next(http_errors_1.InternalServerError);
        }
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map