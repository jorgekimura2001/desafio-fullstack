import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedContact, mockedUser, mockedUserLogin } from "../../mocks";

describe("Testing the contacts routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /contacts - should must be able to create a new contact", async () => {
    const users = await request(app).get("/users");
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    mockedContact.userId = users.body[0].id;

    const response = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("full_name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("telephone");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body.full_name).toEqual("Roberto Luiz");
    expect(response.body.email).toEqual("roberto@mail.com");
    expect(response.body.telephone).toEqual("41912345678");
    expect(response.status).toBe(201);
  });

  it("POST /contacts - should not must be able to create a new contact whitout telephone, email and full_name", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        batata: "123",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("GET /contacts - should must be able to list contacts", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("GET /contacts - should not be able to list contacts without authentication", async () => {
    const response = await request(app).get("/contacts");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /contacts/:id - should not be able to list contact without authentication", async () => {
    const response = await request(app).get(
      "/contacts/13970660-5dbe-423a-9a9d-5c23b37943cf"
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /contacts/:id - should not be able to list contact not owner", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/contacts/13970660-5dbe-423a-9a9d-5c23b37943cf")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /contacts/:id - should be able to list contact", async () => {
    const usergLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const token = `Bearer ${usergLoginResponse.body.token}`;

    const contactToBeListedRequest = await request(app)
      .get("/contacts")
      .set("Authorization", token);
    const contactTobeListedId = contactToBeListedRequest.body[0].id;

    const response = await request(app)
      .get(`/contacts/${contactTobeListedId}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.full_name).toEqual("Roberto Luiz");
    expect(response.body.email).toEqual("roberto@mail.com");
  });

  it("PATCH /contacts/:id - should not be able to update contact without authentication", async () => {
    const response = await request(app).patch(
      `/contacts/13970660-5dbe-423a-9a9d-5c23b37943cf`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /contacts/:id - should not be able to update contact not owner", async () => {
    const newValues = {
      full_name: "Joana Brito",
      email: "joanabrito@mail.com",
    };

    const usergLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);
    const token = `Bearer ${usergLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/contacts/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /contacts/:id - should be able to update contact", async () => {
    const newValues = {
      full_name: "Joana Brito",
      email: "joanabrito@mail.com",
    };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const token = `Bearer ${userLoginResponse.body.token}`;

    const contactTobeUpdated = await request(app)
      .get("/contacts")
      .set("Authorization", token);

    const response = await request(app)
      .patch(`${`/contacts/${contactTobeUpdated.body[0].id}`}`)
      .set("Authorization", token)
      .send(newValues);

    const contactUpdate = await request(app)
      .get("/contacts")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(contactUpdate.body[0].full_name).toEqual("Joana Brito");
    expect(contactUpdate.body[0].email).toEqual("joanabrito@mail.com");
  });

  it("DELETE /contacts/:id - should not be able to delete contact without authentication", async () => {
    await request(app).post("/contacts").send(mockedUser);

    const response = await request(app).delete(
      `/contacts/13970660-5dbe-423a-9a9d-5c23b37943cf`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /contacts/:id - should must be able to delete contact", async () => {
    await request(app).post("/contacts").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const contactTobeDeleted = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contacts/${contactTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });

  it("DELETE /contacts/:id - should not be able to delete contact not owner", async () => {
    await request(app).post("/contacts").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/contacts/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
