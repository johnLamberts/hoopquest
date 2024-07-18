"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("@/app"));
const configs_1 = require("@/configs");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const userPayload = {
    firstName: "test",
    lastName: "test",
    email: "testverstmion@gmail.com",
    password: "12345test",
};
beforeAll((done) => {
    jest.setTimeout(90 * 1000);
    mongoose_1.default
        .connect(configs_1.environmentConfig.TEST_ENV_DATABASE_URI, {})
        .catch((err) => {
        if (err)
            return console.log("Failed to connected to DB", err);
        done();
    });
});
afterAll(async () => {
    mongoose_1.default?.connection?.db?.dropDatabase();
    jest.clearAllMocks();
    jest.setTimeout(5 * 1000);
});
describe("Student", () => {
    describe("given the email is not valid", () => {
        it("should return a 422 status with validation message", async () => {
            await (0, supertest_1.default)(app_1.default)
                .post("/api/v1/add_student")
                .field({
                ...userPayload,
                email: "notEmail",
            })
                .set("Content-Type", "multipart/form-data")
                .expect("Content-Type", /json/)
                .then((response) => {
                expect(response.body).toMatchObject({
                    data: null,
                    status,
                });
            });
        });
    });
});
//# sourceMappingURL=student.test.js.map