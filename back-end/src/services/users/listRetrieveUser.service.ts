import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const listRetrieveUserService = async(id: string) => {

    const userRepository = AppDataSource.getRepository(User)
    
    const users = await userRepository.find()
    
    const user = users.find(user => user.id === id)

    if(!user){
        throw new AppError('User not found', 404)
    }

    return user

}

export default listRetrieveUserService