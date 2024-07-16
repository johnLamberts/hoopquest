import request from "supertest";
import app from "../src/app";

describe("app server", () => {
  /**
   * Testing GET api/v1 endpoint
   */

  describe("GET /api/v1", () => {
    describe("given the endpoint exist", () => {
      it("it should return a 200 status with a json message", (done) => {
        request(app)
          .get("/api/v1")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(
            200,
            {
              success: true,
              error: false,
              message: "Welcome to HoopQuest API 👋🌎",
              statusCode: 200,
              data: null,
            },
            done
          );
      });
    });
  });
});
