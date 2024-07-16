import { Application } from "express";
import { StudentRoute } from "./students/student.route";
import { HomeRoute } from "./home/home.route";

const apiEndpointVersion = "/api/v1";

const router = async (app: Application) => {
  app.use(apiEndpointVersion + "/student", StudentRoute);
  app.use(apiEndpointVersion, HomeRoute);
};

export default router;
