import { hash } from "bcrypt"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserUpdate } from "../../interfaces/user"

const updateUserService = async(data: IUserUpdate, id: string) => {

    if(data.full_name || data.email || data.password || data.telephone){
        const userRepository = AppDataSource.getRepository(User)
    
        const users = await userRepository.find()
    
        const user = users.find(user => user.id === id)

        if(!user){
            throw new AppError('User not found', 404)
        }

        if (data.telephone?.length !== 11) {
            throw new AppError('Telephone must contain 11 characters.')
        }
    
        const updatedUser = {
            full_name: data.full_name ? data.full_name : user.full_name,
            email: data.email ? data.email : user.email,
            password: data.password ? await hash(data.password,10) : user.password,
            telephone: data.telephone ? data.telephone : user.telephone
        }

        await userRepository.update(id, updatedUser)

        const userUpdated = await userRepository.findOneBy({id}) 

        return userUpdated
    }
    
    throw new AppError("Just full_name/email/password/telephone can be updated", 403)
}

export default updateUserService