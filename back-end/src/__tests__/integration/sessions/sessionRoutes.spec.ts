import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedUser, mockedUserLogin} from "../../mocks"


describe("Testing the session routes", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    it("POST /login - should be able to login with the user",async () => {
        const response = await request(app).post("/login").send(mockedUserLogin);
        
        expect(response.body).toHaveProperty("token")
        expect(response.body).toHaveProperty("user")
        expect(response.status).toBe(200)
     
    })

    it("POST /login - should not be able to login with the user with incorrect password or email",async () => {
        const response = await request(app).post("/login").send({
            email: "felipe@mail.com",
            password: "1234567"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

})