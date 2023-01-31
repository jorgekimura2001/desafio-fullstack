import { users } from "../../database";

import { IUserCreate, IUser } from "../../interfaces/user";

import { v4 as uuidv4 } from "uuid"
import { AppError } from "../../errors/appError";

const userCreateService = ({full_name, email, telephone}: IUserCreate) => {

    // verificação de email já em uso por outro usuário
    const emailAlreadyExists = users.find(user => user.email === email)

    // se já está em uso, invocamos um Error nativo do JS mesmo
    if (emailAlreadyExists) {
        throw new AppError("Email already exists!")
    }

    // se não, criamos um novo usuário no modelo da interface IUser,
        // usando os parâmetros que vamos receber lá do controller
    
    const newDate = new Date()

    

    const newUser: IUser = {
        id: uuidv4(),
        full_name,
        email,
        telephone,
        registration_date: newDate,
    }

    // adicionando o novo usuário na database
    users.push(newUser)

    // retornamos o objeto do novo usuário de volta para o controller
    return newUser

}

export default userCreateService