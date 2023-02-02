import { IContactCreate } from "../../interfaces/contacts";
import { ILogin } from "../../interfaces/sessions";
import { IUserCreate } from "../../interfaces/users";

export const mockedUser: IUserCreate = {
    full_name: "Joana Carolina",
    email: "joana@mail.com",
    telephone: "41912345678",
    password: "123456"
}

export const mockedUserLogin: ILogin = {
    email: "joana@mail.com",
    password: "123456"
}

export const mockedContact = {
    full_name: "Roberto Luiz",
    email: "roberto@mail.com",
    telephone: "41912345678",
    userId: ""
}