const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const User = require("../schema/usersSchema");

describe("User Controller Tests", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
    if (connectionError) console.log(connectionError);
  });

  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  let user;

  describe("GET /users", () => {
    it("Return 200", async () => {
      const res = await fakeRequest.get("/users");
      expect(res.status).toBe(200);
    });
  });

  // describe("POST /users", () => {
  //   it("Can create user", async () => {
  //     const res = await supertest(app).post("/users").send({
  //       firstname: "Test",
  //       password: "Password123",
  //       created_date: new Date(),
  //       email: "example@example.com",
  //       phone: "1234567890",
  //     });
  //     expect(res.status).toBe(201);
  //     expect(res.body.email).toBe("example@example.com");

  //     user = res.body;
  //   });
  // });

  // describe("GET /users", () => {
  //   it("Can list all users", async () => {
  //     const res = await supertest(app).get("/users");
  //     expect(res.status).toBe(200);
  //   });
  // });

  // describe("GET /users/:id", () => {
  //   it("Can get a user by id", async () => {
  //     const res = await supertest(app).get(`/users/${user._id}`);
  //     expect(res.status).toBe(200);
  //     expect(res.body._id).toBe(user._id);
  //   });
  // });

  // describe("PATCH /users/:id", () => {
  //   it("Can update a user", async () => {
  //     const res = await supertest(app).patch(`/users/${user._id}`).send({
  //       email: "updated@example.com",
  //     });
  //     expect(res.status).toBe(200);
  //     expect(res.body.updatedUser.email).toBe("updated@example.com");
  //   });
  // });

  // describe("DELETE /users/:id", () => {
  //   it("Can delete a user", async () => {
  //     const res = await supertest(app).delete(`/users/${user._id}`);
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("Usuario eliminado");
  //   });
  // });

  // describe("POST /users/changePassword/:id", () => {
  //   it("Can change a user's password", async () => {
  //     const res = await supertest(app)
  //       .post(`/users/changePassword/${user._id}`)
  //       .send({
  //         currentPassword: "Password123",
  //         newPassword: "NewPassword123",
  //       });
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("Contraseña actualizada con éxito");
  //   });
  // });

  // describe("POST /users/login", () => {
  //   it("Can log in a user", async () => {
  //     const res = await supertest(app).post("/users/login").send({
  //       email: "updated@example.com",
  //       password: "NewPassword123",
  //     });
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("Login exitoso");
  //   });
  // });
});
