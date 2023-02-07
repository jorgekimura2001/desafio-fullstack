import { ILogin } from "../../interfaces/sessions"
import { compare } from "bcrypt"
import jwt from 'jsonwebtoken'
import AppDataSource  from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const loginSessionService = async({email, password}: ILogin) => {

    if(!email || !password){
        throw new AppError('Email and password is required!')
    }
    
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const user = users.find(user => user.email === email)

    if(!user){
        throw new AppError('Invalid email or password', 403)
    }

    const passwordVerify = await compare(password, user.password)
    
    if(!passwordVerify){
        throw new AppError('Invalid email or password', 403)
    }

    const token = jwt.sign(
        { }, 
        process.env.SECRET_KEY as string, 
        {
            expiresIn: '24h',
            subject: user.id 
        }
    )
   
    return {token, user}

}

export default loginSessionService