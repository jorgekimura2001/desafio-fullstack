import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUser, mockedUserLogin } from "../../mocks";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /users - should must be able to create a new user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("full_name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("telephone");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.full_name).toEqual("Joana Carolina");
    expect(response.body.email).toEqual("joana@mail.com");
    expect(response.body.telephone).toEqual("41912345678");
    expect(response.status).toBe(201);
  });

  it("POST /users - should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("POST /users - should not must be able to create a new user whitout telephone, email, password and full_name", async () => {
    const response = await request(app).post("/users").send({
      batata: "123",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("GET /users - should must be able to list users", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  it("GET /users/:id - should not be able to list user without authentication", async () => {
    const UserTobeListed = await request(app).get("/users");

    const response = await request(app).get(
      `/users/${UserTobeListed.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /users/:id - should not be able to list user not owner", async () => {
    await request(app).post("/users").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /users/:id - should be able to list user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const token = `Bearer ${userLoginResponse.body.token}`;

    const userToBeListedRequest = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userToBeListedId = userToBeListedRequest.body[0].id;

    const response = await request(app)
      .get(`/users/${userToBeListedId}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.full_name).toEqual("Joana Carolina");
    expect(response.body.email).toEqual("joana@mail.com");
    expect(response.body).not.toHaveProperty("password");
  });

  it("DELETE /users/:id - should not be able to delete user without authentication", async () => {
    const UserTobeDeleted = await request(app).get("/users");

    const response = await request(app).delete(
      `/users/${UserTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /users/:id - should must be able to delete user", async () => {
    await request(app).post("/users").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });

  it("DELETE /users/:id - should not be able to delete user not owner", async () => {
    await request(app).post("/users").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /users/:id - should not be able to update user without authentication", async () => {
    const userTobeUpdate = await request(app).get("/users");
    const response = await request(app).patch(
      `/users/${userTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/:id - should not be able to update user not owner", async () => {
    const newValues = {
      full_name: "Joana Brito",
      email: "joanabrito@mail.com",
    };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);
    const token = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/:id - should be able to update user", async () => {
    const newValues = {
      full_name: "Joana Brito",
      email: "joanabrito@mail.com",
    };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const token = `Bearer ${userLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const userUpdated = await request(app)
      .get("/users")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].full_name).toEqual("Joana Brito");
    expect(userUpdated.body[0].email).toEqual("joanabrito@mail.com");
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });
});
