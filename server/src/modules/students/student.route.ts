import { Request, Response, Router } from "express";
import StudentController from "./student.controller";

const router = Router();

router.post("/add_student", StudentController.addStudent);

router.get("/all", (req: Request, res: Response) => {
  console.log("Test");
  res.json({
    message: "Test",
  });
});

export const StudentRoute = router;
