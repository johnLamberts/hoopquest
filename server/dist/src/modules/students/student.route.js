"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const express_1 = require("express");
const student_controller_1 = __importDefault(require("./student.controller"));
const router = (0, express_1.Router)();
router.post("/add_student", student_controller_1.default.addStudent);
router.get("/all", (req, res) => {
    console.log("Test");
    res.json({
        message: "Test",
    });
});
exports.StudentRoute = router;
//# sourceMappingURL=student.route.js.map