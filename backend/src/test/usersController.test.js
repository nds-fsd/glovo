const supertest = require("supertest");
const { app } = require("../server");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const User = require("../schema/usersSchema");

describe("User Controller Tests", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  let user;

  describe("GET /users", () => {
    it("Return 200", async () => {
      const res = await fakeRequest.get("/users");
      expect(res.status).toBe(200);
    });
  });
});
