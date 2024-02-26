const supertest = require("supertest");
const { app } = require("../server"); // app
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const fakeRequest = supertest(app);

describe("Restaurante Controller Tests", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
  
  });

  afterAll(async () => {
    await disconnectDB();
  });

  let restaurante;
});
