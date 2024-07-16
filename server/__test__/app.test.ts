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

  /**
   * Testing GET /anything-routes-here-not-specified-in-actual-endpoints
   *
   */

  describe("GET /anything-routes-not-specific-in-actual-endpoints", () => {
    describe("given the endpoint does not exist", () => {
      it("should return a 404 status with not found message", () => {
        request(app)
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
