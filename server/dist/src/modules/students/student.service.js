"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("./student.model"));
class StudentService {
    static async addStudent(student) {
        const newStudent = new student_model_1.default(student);
        return await newStudent.save();
    }
}
exports.default = StudentService;
//# sourceMappingURL=student.service.js.map