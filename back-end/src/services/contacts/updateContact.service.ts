import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";
import { IContactUpdate } from "../../interfaces/contacts";

const updateContactService = async (
  id: string,
  idUser: string,
  data: IContactUpdate
) => {
  if (data.full_name || data.email || data.telephone) {
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

    if (data.telephone && data.telephone.length !== 11) {
      throw new AppError("Telephone must contain 11 characters.");
    }

    const updatedContact = {
      full_name: data.full_name ? data.full_name : contact.full_name,
      email: data.email ? data.email : contact.email,
      telephone: data.telephone ? data.telephone : contact.telephone,
    };

    await contactRepository.update(id, updatedContact);

    const contactUpdated = await contactRepository.findOneBy({ id });

    return contactUpdated;
  }

  throw new AppError("Just full_name/email/telephone can be updated", 403);
};

export default updateContactService;
