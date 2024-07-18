"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_service_1 = __importDefault(require("./student.service"));
class StudentController {
    static async addStudent(req, res) {
        const student = await student_service_1.default.addStudent(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully retrieved all student details",
            data: student,
        });
    }
}
exports.default = StudentController;
//# sourceMappingURL=student.controller.js.map