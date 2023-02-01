import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const listRetrieveContactService = async(id: string, idUser: string) => {

    const contactRepository = AppDataSource.getRepository(Contact)

    const contact: Contact | null = await contactRepository.findOne({
        where: { 
            id,
            user: {
                id: idUser
            } 
        }
    })
    
    if(!contact){
        throw new AppError('Contact not found.', 404)
    }
    
    return contact

}

export default listRetrieveContactService