import { environmentConfig } from "@/configs";
import mongoose from "mongoose";
import request from "supertest";

const userPayload = {
  firstName: "test",
  lastName: "test",
  email: "testverstmion@gmail.com",
  password: "12345test",
};
beforeAll((done) => {
  jest.setTimeout(90 * 1000);

  mongoose
    .connect(environmentConfig.TEST_ENV_DATABASE_URI as string, {})
    .catch((err) => {
      if (err) return console.log("Failed to connected to DB", err);

      done();
    });
});
import supertest from "supertest";

afterAll(async () => {
  mongoose?.connection?.db?.dropDatabase();
  jest.clearAllMocks();
  jest.setTimeout(5 * 1000);
});

describe("Student", () => {
  /**
   * Testing auth registration endpoint
   */

  describe("given the email is not valid", () => {
    it("should return a 422 status with validation message", async () => {
      await request(app).post("/api/v1/add_student").field({});
    });
  });
});
