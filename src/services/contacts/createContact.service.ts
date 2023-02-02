import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IContactCreate } from "../../interfaces/contacts";

const createContactService = async (
  { email, full_name, telephone }: IContactCreate,
  idUser: string
): Promise<{
  userId: string;
  id: string;
  full_name: string;
  email: string;
  telephone: string;
  created_at: Date;
  updated_at: Date;
}> => {
  if (!email || !full_name || !telephone) {
    throw new AppError("Some data is missings");
  }

  if (telephone.length !== 11) {
    throw new AppError("Telephone must contain 11 characters.");
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: idUser });

  const contactRepository = AppDataSource.getRepository(Contact);

  const newContact = contactRepository.create({
    email,
    full_name,
    telephone,
    user: user!,
  });

  await contactRepository.save(newContact);

  const userId = newContact.user.id;

  const {
    email: newEmail,
    telephone: newTelephone,
    full_name: newFullName,
    created_at,
    updated_at,
    id,
  } = newContact;

  const newData = {
    userId,
    id,
    full_name: newFullName,
    email: newEmail,
    telephone: newTelephone,
    created_at,
    updated_at,
  };

  return newData;
};

export default createContactService;
