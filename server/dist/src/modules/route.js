"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_route_1 = require("./students/student.route");
const home_route_1 = require("./home/home.route");
const auth_route_1 = require("./auth/auth.route");
const apiEndpointVersion = "/api/v1";
const router = async (app) => {
    app.use(apiEndpointVersion + "/student", student_route_1.StudentRoute);
    app.use(apiEndpointVersion, home_route_1.HomeRoute);
    app.use(apiEndpointVersion + "/auth", auth_route_1.AuthRoute);
};
exports.default = router;
//# sourceMappingURL=route.js.map