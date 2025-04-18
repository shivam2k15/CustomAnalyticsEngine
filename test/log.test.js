const request = require("supertest");
const app = require("../src/app");
const ApiLogModel = require("../src/models/apiLog");
const { messages } = require("../src/utils/constant");
jest.mock("../src/models/apiLog");

describe("API Logging Tests", () => {
  test("should log an API request", async () => {
    ApiLogModel.create.mockResolvedValue({});
    const payload = {
      endpoint: "/api/test",
      method: "GET",
      userId: "ab58cf88-bfc8-4545-bb0e-982bfa7a10fd",
      timestamp: "2025/04/04",
    };
    const res = await request(app).post("/logs").send(payload);

    expect(res.status).toBe(201);
  });

  test("should return error if required fields are missing", async () => {
    const res = await request(app)
      .post("/logs")
      .send({ endpoint: "/api/test" });

    expect(res.status).toBe(400);
    expect(JSON.parse(res.text).message).toBe(messages.validInputs);
  });
});
