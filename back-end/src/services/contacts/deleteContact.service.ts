import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";

const deleteContactService = async (id: string, idUser: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id,
      user: {
        id: idUser,
      },
    },
  });

  if (!contact) {
    throw new AppError("Contact not found.", 404);
  }

  await contactRepository.delete(contact.id)
};

export default deleteContactService;
