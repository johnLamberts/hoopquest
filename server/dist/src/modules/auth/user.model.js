"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/constants");
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("@/configs");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Please provide first name"],
        minLength: [3, "First name can't be smaller than 3 characters"],
        maxLength: [30, "First name can't be greated than 30 characters"],
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Please provide first name"],
        minLength: [3, "Last name can't be smaller than 3 characters"],
        maxLength: [30, "Last name can't be greated than 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: [128, "Email can't be greater than 128 characters"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [3, "Password must be more than 6 characters"],
        trim: true,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Please provide confirmed password"],
        minLength: [3, "Password must be more than 6 characters"],
        trim: true,
        select: false,
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
        enum: [constants_1.authorizationRoles.user, constants_1.authorizationRoles.admin],
        default: constants_1.authorizationRoles.user,
    },
    status: {
        type: String,
        enum: ["pending", "active"],
        default: "active",
        required: false,
        trim: true,
        lowercase: true,
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt_1.default.compare(candidatePassword, this.password);
    return isMatch;
};
UserSchema.pre("save", async function (next) {
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
        console.log("Middleware called before saving the user is", this);
    }
    const user = this;
    if (user.isModified("password")) {
        const salt = await bcrypt_1.default.genSalt(12);
        user.password = await bcrypt_1.default.hash(user.password, salt);
        user.confirmPassword = await bcrypt_1.default.hash(user.password, salt);
    }
    next();
});
UserSchema.post("save", function () {
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
        console.log("Middleware called after saving the user is (User is been Save )", this);
    }
});
UserSchema.methods.createJWT = function () {
    const payload = {
        userId: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
    };
    return jsonwebtoken_1.default.sign(payload, configs_1.environmentConfig.JWT_KEY, {
        expiresIn: configs_1.environmentConfig.JWT_EXPIRES_IN,
    });
};
exports.default = mongoose_1.models.User || (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map