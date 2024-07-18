"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    url: {
        type: String,
    },
});
const StudentSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    profilePic: {
        type: ProfileSchema,
        required: false,
    },
    mobile: {
        type: String,
        trim: true,
        sparse: true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    interests: {
        type: [String],
        required: true,
        default: [],
    },
    password: {
        type: String,
        minlength: 8,
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    blockedReason: {
        type: String,
        default: "",
    },
});
const StudentModel = (0, mongoose_1.model)("StudentModel", StudentSchema, "students");
exports.default = StudentModel;
//# sourceMappingURL=student.model.js.map