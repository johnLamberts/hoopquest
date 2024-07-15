import { StudentInterface } from "@/types/student.interface";
import StudentModel from "./student.model";
import console from "console";

class StudentService {
  static async addStudent(student: StudentInterface) {
    const newStudent = new StudentModel(student);

    console.log(newStudent);

    return await newStudent.save();
  }
}

export default StudentService;
