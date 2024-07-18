"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("app server", () => {
    describe("GET /api/v1", () => {
        describe("given the endpoint exist", () => {
            it("it should return a 200 status with a json message", (done) => {
                (0, supertest_1.default)(app_1.default)
                    .get("/api/v1")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200, {
                    success: true,
                    error: false,
                    message: "Welcome to HoopQuest API 👋🌎",
                    statusCode: 200,
                    data: null,
                }, done);
            });
        });
    });
    describe("GET /anything-routes-not-specific-in-actual-endpoints", () => {
        describe("given the endpoint does not exist", () => {
            it("should return a 404 status with not found message", () => {
                (0, supertest_1.default)(app_1.default)
                    .get("/asdkasdj-asdj")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .then((response) => {
                    expect(response.body).toMatchObject({
                        statusCode: 404,
                        status: "error-not-found",
                        message: "Not found",
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=app.test.js.map