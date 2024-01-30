const supertest = require("supertest");
const { app, server } = require("../index"); // app
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const fakeRequest = supertest(app);

describe("Restaurante Controller Tests", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
    if (!connectionError) console.log("🏢 Connected to database!");
    else console.log(connectionError);
  });

  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  let restaurante;

  // describe("POST /restaurantes", () => {
  //   it("Can create restaurantes", async () => {
  //     const res = await fakeRequest(app).post("/restaurantes").send({
  //       email: "example@example.com",
  //       password: "Password123",
  //     });
  //     expect(res.status).toBe(201);
  //     expect(res.body.email).toBe("example@example.com");

  //     restaurante = res.body;
  //   });
  // });

  // describe("GET /restaurantes", () => {
  //   it("Can list all restaurantes", async () => {
  //     const res = await supertest(app).get("/restaurantes");
  //     expect(res.status).toBe(200);
  //   });
  // });

  // describe("GET /restaurantes/:id", () => {
  //   it("Can get a restaurante by id", async () => {
  //     const res = await supertest(app).get(`/restaurantes/${restaurante._id}`);
  //     expect(res.status).toBe(200);
  //     expect(res.body._id).toBe(restaurante._id);
  //   });
  // });

  // describe("PATCH /restaurantes/:id", () => {
  //   it("Can update a restaurante", async () => {
  //     const res = await supertest(app)
  //       .patch(`/restaurantes/${restaurante._id}`)
  //       .send({
  //         email: "updated@example.com",
  //       });
  //     expect(res.status).toBe(200);
  //     expect(res.body.email).toBe("updated@example.com");
  //   });
  // });

  // describe("DELETE /restaurantes/:id", () => {
  //   it("Can delete a restaurante", async () => {
  //     const res = await supertest(app).delete(
  //       `/restaurante/${restaurantes._id}`
  //     );
  //     expect(res.status).toBe(204);
  //   });
  // });
});
