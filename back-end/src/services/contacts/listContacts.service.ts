import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"

const listContactsService = async(idUser: string) => {

    const contactRepository = AppDataSource.getRepository(Contact)

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: idUser})

    const contacts = await contactRepository.find({
        where:{
            user: {
                id: user!.id
            }
        },
    })

    return contacts

}

export default listContactsService