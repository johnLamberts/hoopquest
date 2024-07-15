import { Request, Response } from "express";
import StudentService from "./student.service";

class StudentController {
  static async addStudent(req: Request, res: Response) {
    const student = await StudentService.addStudent(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved all student details",
      data: student,
    });
  }
}

export default StudentController;
