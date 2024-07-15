import { Application } from "express";
import { StudentRoute } from "./students/student.route";

const apiEndpointVersion = "/api/v1";

const router = async (app: Application) => {
  app.use(apiEndpointVersion + "/student", StudentRoute);
};

export default router;
